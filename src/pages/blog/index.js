import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import SEO from "../../components/seo/SEO";
import { graphql } from "gatsby";

export default class BlogIndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;
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
  query BlogRollQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
