import Layout from "@components/layout";
import Pagination from "@components/pagination";
import Seo from "@components/seo/seo";
import StoriesRoll from "@components/stories-roll";
import TopicCloud from "@components/topic-cloud";
import PageHero from "@components/page-hero";

import { graphql, Link } from "gatsby";
import React from "react";

function StoriesPage({ pageContext, data }) {
  const { previousPagePath, nextPagePath, topics } = pageContext;
  const stories = data.recommendedStories.edges;
  const pageTitle = `Recommended Developer Stories`;
  const subTitle = `Developer stories which Abhith recommends.`;
  return (
    <Layout>
      <Seo
        title={pageTitle}
        description={subTitle}
        slug="/recommended/stories/"
      />
      <PageHero
        title={pageTitle}
        subtitle={subTitle}
        subscribeUrl={`https://www.abhith.net/recommended/stories/rss.xml`}
      />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-9 is-10-widescreen main-loop">
              <div className="ar-breadcrumb is-hidden-mobile">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li>
                      <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                      <Link to={`/recommended/`}>Recommended</Link>
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
                kind={`stories`}
              />
            </div>
            <TopicCloud
              topics={topics}
              section="stories"
              title="Story Topics"
            />
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
