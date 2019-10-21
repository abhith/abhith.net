import React from "react";
import { graphql } from "gatsby";
import VideosRoll from "../components/VideosRoll";
import TopicPageBase from "../components/TopicPageBase";

class TopicVideosPage extends React.Component {
  render() {
    const data = this.props.data;

    const topicDetails = data.topicDetails;

    const title =
      topicDetails === null ? this.props.pageContext.tag : topicDetails.title;

    const totalPostCount = data.allMdx.totalCount;
    const totalVideoCount = data.recommendedVideos.totalCount;
    const totalServiceCount = data.recommendedServices.totalCount;
    const totalStoriesCount = data.recommendedStories.totalCount;

    const videos = data.recommendedVideos.edges;

    return (
      <TopicPageBase
        slug={this.props.pageContext.tag}
        title={title}
        totalPostCount={totalPostCount}
        totalServiceCount={totalServiceCount}
        totalStoriesCount={totalStoriesCount}
        totalVideoCount={totalVideoCount}
        activeTab="videos"
      >
        {videos.length > 0 && <VideosRoll videos={videos} />}
      </TopicPageBase>
    );
  }
}

export default TopicVideosPage;

export const topicVideosPageQuery = graphql`
  query TopicVideosPage($tag: String) {
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
    }
    recommendedVideos: allVideosJson(
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
      edges {
        node {
          id
          url
          type
        }
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
    }
  }
`;
