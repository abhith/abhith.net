import React from "react";
import { graphql } from "gatsby";
import StoriesRoll from "../components/StoriesRoll";
import TopicPageBase from "../components/TopicPageBase";

class TopicStoriesPage extends React.Component {
  render() {
    const data = this.props.data;

    const topicDetails = data.topicDetails;

    const title =
      topicDetails === null ? this.props.pageContext.tag : topicDetails.title;

    const totalPostCount = data.allMdx.totalCount;
    const totalVideoCount = data.recommendedVideos.totalCount;
    const totalServiceCount = data.recommendedServices.totalCount;
    const totalStoriesCount = data.recommendedStories.totalCount;

    const stories = data.recommendedStories.edges;

    return (
      <TopicPageBase
        slug={this.props.pageContext.tag}
        title={title}
        totalPostCount={totalPostCount}
        totalServiceCount={totalServiceCount}
        totalStoriesCount={totalStoriesCount}
        totalVideoCount={totalVideoCount}
        activeTab="stories"
      >
        {stories.length > 0 && <StoriesRoll posts={stories} />}
      </TopicPageBase>
    );
  }
}

export default TopicStoriesPage;

export const topicStoriesPageQuery = graphql`
  query TopicStoriesPage($tag: String) {
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
    recommendedVideos: allVideosJson(
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
    }
  }
`;
