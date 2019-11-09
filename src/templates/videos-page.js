import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import VideosRoll from "../components/VideosRoll";
import { graphql } from "gatsby";
import Pagination from "../components/Pagination";

export default class RecommendedVideosIndexPage extends React.Component {
  render() {
    const { pageContext, data } = this.props;
    const { previousPagePath, nextPagePath } = pageContext;
    const videos = data.recommendedVideos.edges;
    return (
      <Layout>
        <div className="container">
          <SEO
            title="Recommended Videos"
            description="Videos which Abhith recommends."
            slug="\recommended\videos"
          />
          <div className="section">
            <div className="columns">
              <div className="column is-two-thirds main-loop">
                <h1 className="has-text-weight-bold title is-6 text-uppercase mb-4">
                  <span>Recommended</span>
                </h1>
                <h4 className="spanborder">
                  <span className="title is-4 has-text-weight-bold">
                    Videos
                  </span>
                </h4>
                <VideosRoll videos={videos} />
                <Pagination
                  previousPagePath={previousPagePath}
                  nextPagePath={nextPagePath}
                ></Pagination>
              </div>

              <div className="column">
                {/* {% include sidebar-featured.html %}     */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

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
          id
          url
          type
        }
      }
    }
  }
`;
