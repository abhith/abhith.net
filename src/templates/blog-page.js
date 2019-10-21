import React from "react";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import SEO from "../components/seo/SEO";
import { graphql } from "gatsby";
import Pagination from "../components/Pagination";

const normalize = require("../../gatsby/data/data.normalize");
export default class BlogIndexPage extends React.Component {
  render() {
    const { pageContext, data } = this.props;
    // console.log(pageContext);
    const articles = data.articles.edges.map(normalize.local.articles);

    const { previousPagePath, nextPagePath } = pageContext;
    return (
      <Layout>
        <SEO
          title="Blog"
          description="Abhith Rajan on Programming, The Web, Open Source, .NET, The Cloud and More"
          slug="\blog"
        />

        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-9">
                <h4 className="title is-4 spanborder has-text-weight-bold">
                  <span>All Stories</span>
                </h4>
                <BlogRoll posts={articles} />
                <Pagination
                  previousPagePath={previousPagePath}
                  nextPagePath={nextPagePath}
                ></Pagination>
              </div>
              <div className="column">
                {/* {% include sidebar-featured.html %}     */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogRollQuery($skip: Int!, $limit: Int!) {
    articles: allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          body
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date
            dateString: date(formatString: "MMMM DD, YYYY")
            datePublishedSeoFormat: date(formatString: "YYYY-MM-DD")
            title
            description
            tags
            lastModificationTime
            lastModificationTimeString: lastModificationTime(
              formatString: "MMMM DD, YYYY"
            )
            dateModifiedSeoFormat: lastModificationTime(
              formatString: "YYYY-MM-DD"
            )
            image {
              full: childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            commentId
          }
        }
      }
    }
  }
`;
