module.exports.local = {
  articles: `{
      articles: allArticle(
        filter: {draft: {eq: false}}
      ) {
        edges {
          node {
            id
            author
            slug
            timeToRead
            date
            dateString: date(formatString: "MMMM DD, YYYY")
            datePublishedSeoFormat: date(formatString: "YYYY-MM-DD")
            title
            excerpt
            tags
            lastModificationTime
            lastModificationTimeString: lastModificationTime(
              formatString: "MMMM DD, YYYY"
            )
            dateModifiedSeoFormat: lastModificationTime(
              formatString: "YYYY-MM-DD"
            )
            hero {
              full: childImageSharp {
                gatsbyImageData(quality: 100, layout: FULL_WIDTH)
              },
              seo: publicURL
            }
            commentId
            tableOfContents
            contentFilePath
          }
        }
      }      
    }`,
  snippets: `{
    snippets: allSnippet(
      filter: {draft: {eq: false}}
    ) {
      edges {
        node {
          id
          author
          slug
          timeToRead
          date
          dateString: date(formatString: "MMMM DD, YYYY")
          datePublishedSeoFormat: date(formatString: "YYYY-MM-DD")
          title
          excerpt
          topics
          lastModificationTime
          lastModificationTimeString: lastModificationTime(
            formatString: "MMMM DD, YYYY"
          )
          dateModifiedSeoFormat: lastModificationTime(
            formatString: "YYYY-MM-DD"
          )
          contentFilePath
        }
      }
    }      
  }`,
  authors: `{
      authors: allAuthor {
        edges {
          node {
            bio
            id
            name
            featured
            twitter
            slug
            avatar {
              small: childImageSharp {
                gatsbyImageData(quality: 100, layout: FULL_WIDTH)
              }
              medium: childImageSharp {
                gatsbyImageData(quality: 100, layout: FULL_WIDTH)
              }
              large: childImageSharp {
                gatsbyImageData(quality: 100, layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }`,
  stories: `{
  stories: allStoriesJson(sort: {date: DESC}) {
    edges {
      node {
        title
        date(formatString: "MMM DD, YYYY")
        description
        id
        tags
        url
      }
    }
  }
}`,
  videos: `{
  videos: allVideosJson(sort: {date: DESC}) {
    edges {
      node {
        id
        url
        type
        tags
        title
      }
    }
  }
}`,
  tools: `{
  tools: allRecommendedService(sort: {date: DESC}) {
    edges {
      node {
        title
        id
        tags
        url
        description
        image
      }
    }
  }
}`,
  topics: `{
    topics: allTopic {
      edges {
        node {
          slug
          image
          title
        }
      }
    }
  }`,
};
