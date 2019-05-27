import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import SEO from "../components/Seo";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const tagDetails = this.props.data.tagDetails;

    const tag =
      tagDetails === null ? this.props.pageContext.tag : tagDetails.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with “${tag}”`;
    return (
      <Layout>
        <SEO title={tag} description={tagHeader} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="font-weight-bold title h6 text-uppercase mb-4">
                <span>Tags</span>
              </h1>
              <h4 className="font-weight-bold spanborder text-capitalize">
                <span>{tag}</span>
              </h4>
              <BlogRoll posts={posts} />
            </div>
            <div className="col-md-4">
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
    tagDetails: tagsJson(slug: { eq: $tag }) {
      title
      slug
      description
      id
      image
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
