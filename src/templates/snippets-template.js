import SnippetRoll from "@components/snippet-roll";
import Layout from "@components/layout";
import Pagination from "@components/pagination";
import SEO from "@components/seo/seo";
import TopicsCloud from "@components/topic-cloud";
import { graphql } from "gatsby";
import React from "react";
import normalize from "../../gatsby/data/data.normalize";

function SnippetsPage({ pageContext, data }) {
  const snippets = data.snippets.edges.map(normalize.local.snippets);
  const { previousPagePath, nextPagePath, topics } = pageContext;

  return (
    <Layout>
      <SEO title="Snippets" description="Code snippets" slug="/snippets/" />

      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-9 is-10-widescreen">
              <h4 className="title is-4 spanborder has-text-weight-bold">
                <span>All Snippets</span>
              </h4>
              <SnippetRoll snippets={snippets} />
              <Pagination
                previousPagePath={previousPagePath}
                nextPagePath={nextPagePath}
              />
            </div>
            <TopicsCloud topics={topics} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SnippetsPage;

export const pageQuery = graphql`
  query SnippetRollQuery($skip: Int!, $limit: Int!) {
    snippets: allSnippet(
      filter: { draft: { eq: false } }
      sort: { order: DESC, fields: [date] }
      skip: $skip
      limit: $limit
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
