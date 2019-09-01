import React from "react";
import { graphql, StaticQuery } from "gatsby";
import BlogRollItem from "../BlogRollItem";
import BlogCard from "../blog/BlogCard";

function LatestPosts() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const latestPost = data.latestPost.edges[0].node;
        const lastUpdatedPost = data.lastUpdatedPost.edges[0].node;
        const recentPosts = data.recentPosts.edges;

        return (
          <section className="section">
            <div className="container is-fluid">
              <div className="columns">
                <BlogCard post={latestPost}></BlogCard>
                <div className="column">
                  {recentPosts.map(({ node }) => {
                    return <BlogRollItem post={node} key={node.fields.slug} />;
                  })}
                </div>
                <BlogCard post={lastUpdatedPost} tag={`Recently Updated`}></BlogCard>
              </div>
            </div>
          </section>
        );
      }}
    />
  );
}

export default LatestPosts;

export const query = graphql`
  query {
    lastUpdatedPost: allMarkdownRemark(
      sort: { fields: [frontmatter___lastModificationTime], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" }, lastModificationTime: { ne: null } }}
      limit: 1
    ) {
      edges {
        node {
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            tags
            description
            image {
              childImageSharp {
                fluid(maxHeight: 200, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    latestPost: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 1
    ) {
      edges {
        node {
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            tags
            description
            image {
              childImageSharp {
                fluid(maxHeight: 200, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    recentPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      skip: 1
      limit: 2
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 375, quality: 100) {
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
