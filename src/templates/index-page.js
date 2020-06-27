import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import LatestPosts from "../components/home/latest-posts";
import Hero from "../components/home/hero";
import StoriesRoll from "../components/stories-roll";
import FeaturedSidebar from "../components/featured-sidebar";
import SEO from "../components/seo/seo";
import VideosRoll from "../components/videos-roll";
import Button from "../components/button";

export const IndexPageTemplate = ({
  stories,
  featured,
  videos,
  totalStories,
  totalVideos,
  totalServices,
}) => (
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
                  <div className="title">
                    <span role="img" aria-label="inbox">
                      📬
                    </span>{" "}
                    Recommended{" "}
                  </div>
                  <div className="subtitle has-numbers">
                    <span className="tag">{totalStories}</span> Developer
                    stories, <span className="tag">{totalVideos}</span> Videos
                    and <span className="tag">{totalServices}</span> Services
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
            <StoriesRoll posts={stories} />
            <Button
              text={`View All ${totalStories} Stories`}
              path="/recommended/stories"
            ></Button>
          </div>
          <div className="column is-one-third">
            <h4 className="spanborder">
              <span className="title is-4 has-text-weight-bold">
                Recommended Videos
              </span>
            </h4>
            <VideosRoll videos={videos} />
            <Button
              text={`View All ${totalVideos} Videos`}
              path="/recommended/videos"
            ></Button>
          </div>
          <div className="column is-one-third">
            <FeaturedSidebar items={featured} totalCount={totalServices} />
          </div>
        </div>
      </div>
    </div>
  </>
);

IndexPageTemplate.propTypes = {
  stories: PropTypes.array,
  videos: PropTypes.array,
  featured: PropTypes.array,
  totalStories: PropTypes.number,
  totalVideos: PropTypes.number,
  totalServices: PropTypes.number,
};

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <IndexPageTemplate
        stories={data.recommendedStories.edges}
        videos={data.recommendedVideos.edges}
        featured={data.featured.edges}
        totalStories={data.recommendedStories.totalCount}
        totalVideos={data.recommendedVideos.totalCount}
        totalServices={data.featured.totalCount}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    recommendedStories: PropTypes.object,
    recommendedVideos: PropTypes.object,
    featured: PropTypes.object,
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    recommendedStories: allStoriesJson(
      limit: 5
      sort: { fields: [date], order: DESC }
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
      limit: 3
      sort: { fields: [date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          tags
          title
          url
          type
          id
        }
      }
    }
    featured: allServicesJson(
      limit: 9
      sort: { fields: [date], order: [DESC] }
    ) {
      totalCount
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
