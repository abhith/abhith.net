import React from "react";

import Layout from "../../../components/Layout";
import SEO from "../../../components/seo/SEO";
import VideosRoll from "../../../components/VideosRoll";

export default class RecommendedVideosIndexPage extends React.Component {
  render() {
    const { data } = this.props;

    const videos = data.recommendedVideos.edges;
    return (
      <Layout>
        <div className="container">
          <SEO
            title="Recommended Videos"
            description="Videos which Abhith recommends."
            slug="\recommended\videos"
          />
          <div className="row mt-3">
            <div className="col-md-8 main-loop">
              <h1 className="font-weight-bold title h6 text-uppercase mb-4">
                <span>Recommended</span>
              </h1>
              <h4 className="font-weight-bold spanborder">
                <span>Videos</span>
              </h4>
              <VideosRoll videos={videos} />
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

export const pageQuery = graphql`
  query RecommendedVideosIndexPageQuery {
    videoImg: file(relativePath: { eq: "recommended-video.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 505) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    recommendedVideos: allVideosJson(sort: { fields: [date], order: DESC }) {
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
