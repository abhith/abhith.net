import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo/seo";
import { graphql, Link } from "gatsby";
import Pagination from "../components/pagination";
import TopicCloud from "@components/topic-cloud";
import PageHero from "@components/page-hero";
import { partition } from "lodash";
import ResponsiveReactPlayer from "@components/responsive-react-player";

function VideosPage({ pageContext, data }) {
  const { previousPagePath, nextPagePath, topics } = pageContext;
  const videos = data.recommendedVideos.edges;
  const pageTitle = `Recommended Videos`;
  const subTitle = `Videos which Abhith recommends.`;
  let videosFirstHalf = [];
  let videosSecondHalf = [];
  const rowElements = [];
  let rowItemsCollection = [];

  if (videos.length > 2) {
    [videosFirstHalf, videosSecondHalf] = partition(videos, (i) => {
      return videos.indexOf(i) % 2 === 0;
    });
    rowItemsCollection = [videosFirstHalf, videosSecondHalf];
  } else {
    rowItemsCollection = [videos];
  }

  rowItemsCollection.forEach((rowItems, index) => {
    rowElements.push(
      <div className="column" key={index}>
        {rowItems.map(({ node: video }) => {
          return (
            <ResponsiveReactPlayer
              url={video.url}
              title={video.title}
              topics={video.tags}
              key={video.id}
            />
          );
        })}
      </div>
    );
  });

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={subTitle}
        slug="/recommended/videos/"
      />
      <PageHero title={pageTitle} subtitle={subTitle} />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-9 is-10-widescreen main-loop">
              <div className="ar-breadcrumb is-hidden-mobile">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li>
                      <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                      <Link to={`/recommended/`}>Recommended</Link>
                    </li>
                    <li className="is-active">
                      <a href="#" aria-current="page">
                        Videos
                      </a>
                    </li>
                  </ul>
                </nav>
                <nav className="bd-prev-next">
                  {previousPagePath ? (
                    <Link to={previousPagePath} title={`previous`}>
                      ←
                    </Link>
                  ) : (
                    <span>←</span>
                  )}

                  {nextPagePath ? (
                    <Link to={nextPagePath} title={`next`}>
                      →
                    </Link>
                  ) : (
                    <span>→</span>
                  )}
                </nav>
              </div>
              <div className="columns">{rowElements}</div>
              <Pagination
                previousPagePath={previousPagePath}
                nextPagePath={nextPagePath}
              ></Pagination>
            </div>
            <TopicCloud topics={topics} section="videos" title="Video Topics" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default VideosPage;

export const pageQuery = graphql`
  query RecommendedVideosIndexPageQuery($skip: Int!, $limit: Int!) {
    videoImg: file(relativePath: { eq: "recommended-video.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 505) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    recommendedVideos: allVideosJson(
      sort: { fields: [date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      totalCount
      edges {
        node {
          tags
          title
          url
          type
          id
        }
      }
    }
  }
`;
