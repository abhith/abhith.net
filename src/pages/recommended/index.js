import React from "react";
import Layout from "../../components/Layout";
import SEO from "../../components/seo/SEO";
import VideosRoll from "../../components/VideosRoll";
import StoriesRollItem from "../../components/StoriesRollItem";
import { graphql, Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { FaSpaceShuttle, FaVideo, FaBookOpen } from "react-icons/fa";

export default class RecommendedIndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const videoImgData = data.videoImg.childImageSharp.fluid;
    const serviceImgData = data.serviceImg.childImageSharp.fluid;
    const storiesImgData = data.storiesImg.childImageSharp.fluid;
    const videos = data.recommendedVideos.edges;
    return (
      <Layout>
        <div className="container">
          <SEO
            title="Recommended"
            description="Developer stories, videos, and services which Abhith recommends."
            slug="\recommended"
          />
          <h1 className="font-weight-bold title h6 text-uppercase mb-4">
            <span>Recommended</span>
          </h1>
          <div className="row">
            <div className="col-md-6">
              <div className="card border-0 mb-4 box-shadow">
                <Link to="/recommended/stories">
                  <BackgroundImage
                    Tag="div"
                    className={`img-bg topfirstimage`}
                    fluid={storiesImgData}
                  />
                </Link>
                <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
                  <h2 className="h4 font-weight-bold">
                    <Link className="text-dark" to="/recommended/stories">
                      Developer Stories
                    </Link>
                  </h2>
                  <p className="excerpt">
                    I read a lot, and that's how I stay updated about what's
                    going on around. Here I am listing out some of the stories
                    which I find useful.
                  </p>
                  <div>
                    <Link
                      className="sscroll btn btn-gray btn-sm"
                      to="/recommended/stories"
                    >
                      <FaBookOpen /> {data.recommendedStories.totalCount}{" "}
                      STORIES
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              {data.recommendedStories.edges.map(({ node }) => {
                return <StoriesRollItem post={node} key={node.id} />;
              })}
            </div>
          </div>

          <div className="row ">
            <div className="col-md-6">
              <div className="card border-0 mb-4 box-shadow">
                <Link to="/recommended/videos">
                  <BackgroundImage
                    Tag="div"
                    className={`img-bg topfirstimage`}
                    fluid={videoImgData}
                  />
                </Link>
                <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
                  <h2 className="h4 font-weight-bold">
                    <Link className="text-dark" to="/recommended/videos">
                      VIDEOS
                    </Link>
                  </h2>
                  <p className="excerpt">
                    Similar to Developer Stories, here I am listing videos which
                    worth sharing.
                  </p>
                  <div>
                    <small className="d-block text-muted">
                      <Link
                        className="sscroll btn btn-lightblue btn-sm"
                        to="/recommended/videos"
                      >
                        <FaVideo /> {data.recommendedVideos.totalCount} VIDEOS
                      </Link>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <VideosRoll videos={videos} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card border-0 mb-4 box-shadow">
                <Link to="/recommended/services">
                  <BackgroundImage
                    Tag="div"
                    className={`img-bg topfirstimage`}
                    fluid={serviceImgData}
                  />
                </Link>
                <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
                  <h2 className="h4 font-weight-bold">
                    <Link className="text-dark" to="/recommended/services">
                      Services
                    </Link>
                  </h2>
                  <p className="excerpt">
                    There are plenty of online services available nowadays. Here
                    I am sharing some of the useful ones which I explored yet.
                  </p>
                  <div>
                    <Link
                      className="sscroll btn btn-light btn-sm"
                      to="/recommended/services"
                    >
                      <FaSpaceShuttle /> {data.services.totalCount} SERVICES
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <VideosRoll videos={videos} />
            </div> */}
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query RecommendedIndexPageQuery {
    videoImg: file(relativePath: { eq: "recommended-video.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 505) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    recommendedVideos: allVideosJson(
      limit: 1
      sort: { fields: [date], order: DESC }
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
    serviceImg: file(relativePath: { eq: "recommended-services.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 505) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    services: allServicesJson(limit: 3, sort: { fields: [date], order: DESC }) {
      totalCount
      edges {
        node {
          title
          id
          tags
          url
        }
      }
    }
    storiesImg: file(relativePath: { eq: "recommended-stories.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 505) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    recommendedStories: allStoriesJson(
      limit: 3
      sort: { fields: [date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          title
          date(formatString: "MMM DD, YYYY")
          description
          id
          image
          tags
          url
        }
      }
    }
  }
`;
