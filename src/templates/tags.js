import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const tag = this.props.pageContext.tag;
    const title = this.props.data.site.siteMetadata.title;
    // const totalCount = this.props.data.allMarkdownRemark.totalCount;
    // const tagHeader = `${totalCount} post${
    //   totalCount === 1 ? "" : "s"
    // } tagged with “${tag}”`;
    return (
      <Layout>
        <Helmet title={`${tag} | ${title}`} />
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <h1 class="font-weight-bold title h6 text-uppercase mb-4">
                <span>Tags</span>
              </h1>
              <h4 class="font-weight-bold spanborder text-capitalize">
                <span>{tag}</span>
              </h4>
              <BlogRoll posts={posts} />
            </div>
            <div class="col-md-4">
              {/* {% include sidebar-featured.html %}     */}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 186)
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
