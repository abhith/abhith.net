import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import LatestPosts from "../components/home/LatestPosts";
import Hero from "../components/home/Hero";
import StoriesRoll from "../components/StoriesRoll";
import FeaturedSidebar from "../components/FeaturedSidebar";
import SEO from "../components/seo/SEO";
import VideosRoll from "../components/VideosRoll";

export const IndexPageTemplate = ({ stories, featured, videos }) => (
  <>
    <SEO />
    <Hero />
    <LatestPosts />
    <div className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container is-fluid">
          <div className="columns is-centered">
            <div className="column is-12">
              <div className="columns is-vcentered">
                <div className="column has-text-centered">
                  <div className="title"> 📬 Recommended </div>
                  <div className="subtitle">
                    Developer stories, videos and services
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="section">
      <div className="container is-fluid">
        <div className="columns">
          <div className="column is-one-third">
            <h4 className="spanborder">
              <span className="title is-4 has-text-weight-bold">
                Recommended Stories
              </span>
            </h4>
            <StoriesRoll posts={stories} mode={`compact`} />
            <div className="cta-wrapper has-text-centered">
              <Link
                to="/recommended/stories"
                className="button k-button k-primary raised has-gradient is-bold"
              >
                <span className="text">View More Stories</span>
                <span className="front-gradient"></span>
              </Link>
            </div>
          </div>
          <div className="column is-one-third">
            <h4 className="spanborder">
              <span className="title is-4 has-text-weight-bold">
                Recommended Videos
              </span>
            </h4>
            <VideosRoll videos={videos} />
            <div className="cta-wrapper has-text-centered">
              <Link
                to="/recommended/videos"
                className="button k-button k-primary raised has-gradient is-bold"
              >
                <span className="text">View More Videos</span>
                <span className="front-gradient"></span>
              </Link>
            </div>
          </div>
          <div className="column is-one-third">
            <FeaturedSidebar items={featured} />
          </div>
        </div>
      </div>
    </div>
  </>
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
          tags
          url
        }
      }
    }
    recommendedVideos: allVideosJson(
      limit: 3
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
    featured: allServicesJson(
      limit: 10
      sort: { fields: [isAffiliate, date], order: [ASC, DESC] }
    ) {
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
