import React from "react";

import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import SEO from "../components/seo/SEO";
import { graphql } from "gatsby";
import Pagination from "../components/Pagination";

export default class BlogIndexPage extends React.Component {
  render() {
    const { pageContext, data } = this.props;
    // console.log(pageContext);
    const posts = data.allMarkdownRemark.edges;
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
                <BlogRoll posts={posts} />
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
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt(pruneLength: 186)
          id
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMMM DD, YYYY")
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
