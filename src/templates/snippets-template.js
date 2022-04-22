import SnippetRoll from "@components/snippet-roll";
import Layout from "@components/layout";
import Pagination from "@components/pagination";
import Seo from "@components/seo/seo";
import TopicCloud from "@components/topic-cloud";
import { graphql, Link } from "gatsby";
import React from "react";
import normalize from "../../gatsby/data/data.normalize";
import PageHero from "@components/page-hero";
import BreadcrumbActive from "@components/breadcrumb-active";

function SnippetsPage({ pageContext, data }) {
  const snippets = data.snippets.edges.map(normalize.local.snippets);
  const { previousPagePath, nextPagePath, topics } = pageContext;
  const pageTitle = `Snippets`;
  const subTitle = `No story telling, dive straight into code.`;
  return (
    <Layout>
      <Seo title={pageTitle} description={subTitle} slug="/snippets/" />
      <PageHero title={`All Snippets`} subtitle={subTitle} />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-9 is-10-widescreen">
              <div className="ar-breadcrumb is-hidden-mobile pb-5">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li>
                      <Link to={`/`}>Home</Link>
                    </li>
                    <li className="is-active">
                      <BreadcrumbActive>
                        <a
                          className="u-url"
                          href={`https://www.abhith.net/snippets/`}
                        >
                          {pageTitle}
                        </a>
                      </BreadcrumbActive>
                    </li>
                  </ul>
                </nav>
              </div>
              <SnippetRoll snippets={snippets} />
              <Pagination
                previousPagePath={previousPagePath}
                nextPagePath={nextPagePath}
                kind={`snippets`}
              />
            </div>
            <TopicCloud
              topics={topics}
              title="Snippet Topics"
              section="snippets"
            />
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
