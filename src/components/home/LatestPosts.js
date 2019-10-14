import React from "react";
import { graphql, StaticQuery } from "gatsby";
import BlogRollItem from "../BlogRollItem";
import BlogCard from "../blog/BlogCard";
const normalize = require("../../../gatsby/data/data.normalize");

function LatestPosts() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const latestPost = data.latestPost.edges.map(
          normalize.local.articles
        )[0];
        const lastUpdatedPost = data.lastUpdatedPost.edges.map(
          normalize.local.articles
        )[0];
        const recentPosts = data.recentPosts.edges.map(
          normalize.local.articles
        );

        return (
          <section className="section">
            <div className="container is-fluid">
              <div className="columns">
                <BlogCard post={latestPost}></BlogCard>
                <div className="column">
                  {recentPosts.map(node => {
                    return <BlogRollItem post={node} key={node.slug} />;
                  })}
                </div>
                <BlogCard
                  post={lastUpdatedPost}
                  tag={`Recently Updated`}
                ></BlogCard>
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
    lastUpdatedPost: allMdx(
      sort: { fields: [frontmatter___lastModificationTime], order: DESC }
      filter: { frontmatter: { lastModificationTime: { ne: null } } }
      limit: 1
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
    latestPost: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 1
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
    recentPosts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      skip: 1
      limit: 2
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
