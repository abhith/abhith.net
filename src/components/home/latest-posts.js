import React from "react";
import { graphql, StaticQuery } from "gatsby";
import BlogRollItem from "../blog-roll-item";
import BlogCard from "../blog-card";
import TitleBar from "@components/title-bar";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
const normalize = require("../../../gatsby/data/data.normalize");

function LatestPosts() {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const totalArticlesCount = data.posts.totalCount;
        const latestArticles = data.latestArticles.edges.map(
          normalize.local.articles
        );

        const lastUpdatedPosts = data.lastUpdatedPosts.edges.map(
          normalize.local.articles
        );

        //* In order to skip the latest posts repeating in last updated one, we are fetching last four updated posts and selecting the one which is not in the latest posts.
        const lastUpdatedPost = lastUpdatedPosts.find((u) =>
          latestArticles.every((a) => a.id !== u.id)
        );

        return (
          <LatestPostsBody className="section">
            <div className="container">
              <TitleBar
                title="Latest Articles"
                linkTo="/blog/"
                linkText={`View All ${totalArticlesCount} Articles`}
              />
              <div className="columns">
                <div className="column">
                  <BlogCard post={latestArticles[0]}></BlogCard>
                </div>
                <div className="column">
                  {latestArticles.slice(1, 3).map((node) => {
                    return <BlogRollItem post={node} key={node.slug} />;
                  })}
                </div>
                <div className="column">
                  <BlogCard
                    post={lastUpdatedPost}
                    tag={`Recently Updated`}
                  ></BlogCard>
                </div>
              </div>
            </div>
          </LatestPostsBody>
        );
      }}
    />
  );
}

export default LatestPosts;

export const query = graphql`{
  lastUpdatedPosts: allArticle(
    sort: {fields: [lastModificationTime], order: DESC}
    filter: {lastModificationTime: {ne: null}, draft: {eq: false}}
    limit: 4
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
        lastModificationTimeString: lastModificationTime(formatString: "MMMM DD, YYYY")
        dateModifiedSeoFormat: lastModificationTime(formatString: "YYYY-MM-DD")
        hero {
          full: childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        commentId
      }
    }
  }
  latestArticles: allArticle(
    sort: {fields: [date], order: DESC}
    filter: {draft: {eq: false}}
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
        lastModificationTimeString: lastModificationTime(formatString: "MMMM DD, YYYY")
        dateModifiedSeoFormat: lastModificationTime(formatString: "YYYY-MM-DD")
        hero {
          full: childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        commentId
      }
    }
  }
  posts: allArticle(filter: {draft: {eq: false}}) {
    totalCount
  }
}
`;

const LatestPostsCss = (p) => css`
  @media screen and (max-width: 1980px) and (min-width: 767px) {
    .blog-post {
      margin: auto;
      a {
        display: block;
        padding: 10px;
      }
      .content {
        width: 100%;
        .post-title {
          font-size: 18px;
          .blog-date {
            margin: 0;
          }
        }
      }
      .featured-image {
        display: none;
      }
    }
  }
`;

const LatestPostsBody = styled.section`
  ${LatestPostsCss}
`;
