import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo/seo";
import VideosRoll from "../components/videos-roll";
import { graphql, Link } from "gatsby";
import Pagination from "../components/pagination";
import TopicsCloud from "@components/topics-cloud";

function VideosPage({ pageContext, data }) {
  const { previousPagePath, nextPagePath, topics } = pageContext;
  const videos = data.recommendedVideos.edges;

  return (
    <Layout>
      <SEO
        title="Recommended Videos"
        description="Videos which Abhith recommends."
        slug="\recommended\videos"
      />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-9 is-10-widescreen main-loop">
              <h4 className="title is-4 spanborder has-text-weight-bold">
                <span>Recommended Videos</span>
              </h4>
              <div className="ar-breadcrumb is-hidden-mobile">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li>
                      <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                      <Link to={`/recommended`}>Recommended</Link>
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
              <VideosRoll videos={videos} />
              <Pagination
                previousPagePath={previousPagePath}
                nextPagePath={nextPagePath}
              ></Pagination>
            </div>
            <TopicsCloud topics={topics} section="videos" />
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
