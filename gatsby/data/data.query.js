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
      articles: allMdx {
        edges {
          node {
            id
            body
            fields {
              slug
              readingTime {
                text
              }
            }
            frontmatter {
              date
              dateString: date(formatString: "MMMM DD, YYYY")
              datePublishedSeoFormat: date(formatString: "YYYY-MM-DD")
              title
              description
              tags
              lastModificationTime
              lastModificationTimeString: lastModificationTime(
                formatString: "MMMM DD, YYYY"
              )
              dateModifiedSeoFormat: lastModificationTime(
                formatString: "YYYY-MM-DD"
              )
              image {
                full: childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ${GatsbyFluid_withWebp}
                  }
                }
              }
              commentId
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
    topics: allTopicsJson {
      edges {
        node {
          slug
          image
          title
        }
      }
    }
  }`
};
