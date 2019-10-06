const { paginate } = require("gatsby-awesome-pagination");
const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
      allStoriesJson {
        edges {
          node {
            tags
          }
        }
        group(field: tags) {
          fieldValue
          totalCount
        }
      }
      allVideosJson {
        edges {
          node {
            tags
          }
        }
        group(field: tags) {
          fieldValue
          totalCount
        }
      }
      allServicesJson {
        edges {
          node {
            tags
          }
        }
        group(field: tags) {
          fieldValue
          totalCount
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;
    const stories = result.data.allStoriesJson.edges;
    const videos = result.data.allVideosJson.edges;
    const services = result.data.allServicesJson.edges;

    const postsGroup = result.data.allMarkdownRemark.group;
    const storiesGroup = result.data.allStoriesJson.group;
    const videosGroup = result.data.allVideosJson.group;
    const servicesGroup = result.data.allServicesJson.group;

    let topics = [];

    postsGroup.forEach(node => {
      topics.push({
        slug: node.fieldValue,
        totalPosts: node.totalCount,
        totalVideos: 0,
        totalStories: 0,
        totalServices: 0
      });
    });

    storiesGroup.forEach(node => {
      let topic = topics.find(topic => topic.slug === node.fieldValue);
      if (topic) {
        topic.totalStories = node.totalCount;
      } else {
        topics.push({
          slug: node.fieldValue,
          totalPosts: 0,
          totalVideos: 0,
          totalStories: node.totalCount,
          totalServices: 0
        });
      }
    });

    videosGroup.forEach(node => {
      let topic = topics.find(topic => topic.slug === node.fieldValue);
      if (topic) {
        topic.totalVideos = node.totalCount;
      } else {
        topics.push({
          slug: node.fieldValue,
          totalPosts: 0,
          totalVideos: node.totalCount,
          totalStories: 0,
          totalServices: 0
        });
      }
    });

    servicesGroup.forEach(node => {
      let topic = topics.find(topic => topic.slug === node.fieldValue);
      if (topic) {
        topic.totalServices = node.totalCount;
      } else {
        topics.push({
          slug: node.fieldValue,
          totalPosts: 0,
          totalVideos: 0,
          totalStories: 0,
          totalServices: node.totalCount
        });
      }
    });

    posts.forEach(edge => {
      const id = edge.node.id;
      const postTags = edge.node.frontmatter.tags;

      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          tags: postTags
        }
      });
    });

    // Create your paginated pages
    paginate({
      createPage, // The Gatsby `createPage` function
      items: posts, // An array of objects
      itemsPerPage: 10, // How many items you want per page
      pathPrefix: "/blog", // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve("src/templates/blog-page.js") // Just like `createPage()`
    });

    // Create your paginated stories
    paginate({
      createPage, // The Gatsby `createPage` function
      items: stories, // An array of objects
      itemsPerPage: 10, // How many items you want per page
      pathPrefix: "/recommended/stories", // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve("src/templates/stories-page.js") // Just like `createPage()`
    });

    // Create your paginated videos
    paginate({
      createPage, // The Gatsby `createPage` function
      items: videos, // An array of objects
      itemsPerPage: 10, // How many items you want per page
      pathPrefix: "/recommended/videos", // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve("src/templates/videos-page.js") // Just like `createPage()`
    });

    // Create your paginated tools
    paginate({
      createPage, // The Gatsby `createPage` function
      items: services, // An array of objects
      itemsPerPage: 10, // How many items you want per page
      pathPrefix: "/recommended/services", // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve("src/templates/services-page.js") // Just like `createPage()`
    });

    // Make topic pages
    topics.forEach(topic => {
      const topicPath = `/topics/${topic.slug}/`;
      const topicStoriesPath = `/topics/${topic.slug}/stories/`;
      const topicVideosPath = `/topics/${topic.slug}/videos/`;
      const topicToolsPath = `/topics/${topic.slug}/tools/`;

      if (topic.totalPosts > 0) {
        createPage({
          path: topicPath,
          component: path.resolve(`src/templates/topic.js`),
          context: {
            tag: topic.slug
          }
        });
      } else {
        let topicRedirectPath;
        if (topic.totalStories > 0) {
          topicRedirectPath = topicStoriesPath;
        } else if (topic.totalVideos > 0) {
          topicRedirectPath = topicVideosPath;
        } else {
          topicRedirectPath = topicToolsPath;
        }
        createRedirect({
          fromPath: topicPath,
          isPermanent: false,
          redirectInBrowser: true,
          toPath: topicRedirectPath
        });
      }

      if (topic.totalStories > 0) {
        createPage({
          path: topicStoriesPath,
          component: path.resolve(`src/templates/topic-stories.js`),
          context: {
            tag: topic.slug
          }
        });
      }

      if (topic.totalVideos > 0) {
        createPage({
          path: topicVideosPath,
          component: path.resolve(`src/templates/topic-videos.js`),
          context: {
            tag: topic.slug
          }
        });
      }

      if (topic.totalServices > 0) {
        createPage({
          path: topicToolsPath,
          component: path.resolve(`src/templates/topic-tools.js`),
          context: {
            tag: topic.slug
          }
        });
      }
    });

    let redirectBatch1 = [
      { f: `hello-world/` },
      {
        f: `inserting-rewrite-rule-in-release-config/`
      },
      {
        f: `redirect-non-www-urls-to-www-urls/`
      },
      {
        f: `event-tracking-with-google-analytics/`
      },
      {
        f: `umbraco-get-current-page-in-partial-view/`
      },
      {
        f: `set-selected-option-by-value-via-jquery/`
      },
      { f: `best-umbraco-packages/` },
      {
        f: `xamarin-development-problems-and-solutions/`
      },

      {
        f: `redirect-www-to-non-www-using-webconfig-in-iis/`
      },
      {
        f: `redirect-http-to-https-using-webconfig-in-iis/`
      },
      {
        f: `redirect-https-requests-to-http-using-iis-rewrite-rule-in-webconfig/`
      },

      {
        f: `hunting-security-bugs-in-an-old-web-application/`
      },
      {
        f: `git-branch-not-showing-in-visual-studio-team-explorer/`
      },
      {
        f: `sitefinity-rookie-guide-get-users-in-a-custom-role/`
      },
      {
        f: `remove-specific-class-from-all-elements-jquery/`
      },
      {
        f: `javascript-determine-if-user-is-on-mobile-device/`
      },
      {
        f: `markdown-link-within-document/`
      },
      {
        f: `visual-studio-keeps-crashing-first-aid/`
      },
      {
        f: `sitefinity-read-localized-resource-labels-in-mvc-widget/`
      },
      {
        f: `sitefinity-caching-issue-for-pages-with-no-caching-profile/`
      },

      { f: `2017-year-in-review/` },

      {
        f: `best-font-for-visual-studio/`
      },
      {
        f: `aspnet-web-forms-manually-trigger-client-side-validation/`
      },

      {
        f: `download-file-using-wcf-rest-service/`
      },
      {
        f: `fetch-row-count-for-all-tables-in-a-sql-server/`
      },

      {
        f: `enable-click-jacking-protection-umbraco/`
      },
      { f: `react-native-build-apk/` },

      {
        f: `iis-options-requests-returns-404/`
      },
      { f: `flutter-cookbook/` },
      {
        f: `the-best-extensions-for-visual-studio-2010/`
      },
      {
        f: `pad-a-number-with-leading-zeros-in-sql-to-make-uniform-char-length/`
      },
      { f: `docker-cookbook/` },
      {
        f: `netstandard20-project-docfx-msbuild-error/`
      },
      {
        f: `filtering-paging-and-sorting-in-sql-server-2008/`
      },
      {
        f: `gitlab-clone-a-repository-when-2fa-enabled/`
      },
      {
        f: `project-management-organize-issues-using-labels/`
      },
      {
        f: `best-visual-studio-code-extensions/`
      }
    ];

    // Then we can loop through the array of object literals to create
    // each redirect. A for loop would do the trick
    for (var { f: slug } of redirectBatch1) {
      createRedirect({
        fromPath: `/post/${slug}`,
        isPermanent: true,
        redirectInBrowser: true,
        toPath: `/blog/${slug}`
      });

      let redirectBatch2 = [
        {
          f: `check-if-string-is-arabic-c/`,
          t: `check-if-string-is-arabic-csharp/`
        },
        {
          f: `determine-total-number-of-openactive-connections-in-ms-sql-server/`,
          t: `determine-total-number-of-open-active-connections-in-ms-sql-server/`
        },

        {
          f: `getset-hidden-field-value-using-jquery/`,
          t: `get-set-hidden-field-value-using-jquery/`
        },
        {
          f: `sitefinity-development-problems-and-solutions/`,
          t: `sitefinity-development-problems-solutions/`
        },
        {
          f: `ip-security-configure-ip-address-restrictions-in-webconfig-on-iis/`,
          t: `ip-security-configure-ip-address-restrictions-in-web-config-on-iis/`
        },
        {
          f: `vuejs-list-rendering-limit-items-in-v-for/`,
          t: `vue-js-list-rendering-limit-items-in-v-for/`
        },

        {
          f: `dotnet-interview-questions-and-answers/`,
          t: `dot-net-interview-questions-and-answers/`
        },
        {
          f: `fix-web-deploy-could-not-verify-the-server-s-certificate/`,
          t: `fix-web-deploy-could-not-verify-the-server-certificate/`
        },
        {
          f: `aspnet-core-starting-the-web-server-is-taking-longer-than-expected/`,
          t: `asp-net-core-starting-the-web-server-is-taking-longer-than-expected/`
        }
      ];

      for (var { f, t } of redirectBatch2) {
        createRedirect({
          fromPath: `/post/${f}`,
          isPermanent: true,
          redirectInBrowser: true,
          toPath: `/blog/${t}`
        });
        // Uncomment next line to see loop in action during build
        // console.log('\nRedirecting:\n' + f + '\nTo:\n' + t + '\n');
        // or check .cache/redirects.json post-compile.
      }
    }
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
