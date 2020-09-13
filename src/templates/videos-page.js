import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo/seo";
import VideosRoll from "../components/videos-roll";
import { graphql, Link } from "gatsby";
import Pagination from "../components/pagination";
import TopicCloud from "@components/topic-cloud";
import PageHero from "@components/page-hero";

function VideosPage({ pageContext, data }) {
  const { previousPagePath, nextPagePath, topics } = pageContext;
  const videos = data.recommendedVideos.edges;
  const pageTitle = `Recommended Videos`;
  const subTitle = `Videos which Abhith recommends.`;
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
              <VideosRoll videos={videos} />
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
