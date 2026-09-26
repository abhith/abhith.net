import { createHash } from "node:crypto";
import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { load as parseYaml } from "js-yaml";

/**
 * Turns a JSON/YAML array without `id` fields into an object keyed by a stable id, so the
 * `file()` loader can store it. The id is derived from the url (+ a counter for duplicates).
 */
function keyedByUrl(items: Array<Record<string, unknown>>) {
  const seen = new Map<string, number>();
  return Object.fromEntries(
    items.map((item) => {
      const hash = createHash("sha1").update(String(item.url)).digest("hex").slice(0, 10);
      const count = (seen.get(hash) ?? 0) + 1;
      seen.set(hash, count);
      return [count === 1 ? hash : `${hash}-${count}`, item];
    }),
  );
}

const dateField = z.coerce.date();
/** Comma-separated list of author names, e.g. `Abhith Rajan, Jane Doe`. */
const authorField = z.string().min(1);

const blog = defineCollection({
  loader: glob({ pattern: ["*/index.mdx", "draft-*.mdx"], base: "./src/content/blog" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        description: z.string().min(1),
        author: authorField,
        authorURL: z.url().optional(),
        date: dateField,
        lastModificationTime: dateField.optional(),
        image: image().optional(),
        tags: z.array(z.string().min(1)).min(1),
        commentId: z.string().optional(),
        draft: z.boolean().default(false),
        templateKey: z.string().optional(),
      })
      .refine((post) => post.draft || post.image !== undefined, {
        message: "Published posts require a hero `image`",
        path: ["image"],
      }),
});

const snippets = defineCollection({
  loader: glob({ pattern: "*/*.mdx", base: "./src/content/snippets" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    author: authorField,
    date: dateField,
    lastModificationTime: dateField.optional(),
    topics: z.array(z.string().min(1)).min(1),
    draft: z.boolean().default(false),
  }),
});

const authors = defineCollection({
  loader: file("./src/content/authors/authors.yml"),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      bio: z.string().min(1),
      avatar: image(),
      twitter: z.string().optional(),
      featured: z.boolean().default(false),
    }),
});

const topics = defineCollection({
  loader: file("./src/content/topics/topics.yml"),
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().nullish().transform((value) => value?.trim() || undefined),
    /** File name inside `public/img/topics/`. */
    image: z.string().nullish().transform((value) => value?.trim() || undefined),
  }),
});

const services = defineCollection({
  loader: file("./src/content/recommended/services/services.yml", {
    parser: (text) => keyedByUrl(parseYaml(text) as Array<Record<string, unknown>>),
  }),
  schema: z.object({
    title: z.string().min(1),
    url: z.url(),
    description: z.string().default(""),
    image: z.string().nullish().transform((value) => value?.trim() || undefined),
    date: dateField,
    tags: z.array(z.string().min(1)).min(1),
  }),
});

const stories = defineCollection({
  loader: file("./src/content/data/stories.json", {
    parser: (text) => keyedByUrl(JSON.parse(text)),
  }),
  schema: z.object({
    url: z.url(),
    title: z.string().min(1),
    description: z.string().nullish().transform((value) => value?.trim() || undefined),
    date: dateField,
    tags: z.array(z.string().min(1)).min(1),
  }),
});

const videos = defineCollection({
  loader: file("./src/content/data/videos.json", {
    parser: (text) => keyedByUrl(JSON.parse(text)),
  }),
  schema: z.object({
    url: z.url(),
    title: z.string().min(1),
    description: z.string().nullish().transform((value) => value?.trim() || undefined),
    image: z.string().nullish().transform((value) => value?.trim() || undefined),
    tags: z.array(z.string().min(1)).min(1),
    date: dateField,
    type: z.enum(["youtube", "vimeo"]).default("youtube"),
  }),
});

export const collections = { blog, snippets, authors, topics, services, stories, videos };
