import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import LatestPosts from "../components/home/LatestPosts";
import Hero from "../components/home/Hero";
import StoriesRoll from "../components/StoriesRoll";
import FeaturedSidebar from "../components/FeaturedSidebar";
import SEO from "../components/seo/SEO";
import VideosRoll from "../components/VideosRoll";

export const IndexPageTemplate = ({ stories, featured, videos }) => (
  <div className="container">
    <SEO />
    <LatestPosts />
    <Hero />
    <div className="row mt-3">
      <div className="col-md-8 main-loop">
        <h4 className="font-weight-bold spanborder">
          <span>Recommended Stories</span>
        </h4>
        <StoriesRoll posts={stories} />
        <h4 className="font-weight-bold spanborder">
          <span>Recommended Videos</span>
        </h4>
        <VideosRoll videos={videos} />
      </div>

      <div className="col-md-4">
        <FeaturedSidebar items={featured} />
      </div>
    </div>
  </div>
);

IndexPageTemplate.propTypes = {
  stories: PropTypes.array,
  videos: PropTypes.array,
  featured: PropTypes.array
};

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <IndexPageTemplate
        stories={data.recommendedStories.edges}
        videos={data.recommendedVideos.edges}
        featured={data.featured.edges}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    recommendedStories: PropTypes.object,
    recommendedVideos: PropTypes.object,
    featured: PropTypes.object
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    recommendedStories: allStoriesJson(
      limit: 5
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          title
          date(formatString: "MMM DD, YYYY")
          description
          id
          image
          tags
          url
        }
      }
    }
    recommendedVideos: allVideosJson(
      limit: 5
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          id
          url
          type
        }
      }
    }
    featured: allServicesJson(limit: 5, sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          id
          tags
          url
        }
      }
    }
  }
`;
