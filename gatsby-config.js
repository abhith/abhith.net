const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = "https://www.abhith.net",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;
const contentPosts = "content/blog";

module.exports = {
  siteMetadata: {
    title: "Abhith Rajan",
    description:
      "An aspiring software engineer with more than 7 years of experience.",
    siteUrl,
    author: {
      name: "Abhith Rajan",
      minibio: `
        Abhith Rajan is an aspiring software engineer with more than 6 years of experience and proven successful track record of delivering technology-based products and services.
      `,
      url: `https://twitter.com/abhithrajan`,
      image: `https://www.abhith.net/img/abhith.jpg`
    },
    image: `https://www.abhith.net/img/abhith.jpg`,
    social: {
      twitter: "@AbhithRajan",
      fbAppID: ""
    }
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-image`,
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-plugin-twitter`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          `gatsby-remark-reading-time`,
          {
            resolve: "@weknow/gatsby-remark-twitter",
            options: {
              align: "center"
            }
          },
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads"
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static"
            }
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true //Optional: Disable insertion of <style> border: 0
            }
          },
          `gatsby-remark-responsive-iframe`,
          "gatsby-remark-external-links",
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                table: "table"
              }
            }
          }
        ]
      }
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/data`,
        name: "data"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: contentPosts,
        name: contentPosts
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: "static"
            }
          },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener" // eslint-disable-line unicorn/prevent-abbreviations
            }
          },
          {
            resolve: "@weknow/gatsby-remark-twitter",
            options: {
              align: "center"
            }
          },
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads"
            }
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true //Optional: Disable insertion of <style> border: 0
            }
          },
          { resolve: `gatsby-remark-responsive-iframe` }
        ],
        remarkPlugins: [require("remark-emoji")]
      }
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        displayName: process.env.NODE_ENV === `development`
      }
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        useResolveUrlLoader: true
      }
    },
    `gatsby-plugin-sitemap`,
    "gatsby-transformer-json",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-104139048-1"
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Abhith Rajan`,
        short_name: `Abhith`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/img/android-chrome-144x144.png`
      }
    },
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [`Array.prototype.map`, `fetch`]
      }
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: "*" }]
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#00d1b2`,
        // Disable the loading spinner.
        showSpinner: false
      }
    },
    `gatsby-plugin-offline` // make sure to keep it last in the array
  ]
};
