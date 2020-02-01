import Layout from "@components/Layout";
import Pagination from "@components/Pagination";
import SEO from "@components/SEO";
import StoriesRoll from "@components/StoriesRoll";
import Topics from "@components/Topics";

import { graphql } from "gatsby";
import React from "react";

function StoriesPage({ pageContext, data }) {
  const { previousPagePath, nextPagePath, topics } = pageContext;
  const stories = data.recommendedStories.edges;

  return (
    <Layout>
      <SEO
        title="Recommended Developer Stories"
        description="Developer stories which Abhith recommends."
        slug="\recommended\stories"
      />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-9 is-10-widescreen main-loop">
              <h4 className="title is-4 spanborder has-text-weight-bold">
                <span>All Recommended Developer Stories</span>
              </h4>
              <StoriesRoll posts={stories} />
              <Pagination
                previousPagePath={previousPagePath}
                nextPagePath={nextPagePath}
              />
            </div>
            <Topics.Cloud topics={topics} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default StoriesPage;

export const pageQuery = graphql`
  query RecommendedStoriesIndexPageQuery($skip: Int!, $limit: Int!) {
    recommendedStories: allStoriesJson(
      sort: { fields: [date], order: DESC }
      skip: $skip
      limit: $limit
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
  }
`;
