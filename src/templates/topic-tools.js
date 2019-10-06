import React from "react";
import { graphql } from "gatsby";
import ServicesRoll from "../components/ServicesRoll";
import TopicPageBase from "../components/TopicPageBase";

class TopicToolsPage extends React.Component {
  render() {
    const data = this.props.data;

    const topicDetails = data.topicDetails;

    const title =
      topicDetails === null ? this.props.pageContext.tag : topicDetails.title;

    const totalPostCount = data.allMarkdownRemark.totalCount;
    const totalVideoCount = data.recommendedVideos.totalCount;
    const totalServiceCount = data.recommendedServices.totalCount;
    const totalStoriesCount = data.recommendedStories.totalCount;

    const services = data.recommendedServices.edges;

    return (
      <TopicPageBase
        slug={this.props.pageContext.tag}
        title={title}
        totalPostCount={totalPostCount}
        totalServiceCount={totalServiceCount}
        totalStoriesCount={totalStoriesCount}
        totalVideoCount={totalVideoCount}
        activeTab="tools"
      >
        {services.length > 0 && <ServicesRoll services={services} />}
      </TopicPageBase>
    );
  }
}

export default TopicToolsPage;

export const topicToolsPageQuery = graphql`
  query TopicToolsPage($tag: String) {
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
    }
  }
`;
