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
