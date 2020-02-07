import React from "react";
import { graphql, StaticQuery } from "gatsby";
import BlogRollItem from "../BlogRollItem";
import BlogCard from "../blog/BlogCard";
import Button from "../Button";
const normalize = require("../../../gatsby/data/data.normalize");

function LatestPosts() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const totalArticlesCount = data.posts.totalCount;
        const latestArticles = data.latestArticles.edges.map(
          normalize.local.articles
        );

        const lastUpdatedPost = data.lastUpdatedPost.edges.map(
          normalize.local.articles
        )[0];

        return (
          <section className="section">
            <div className="container is-fluid">
              <div className="columns">
                <BlogCard post={latestArticles[0]}></BlogCard>
                <div className="column">
                  {latestArticles.slice(1, 3).map(node => {
                    return <BlogRollItem post={node} key={node.slug} />;
                  })}
                </div>
                <BlogCard
                  post={lastUpdatedPost}
                  tag={`Recently Updated`}
                ></BlogCard>
              </div>
              <Button
                text={`View All ${totalArticlesCount} Articles`}
                path="/blog"
              ></Button>
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
    lastUpdatedPost: allArticle(
      sort: { fields: [lastModificationTime], order: DESC }
      filter: { lastModificationTime: { ne: null }, draft: { eq: false } }
      limit: 1
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
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          commentId
        }
      }
    }
    latestArticles: allArticle(
      sort: { fields: [date], order: DESC }
      filter: { draft: { eq: false } }
      limit: 3
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
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          commentId
        }
      }
    }
    posts: allArticle(filter: { draft: { eq: false } }) {
      totalCount
    }
  }
`;
