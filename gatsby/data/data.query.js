const GatsbyFluid_withWebp = `
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
`;

module.exports.local = {
  articles: `{
      articles: allArticle(
        filter: {draft: {eq: false}}
      ) {
        edges {
          node {
            id
            author
            body
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
                fluid(maxWidth: 2048, quality: 100) {
                  ${GatsbyFluid_withWebp}
                }
              }
            }
            commentId
            tableOfContents
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
                fluid(maxWidth: 64, quality: 100) {
                  ${GatsbyFluid_withWebp}
                }
              }
              medium: childImageSharp {
                fluid(maxWidth: 128, quality: 100) {
                  ${GatsbyFluid_withWebp}
                }
              }
              large: childImageSharp {
                fluid(maxWidth: 328, quality: 100) {
                  ${GatsbyFluid_withWebp}
                }
              }
            }
          }
        }
      }
    }`,
  stories: `{
    stories: allStoriesJson(
    sort: { fields: [date], order: DESC }
  ) {
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
    videos:allVideosJson(
    sort: { fields: [date], order: DESC }
  ) {
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
    tools:allServicesJson(
    sort: { fields: [date], order: DESC }
  ) {
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
