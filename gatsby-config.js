const siteUrl = `https://www.abhith.net`;
const contentPosts = "content/blog";
const contentSnippets = "content/snippets";
const contentAuthors = "content/authors";
const contentTopics = "content/topics";
const contentRecommendedServices = "content/recommended/services";
const path = require("path");
const templatesDirectory = path.resolve(__dirname, "src/templates");
const templates = {
  page: path.resolve(templatesDirectory, "page-template.js"),
};

// robots.txt generates based on hosting environment
const { IS_PULL_REQUEST } = process.env;
let HOSTING_ENV = "production";
if (IS_PULL_REQUEST === true) {
  HOSTING_ENV = "development";
}

module.exports = {
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
        defaultLayouts: { default: templates.page },
        gatsbyRemarkPlugins: [
          { resolve: "gatsby-remark-mermaid" },
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
          {
            resolve: "@weknow/gatsby-remark-twitter",
            options: {
              align: "center",
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
        ],
        remarkPlugins: [require("remark-emoji")],
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
            query: `
              {
                allArticle(sort: {order: DESC, fields: date}) {
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
              }
              `,
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
            query: `
              {
                allStoriesJson(
                  sort: { fields: [date], order: DESC }
                ) {
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
              }
              `,
            output: "/recommended/stories/rss.xml",
            title: "Recommended stories RSS Feed",
          },
        ],
      },
    },
    `gatsby-plugin-offline`, // make sure to keep it last in the array
  ],
};
