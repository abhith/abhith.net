import React from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo/seo";
import VideosRoll from "../../components/videos-roll";
import { graphql, Link } from "gatsby";

import Img from "gatsby-image";
import StoriesRoll from "@components/stories-roll";
import ServicesRoll from "@components/services-roll";

export default class RecommendedIndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const videoImgData = data.videoImg.childImageSharp.fluid;
    const serviceImgData = data.serviceImg.childImageSharp.fluid;
    const storiesImgData = data.storiesImg.childImageSharp.fluid;
    const videos = data.recommendedVideos.edges;
    const stories = data.recommendedStories.edges;
    const services = data.services.edges;
    return (
      <Layout>
        <div className="container">
          <SEO
            title="Recommended"
            description="Developer stories, videos, and services which Abhith recommends."
            slug="\recommended"
          />
          <div className="section">
            <h1 className="title is-4 has-text-weight-bold mb-4">
              Recommended
            </h1>
            <div className="columns">
              <div className="column">
                <div>
                  <Link to="/recommended/stories">
                    <Img fluid={storiesImgData} />
                  </Link>
                  <div className="mt-1">
                    <Link to="/recommended/stories">
                      <h2 className="title is-4 has-text-weight-bold">
                        Developer Stories
                      </h2>
                    </Link>
                    <p className="content">
                      I read a lot, and that's how I stay updated about what's
                      going on around. Here I am listing out some of the stories
                      which I find useful.
                    </p>
                    <div className="cta-wrapper has-text-centered">
                      <Link
                        to="/recommended/stories"
                        className="button k-button k-primary raised has-gradient is-bold"
                      >
                        <span className="text">
                          View All {data.recommendedStories.totalCount} Stories
                        </span>
                        <span className="front-gradient"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <StoriesRoll
                  posts={stories}
                  showDescription={false}
                ></StoriesRoll>
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <div>
                  <Link to="/recommended/videos">
                    <Img fluid={videoImgData} />
                  </Link>
                  <div className="mt-1">
                    <Link className="text-dark" to="/recommended/videos">
                      <h2 className="title is-4 has-text-weight-bold">
                        VIDEOS
                      </h2>
                    </Link>
                    <p className="excerpt">
                      Similar to Developer Stories, here I am listing videos
                      which worth sharing.
                    </p>
                    <div className="cta-wrapper has-text-centered">
                      <Link
                        to="/recommended/videos"
                        className="button k-button k-primary raised has-gradient is-bold"
                      >
                        <span className="text">
                          View All {data.recommendedVideos.totalCount} Videos
                        </span>
                        <span className="front-gradient"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <VideosRoll videos={videos} />
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <div className="">
                  <Link to="/recommended/services">
                    <Img fluid={serviceImgData} />
                  </Link>
                  <div className="">
                    <Link className="text-dark" to="/recommended/services">
                      <h2 className="title is-4 has-text-weight-bold">
                        Tools & Services
                      </h2>
                    </Link>
                    <p className="excerpt">
                      There are plenty of online services available nowadays.
                      Here I am sharing some of the useful ones which I explored
                      yet.
                    </p>
                    <div className="cta-wrapper has-text-centered">
                      <Link
                        to="/recommended/services"
                        className="button k-button k-primary raised has-gradient is-bold"
                      >
                        <span className="text">
                          View All {data.services.totalCount} Tools & Services
                        </span>
                        <span className="front-gradient"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <ServicesRoll services={services} hideDescription={true} />
              </div>
            </div>
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
          tags
          title
          url
          type
          id
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
          description
          image
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
          tags
          url
        }
      }
    }
  }
`;
