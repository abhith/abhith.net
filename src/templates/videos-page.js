import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo/seo";
import { graphql, Link } from "gatsby";
import Pagination from "../components/pagination";
import TopicCloud from "@components/topic-cloud";
import PageHero from "@components/page-hero";
import { chunk } from "lodash";
import ResponsiveReactPlayer from "@components/responsive-react-player";

function VideosPage({ pageContext, data }) {
  const { previousPagePath, nextPagePath, topics } = pageContext;
  const videos = data.recommendedVideos.edges;
  const pageTitle = `Recommended Videos`;
  const subTitle = `Videos which Abhith recommends.`;
  const rowElements = [];
  let rowItemsCollection = [];
  rowItemsCollection = chunk(videos, 2);
  rowItemsCollection.forEach((rowItems, index) => {
    rowElements.push(
      <div className="columns" key={index}>
        {rowItems.map(({ node: video }) => {
          return (
            <div className="column" key={video.id}>
              <ResponsiveReactPlayer
                url={video.url}
                title={video.title}
                topics={video.tags}
              />
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <Layout>
      <Seo
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
              {rowElements}
              <Pagination
                previousPagePath={previousPagePath}
                nextPagePath={nextPagePath}
                kind={`videos`}
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
        gatsbyImageData(quality: 90, width: 505, layout: CONSTRAINED)
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
