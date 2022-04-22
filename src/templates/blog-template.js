import BlogRoll from "@components/blog-roll";
import Layout from "@components/layout";
import Pagination from "@components/pagination";
import Seo from "@components/seo/seo";
import TopicCloud from "@components/topic-cloud";
import { graphql, Link } from "gatsby";
import React from "react";
import normalize from "../../gatsby/data/data.normalize";
import PageHero from "@components/page-hero";
import BreadcrumbActive from "@components/breadcrumb-active";

function BlogPage({ pageContext, data }) {
  const articles = data.articles.edges.map(normalize.local.articles);
  const { previousPagePath, nextPagePath, topics } = pageContext;
  const pageTitle = `Blog`;
  const subTitle = `Abhith Rajan on Programming, The Web, Open Source, .NET, The Cloud and More.`;

  return (
    <Layout>
      <Seo title={pageTitle} description={subTitle} slug="/blog/" />
      <PageHero
        title={`All Articles`}
        subtitle={subTitle}
        subscribeUrl={`https://www.abhith.net/blog/rss.xml`}
      />
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
                          href={`https://www.abhith.net/blog/`}
                        >
                          {pageTitle}
                        </a>
                      </BreadcrumbActive>
                    </li>
                  </ul>
                </nav>
              </div>
              <BlogRoll posts={articles} />
              <Pagination
                previousPagePath={previousPagePath}
                nextPagePath={nextPagePath}
                kind={`blog`}
              />
            </div>
            <TopicCloud topics={topics} title="Article Topics" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BlogPage;

export const pageQuery = graphql`
  query BlogRollQuery($skip: Int!, $limit: Int!) {
    articles: allArticle(
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
          tags
          lastModificationTime
          lastModificationTimeString: lastModificationTime(
            formatString: "MMMM DD, YYYY"
          )
          dateModifiedSeoFormat: lastModificationTime(
            formatString: "YYYY-MM-DD"
          )
          hero {
            full: childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          commentId
        }
      }
    }
  }
`;
