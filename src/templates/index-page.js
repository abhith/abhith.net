import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import LatestPosts from "../components/home/LatestPosts";
import Hero from "../components/home/Hero";
import StoriesRoll from "../components/StoriesRoll";
import FeaturedSidebar from "../components/FeaturedSidebar";
import SEO from "../components/seo/SEO";

export const IndexPageTemplate = ({ title, stories, featured }) => (
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
        {/* <div className="mt-5" /> */}
      </div>

      <div className="col-md-4">
        <FeaturedSidebar items={featured} />
      </div>
    </div>
  </div>
);

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
  stories: PropTypes.array,
  featured: PropTypes.array
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.homePage;

  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        stories={data.recommendedStories.edges}
        featured={data.featured.edges}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    homePage: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    recommendedStories: PropTypes.object,
    featured: PropTypes.object
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    homePage: markdownRemark(
      frontmatter: { templateKey: { eq: "index-page" } }
    ) {
      frontmatter {
        title
      }
    }
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
