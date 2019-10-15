import React from "react";
import { graphql } from "gatsby";
import BlogRoll from "../components/BlogRoll";
import TopicPageBase from "../components/TopicPageBase";
class TopicIndexPage extends React.Component {
  render() {
    const data = this.props.data;

    const posts = data.allMdx.edges;
    const topicDetails = data.topicDetails;

    const title =
      topicDetails === null ? this.props.pageContext.tag : topicDetails.title;

    const totalPostCount = data.allMdx.totalCount;
    const totalVideoCount = data.recommendedVideos.totalCount;
    const totalServiceCount = data.recommendedServices.totalCount;
    const totalStoriesCount = data.recommendedStories.totalCount;

    return (
      <TopicPageBase
        slug={this.props.pageContext.tag}
        title={title}
        totalPostCount={totalPostCount}
        totalServiceCount={totalServiceCount}
        totalStoriesCount={totalStoriesCount}
        totalVideoCount={totalVideoCount}
        activeTab="posts"
      >
        <BlogRoll posts={posts} />
      </TopicPageBase>
    );
  }
}

export default TopicIndexPage;

export const topicIndexPageQuery = graphql`
  query TopicIndexPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    topicDetails: topicsJson(slug: { eq: $tag }) {
      title
      slug
      description
      id
      image
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 186)
          id
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMMM DD, YYYY")
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    recommendedServices: allServicesJson(
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
    }
    recommendedStories: allStoriesJson(
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
    }
    recommendedVideos: allVideosJson(
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
    }
  }
`;
