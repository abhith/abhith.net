import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import LatestPosts from "../components/home/latest-posts";
import Hero from "../components/home/hero";
import StoriesRoll from "../components/stories-roll";
import FeaturedSidebar from "../components/featured-sidebar";
import Seo from "../components/seo/seo";
import VideosRoll from "../components/videos-roll";
import Button from "../components/button";
import TitleBar from "@components/title-bar";
import HomeSnippets from "../sections/home/home-snippets";
import { FcLike } from "react-icons/fc";
const normalize = require("../../gatsby/data/data.normalize");

const IndexPageTemplate = ({
  stories,
  featured,
  videos,
  totalStories,
  totalVideos,
  totalServices,
  snippets,
}) => (
  <>
    <Seo />
    <Hero />
    <LatestPosts />
    <HomeSnippets snippets={snippets} />
    <div className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12">
              <div className="columns is-vcentered">
                <div className="column has-text-centered">
                  <div className="title">
                    <FcLike size={30} />
                    <span className="ml-1">Recommended</span>
                  </div>
                  <div className="subtitle has-numbers">
                    <span className="tag">{totalStories}</span> Developer
                    stories <span className="tag">{totalVideos}</span> Videos{" "}
                    <span className="tag">{totalServices}</span> Tools and
                    Services
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">
            <TitleBar title="Developer Stories" />
            <StoriesRoll posts={stories} />
            <Button
              text={`View All ${totalStories} Stories`}
              path="/recommended/stories/"
            ></Button>
          </div>
          <div className="column is-one-third">
            <TitleBar title="Videos" />
            <VideosRoll videos={videos} />
            <Button
              text={`View All ${totalVideos} Videos`}
              path="/recommended/videos/"
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
  snippets: PropTypes.array,
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
        snippets={data.snippets.edges.map(normalize.local.snippets)}
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
    featured: allRecommendedService(
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
    snippets: allSnippet(
      filter: { draft: { eq: false } }
      sort: { order: DESC, fields: [date] }
      limit: 3
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
          topics
          lastModificationTime
          lastModificationTimeString: lastModificationTime(
            formatString: "MMMM DD, YYYY"
          )
          dateModifiedSeoFormat: lastModificationTime(
            formatString: "YYYY-MM-DD"
          )
        }
      }
    }
  }
`;
