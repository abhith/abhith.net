import SnippetRoll from "@components/snippet-roll";
import Layout from "@components/layout";
import Pagination from "@components/pagination";
import Seo from "@components/seo/seo";
import TopicsCloud from "@components/topic-cloud";
import { graphql, Link } from "gatsby";
import React from "react";
import PageHero from "@components/page-hero";
import normalize from "../../gatsby/data/data.normalize";

function SnippetsPage({ pageContext, data }) {
  const snippets = data.snippets.edges.map(normalize.local.snippets);
  const { previousPagePath, nextPagePath, topics, category } = pageContext;
  const subTitle = `${category.totalSnippets} snippet${
    category.totalSnippets === 1 ? "" : "s"
  } on topic ${category.title}`;

  const title = `${category.title} Snippets`;
  return (
    <Layout>
      <Seo
        title={title}
        description={subTitle}
        slug={`/snippets/${category.slug}/`}
      />
      <PageHero title={title} subtitle={subTitle} />
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
                    <li>
                      <Link to={`/snippets/`}>Snippets</Link>
                    </li>
                    <li className="is-active">
                      <a
                        className="u-url"
                        href={`https://www.abhith.net/snippets/${category.slug}/`}
                      >
                        {category.title}
                      </a>
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
            <TopicsCloud
              title="Snippet Topics"
              topics={topics}
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
  query SnippetCategoryWiseRollQuery(
    $skip: Int!
    $limit: Int!
    $categorySlug: String
  ) {
    snippets: allSnippet(
      filter: { draft: { eq: false }, topics: { in: [$categorySlug] } }
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
