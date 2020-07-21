const { paginate } = require("gatsby-awesome-pagination");
const _ = require("lodash");
const path = require("path");

const templatesDirectory = path.resolve(__dirname, "../../src/templates");
const templates = {
  article: path.resolve(templatesDirectory, "article-template.js"),
  topic: path.resolve(templatesDirectory, "topic-template.js"),
  topicStories: path.resolve(templatesDirectory, "topic-stories-template.js"),
  topicVideos: path.resolve(templatesDirectory, "topic-videos-template.js"),
  topicTools: path.resolve(templatesDirectory, "topic-tools-template.js"),
  blog: path.resolve(templatesDirectory, "blog-template.js"),
  stories: path.resolve(templatesDirectory, "stories-template.js"),
  topics: path.resolve(templatesDirectory, "topics-template.js"),
};

const log = (message, section) =>
  console.log(`\n\u001B[36m${message} \u001B[4m${section}\u001B[0m\u001B[0m\n`);

const query = require("../data/data.query");
const normalize = require("../data/data.normalize");

module.exports = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  // Destructure the createPage function from the actions object
  const articlesResult = await graphql(query.local.articles);
  if (articlesResult.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  // Create blog post pages.
  let articles = articlesResult.data.articles.edges.map(
    normalize.local.articles
  );
  articles = _.orderBy(articles, ["datePublishedSeoFormat"], ["desc"]); // you'll call `createPage` for each result

  const allStories = await graphql(query.local.stories);
  if (allStories.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "allStories" query');
  }

  const allVideos = await graphql(query.local.videos);
  if (allVideos.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "allVideos" query');
  }

  const allTools = await graphql(query.local.tools);
  if (allTools.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "allTools" query');
  }

  const allTopics = await graphql(query.local.topics);
  if (allTopics.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "allTopics" query');
  }

  const localAuthors = await graphql(query.local.authors);
  const authors = localAuthors.data.authors.edges.map(normalize.local.authors);
  log(`Creating`, "articles");

  articles.forEach((article, index) => {
    // Match the Author to the one specified in the article
    let authorsThatWroteTheArticle;
    try {
      authorsThatWroteTheArticle = authors.filter((author) => {
        const allAuthors = article.author
          .split(",")
          .map((a) => a.trim().toLowerCase());

        return allAuthors.some((a) => a === author.name.toLowerCase());
      });
    } catch (error) {
      throw new Error(`
    We could not find the Author for: "${article.title}".
    Double check the author field is specified in your post and the name
    matches a specified author.
    Provided author: ${article.author}
    ${error}
  `);
    }

    // related articles
    let relatedArticles = articles
      .filter(
        (item) =>
          article.id !== item.id &&
          article.tags.some((t) => item.tags.includes(t))
      )
      .slice(0, 6);

    let relatedStories = allStories.data.stories.edges
      .filter((item) => article.tags.some((t) => item.node.tags.includes(t)))
      .slice(0, 6);

    let relatedVideos = allVideos.data.videos.edges
      .filter((item) => article.tags.some((t) => item.node.tags.includes(t)))
      .slice(0, 3);

    let relatedTools = allTools.data.tools.edges
      .filter((item) => article.tags.some((t) => item.node.tags.includes(t)))
      .slice(0, 2);

    createPage({
      path: article.slug,
      component: templates.article,
      context: {
        article,
        authors: authorsThatWroteTheArticle,
        relatedArticles,
        relatedStories,
        relatedVideos,
        relatedTools,
        next: articles[index - 1],
        previous: articles[index + 1],
        permalink: `https://www.abhith.net${article.slug}`,
      },
    });
  });

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
              templateKey
            }
          }
        }
      }
      articleTagsGroup: allArticle(filter: { draft: { eq: false } }) {
        group(field: tags) {
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
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const pages = result.data.allMarkdownRemark.edges;
    const stories = result.data.allStoriesJson.edges;
    const videos = result.data.allVideosJson.edges;
    const services = result.data.allServicesJson.edges;

    const postsGroup = result.data.articleTagsGroup.group;
    const storiesGroup = result.data.allStoriesJson.group;
    const videosGroup = result.data.allVideosJson.group;
    const servicesGroup = result.data.allServicesJson.group;

    let topics = [];

    postsGroup.forEach((node) => {
      topics.push({
        slug: node.fieldValue,
        totalPosts: node.totalCount,
        totalVideos: 0,
        totalStories: 0,
        totalServices: 0,
      });
    });

    storiesGroup.forEach((node) => {
      let storyTopic = topics.find((topic) => topic.slug === node.fieldValue);
      if (storyTopic) {
        storyTopic.totalStories = node.totalCount;
      } else {
        topics.push({
          slug: node.fieldValue,
          totalPosts: 0,
          totalVideos: 0,
          totalStories: node.totalCount,
          totalServices: 0,
        });
      }
    });

    videosGroup.forEach((node) => {
      let videoTopic = topics.find((topic) => topic.slug === node.fieldValue);
      if (videoTopic) {
        videoTopic.totalVideos = node.totalCount;
      } else {
        topics.push({
          slug: node.fieldValue,
          totalPosts: 0,
          totalVideos: node.totalCount,
          totalStories: 0,
          totalServices: 0,
        });
      }
    });

    servicesGroup.forEach((node) => {
      let serviceTopic = topics.find((topic) => topic.slug === node.fieldValue);
      if (serviceTopic) {
        serviceTopic.totalServices = node.totalCount;
      } else {
        topics.push({
          slug: node.fieldValue,
          totalPosts: 0,
          totalVideos: 0,
          totalStories: 0,
          totalServices: node.totalCount,
        });
      }
    });

    log(`Merging`, "topics");
    topics.forEach((topic, index) => {
      let topicNode = allTopics.data.topics.edges.find(
        (item) => item.node.slug === topic.slug
      );

      if (topicNode) {
        topic = { ...topic, ...topicNode.node };
        topics[index] = topic;
      } else {
        log(`Missing topic definition`, `${topic.slug}`);
        topic.title = _.startCase(topic.slug);
      }
    });

    topics = _.sortBy(topics, (topic) => topic.title); // you'll call `createPage` for each result

    log(`Creating`, "topic index");
    createPage({
      path: "/topics",
      // This component will wrap our MDX content
      component: templates.topics,
      // You can use the values in this context in
      // our page layout component
      context: {
        topics,
      },
    });

    log(`Creating`, "topic pages");
    topics.forEach((topic) => {
      const topicPath = `/topics/${topic.slug}/`;
      const topicStoriesPath = `/topics/${topic.slug}/stories/`;
      const topicVideosPath = `/topics/${topic.slug}/videos/`;
      const topicToolsPath = `/topics/${topic.slug}/tools/`;

      if (topic.totalPosts > 0) {
        const topicArticles = articles.filter((item) =>
          item.tags.includes(topic.slug)
        );

        createPage({
          path: topicPath,
          component: templates.topic,
          context: {
            topic,
            articles: topicArticles,
            topics,
          },
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
          toPath: topicRedirectPath,
        });
      }

      if (topic.totalStories > 0) {
        let relatedStories = allStories.data.stories.edges.filter((item) =>
          item.node.tags.includes(topic.slug)
        );

        createPage({
          path: topicStoriesPath,
          component: templates.topicStories,
          context: {
            topic,
            stories: relatedStories,
            topics,
            permalink: `https://www.abhith.net${topicStoriesPath}`,
          },
        });
      }

      if (topic.totalVideos > 0) {
        let relatedVideos = allVideos.data.videos.edges.filter((item) =>
          item.node.tags.includes(topic.slug)
        );

        createPage({
          path: topicVideosPath,
          component: templates.topicVideos,
          context: {
            topic,
            videos: relatedVideos,
            topics,
            permalink: `https://www.abhith.net${topicVideosPath}`,
          },
        });
      }

      if (topic.totalServices > 0) {
        let relatedTools = allTools.data.tools.edges.filter((item) =>
          item.node.tags.includes(topic.slug)
        );

        createPage({
          path: topicToolsPath,
          component: templates.topicTools,
          context: {
            topic,
            tools: relatedTools,
            topics,
            permalink: `https://www.abhith.net${topicToolsPath}`,
          },
        });
      }
    });

    pages.forEach((edge) => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        context: {
          id,
        },
      });
    });

    log(`Creating`, "paginated blog");
    paginate({
      createPage,
      items: articles,
      itemsPerPage: 10,
      pathPrefix: "/blog",
      component: templates.blog,
      context: {
        topics: topics.filter((topic) => topic.totalPosts > 0),
      },
    });

    log(`Creating`, "paginated stories");
    paginate({
      createPage,
      items: stories,
      itemsPerPage: 10,
      pathPrefix: "/recommended/stories",
      component: templates.stories,
      context: {
        topics: topics.filter((topic) => topic.totalStories > 0),
      },
    });

    // Create your paginated videos
    paginate({
      createPage, // The Gatsby `createPage` function
      items: videos, // An array of objects
      itemsPerPage: 10, // How many items you want per page
      pathPrefix: "/recommended/videos", // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve("src/templates/videos-page.js"), // Just like `createPage()`
      context: {
        topics: topics.filter((topic) => topic.totalVideos > 0),
      },
    });

    // Create your paginated tools
    paginate({
      createPage, // The Gatsby `createPage` function
      items: services, // An array of objects
      itemsPerPage: 10, // How many items you want per page
      pathPrefix: "/recommended/services", // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve("src/templates/services-page.js"), // Just like `createPage()`
    });

    let redirectBatch1 = [
      { f: `hello-world/` },
      {
        f: `inserting-rewrite-rule-in-release-config/`,
      },
      {
        f: `redirect-non-www-urls-to-www-urls/`,
      },
      {
        f: `event-tracking-with-google-analytics/`,
      },
      {
        f: `umbraco-get-current-page-in-partial-view/`,
      },
      {
        f: `set-selected-option-by-value-via-jquery/`,
      },
      { f: `best-umbraco-packages/` },
      {
        f: `xamarin-development-problems-and-solutions/`,
      },

      {
        f: `redirect-www-to-non-www-using-webconfig-in-iis/`,
      },
      {
        f: `redirect-http-to-https-using-webconfig-in-iis/`,
      },
      {
        f: `redirect-https-requests-to-http-using-iis-rewrite-rule-in-webconfig/`,
      },

      {
        f: `hunting-security-bugs-in-an-old-web-application/`,
      },
      {
        f: `git-branch-not-showing-in-visual-studio-team-explorer/`,
      },
      {
        f: `sitefinity-rookie-guide-get-users-in-a-custom-role/`,
      },
      {
        f: `remove-specific-class-from-all-elements-jquery/`,
      },
      {
        f: `javascript-determine-if-user-is-on-mobile-device/`,
      },
      {
        f: `markdown-link-within-document/`,
      },
      {
        f: `visual-studio-keeps-crashing-first-aid/`,
      },
      {
        f: `sitefinity-read-localized-resource-labels-in-mvc-widget/`,
      },
      {
        f: `sitefinity-caching-issue-for-pages-with-no-caching-profile/`,
      },

      { f: `2017-year-in-review/` },

      {
        f: `best-font-for-visual-studio/`,
      },
      {
        f: `aspnet-web-forms-manually-trigger-client-side-validation/`,
      },

      {
        f: `download-file-using-wcf-rest-service/`,
      },
      {
        f: `fetch-row-count-for-all-tables-in-a-sql-server/`,
      },

      {
        f: `enable-click-jacking-protection-umbraco/`,
      },
      { f: `react-native-build-apk/` },

      {
        f: `iis-options-requests-returns-404/`,
      },
      { f: `flutter-cookbook/` },
      {
        f: `the-best-extensions-for-visual-studio-2010/`,
      },
      {
        f: `pad-a-number-with-leading-zeros-in-sql-to-make-uniform-char-length/`,
      },
      { f: `docker-cookbook/` },
      {
        f: `netstandard20-project-docfx-msbuild-error/`,
      },
      {
        f: `filtering-paging-and-sorting-in-sql-server-2008/`,
      },
      {
        f: `gitlab-clone-a-repository-when-2fa-enabled/`,
      },
      {
        f: `project-management-organize-issues-using-labels/`,
      },
      {
        f: `best-visual-studio-code-extensions/`,
      },
    ];

    // Then we can loop through the array of object literals to create
    // each redirect. A for loop would do the trick
    for (var { f: slug } of redirectBatch1) {
      createRedirect({
        fromPath: `/post/${slug}`,
        isPermanent: true,
        redirectInBrowser: true,
        toPath: `/blog/${slug}`,
      });

      let redirectBatch2 = [
        {
          f: `check-if-string-is-arabic-c/`,
          t: `check-if-string-is-arabic-csharp/`,
        },
        {
          f: `determine-total-number-of-openactive-connections-in-ms-sql-server/`,
          t: `determine-total-number-of-open-active-connections-in-ms-sql-server/`,
        },

        {
          f: `getset-hidden-field-value-using-jquery/`,
          t: `get-set-hidden-field-value-using-jquery/`,
        },
        {
          f: `sitefinity-development-problems-and-solutions/`,
          t: `sitefinity-development-problems-solutions/`,
        },
        {
          f: `ip-security-configure-ip-address-restrictions-in-webconfig-on-iis/`,
          t: `ip-security-configure-ip-address-restrictions-in-web-config-on-iis/`,
        },
        {
          f: `vuejs-list-rendering-limit-items-in-v-for/`,
          t: `vue-js-list-rendering-limit-items-in-v-for/`,
        },

        {
          f: `dotnet-interview-questions-and-answers/`,
          t: `dot-net-interview-questions-and-answers/`,
        },
        {
          f: `fix-web-deploy-could-not-verify-the-server-s-certificate/`,
          t: `fix-web-deploy-could-not-verify-the-server-certificate/`,
        },
        {
          f: `aspnet-core-starting-the-web-server-is-taking-longer-than-expected/`,
          t: `asp-net-core-starting-the-web-server-is-taking-longer-than-expected/`,
        },
      ];

      for (var { f, t } of redirectBatch2) {
        createRedirect({
          fromPath: `/post/${f}`,
          isPermanent: true,
          redirectInBrowser: true,
          toPath: `/blog/${t}`,
        });
        // Uncomment next line to see loop in action during build
        // console.log('\nRedirecting:\n' + f + '\nTo:\n' + t + '\n');
        // or check .cache/redirects.json post-compile.
      }
    }
  });
};
