import { dirname } from "path";
import { fileURLToPath } from "url";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
const __dirname = dirname(fileURLToPath(import.meta.url));

const siteUrl = `https://www.abhith.net`;
const contentPosts = "content/blog";
const contentSnippets = "content/snippets";
const contentAuthors = "content/authors";
const contentTopics = "content/topics";
const contentRecommendedServices = "content/recommended/services";
// robots.txt generates based on hosting environment
const { IS_PULL_REQUEST } = process.env;
let HOSTING_ENV = "production";
if (IS_PULL_REQUEST === true) {
  HOSTING_ENV = "development";
}

const config = {
  siteMetadata: {
    title: "Abhith Rajan",
    description:
      "Abhith Rajan is a programmer, writer, technology advocate, and more.",
    siteUrl,
    author: {
      name: "Abhith Rajan",
      url: `https://twitter.com/abhithrajan`,
      image: `https://www.abhith.net/img/abhith.jpg`,
    },
    image: `https://www.abhith.net/img/site/mindmap.png`,
    social: {
      twitter: "@AbhithRajan",
      fbAppID: "",
    },
  },
  trailingSlash: `always`,
  mapping: {
    "Mdx.frontmatter.author": `AuthorsYaml`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ["UA-104139048-1", "G-3JV7V7YBHL"],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-clarity`,
      options: {
        // String value for your clarity project id
        // Project id is found in your clarity dashboard url
        // https://clarity.microsoft.com/projects/view/{clarity_project_id}/
        clarity_project_id: "3y06r37z6k",
        // Boolean value for enabling clarity while developing
        // true will enable clarity tracking code on both development and production environments
        // false will enable clarity tracking code on production environment only
        //
        enable_on_dev_env: false,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              quality: 90,
              withWebp: true,
              maxWidth: 1920,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`,
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-external-links`,
        ],
      },
    },
    `gatsby-plugin-twitter`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-catch-links`,
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/images`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/data`,
        name: "data",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: contentPosts,
        name: contentPosts,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: contentSnippets,
        name: contentSnippets,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: contentAuthors,
        name: contentAuthors,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: contentTopics,
        name: contentTopics,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: contentRecommendedServices,
        name: contentRecommendedServices,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          `gatsby-remark-mermaid`,
          `gatsby-remark-embedder`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              quality: 90,
              withWebp: true,
              maxWidth: 1920,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: "static",
            },
          },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener",
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            },
          },
          { resolve: `gatsby-remark-responsive-iframe` },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {},
            },
          },
        ],
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkEmoji],
        },
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: "gatsby-plugin-sass",
      options: {
        useResolveUrlLoader: true,
      },
    },
    `gatsby-plugin-sitemap`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Abhith Rajan`,
        short_name: `Abhith`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/img/android-chrome-144x144.png`,
      },
    },
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [`Array.prototype.map`, `fetch`],
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        resolveEnv: () => HOSTING_ENV,
        env: {
          production: {
            policy: [{ userAgent: "*" }],
          },
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#00d1b2`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    `gatsby-plugin-recaptcha`,
    {
      resolve: `gatsby-plugin-webmention`,
      options: {
        username: "www.abhith.net",
        identity: {
          github: "Abhith",
          twitter: "AbhithRajan",
        },
        mentions: true,
        pingbacks: true,
        domain: "www.abhith.net",
        fetchLimit: 10000,
        token: process.env.WEBMENTIONS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        setup: ({
          query: {
            site: { siteMetadata },
          },
          ...rest
        }) => {
          siteMetadata.feed_url = siteMetadata.siteUrl + "/blog/rss.xml";
          siteMetadata.image_url =
            siteMetadata.siteUrl + "/img/site/brand/icon.png";
          const siteMetadataModified = siteMetadata;
          siteMetadataModified.feed_url = `${siteMetadata.siteUrl}/blog/rss.xml`;
          siteMetadataModified.image_url = `${siteMetadata.siteUrl}/img/site/brand/icon.png`;

          return {
            ...siteMetadataModified,
            ...rest,
          };
        },
        feeds: [
          {
            serialize: ({ query: { site, allArticle } }) => {
              return allArticle.edges
                .filter((edge) => !edge.node.draft)
                .map((edge) => {
                  return {
                    ...edge.node,
                    description: edge.node.excerpt,
                    date: edge.node.date,
                    url: site.siteMetadata.siteUrl + edge.node.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.slug,
                    // body is raw JS and MDX; will need to be processed before it can be used
                    // custom_elements: [{ "content:encoded": edge.node.body }],
                    author: edge.node.author,
                  };
                });
            },
            query: `{
  allArticle(sort: {date: DESC}) {
    edges {
      node {
        body
        excerpt
        date
        slug
        title
        author
        draft
      }
    }
  }
}`,
            output: "/blog/rss.xml",
            title: "Blog posts RSS Feed",
          },
          {
            serialize: ({ query: { site, allStoriesJson } }) => {
              return allStoriesJson.edges.map((edge) => {
                return {
                  ...edge.node,
                  description: edge.node.description,
                  date: edge.node.date,
                  url: `${site.siteMetadata.siteUrl}/topics/${edge.node.tags[0]}/stories/`,
                  guid: edge.node.url,
                  // body is raw JS and MDX; will need to be processed before it can be used
                  // custom_elements: [{ "content:encoded": edge.node.body }],
                  author: edge.node.url,
                };
              });
            },
            query: `{
  allStoriesJson(sort: {date: DESC}) {
    edges {
      node {
        title
        date
        description
        id
        tags
        url
      }
    }
  }
}`,
            output: "/recommended/stories/rss.xml",
            title: "Recommended stories RSS Feed",
          },
        ],
      },
    },
    `gatsby-plugin-offline`, // make sure to keep it last in the array
  ],
};

export default config;
