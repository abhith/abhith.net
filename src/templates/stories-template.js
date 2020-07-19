import Layout from "@components/layout";
import Pagination from "@components/pagination";
import SEO from "@components/seo/seo";
import StoriesRoll from "@components/stories-roll";
import TopicsCloud from "@components/topics-cloud";

import { graphql, Link } from "gatsby";
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
                <span>Recommended Developer Stories</span>
              </h4>
              <div className="ar-breadcrumb is-hidden-mobile">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li>
                      <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                      <Link to={`/recommended`}>Recommended</Link>
                    </li>
                    <li className="is-active">
                      <a href="#" aria-current="page">
                        Developer Stories
                      </a>
                    </li>
                  </ul>
                </nav>
                <nav className="bd-prev-next">
                  {previousPagePath ? (
                    <Link to={previousPagePath} title={`previous`}>
                      ←
                    </Link>
                  ) : (
                    <span>←</span>
                  )}

                  {nextPagePath ? (
                    <Link to={nextPagePath} title={`next`}>
                      →
                    </Link>
                  ) : (
                    <span>→</span>
                  )}
                </nav>
              </div>
              <StoriesRoll posts={stories} />
              <Pagination
                previousPagePath={previousPagePath}
                nextPagePath={nextPagePath}
              />
            </div>
            <TopicsCloud topics={topics} section="stories" />
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
