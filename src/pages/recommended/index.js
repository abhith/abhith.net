import React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo/seo";
import VideosRoll from "../../components/videos-roll";
import { graphql, Link } from "gatsby";

import { GatsbyImage } from "gatsby-plugin-image";
import StoriesRoll from "@components/stories-roll";
import ServicesRoll from "@components/services-roll";
import PageHero from "@components/page-hero";

export default class RecommendedIndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const videoImgData = data.videoImg.childImageSharp.gatsbyImageData;
    const serviceImgData = data.serviceImg.childImageSharp.gatsbyImageData;
    const storiesImgData = data.storiesImg.childImageSharp.gatsbyImageData;
    const videos = data.recommendedVideos.edges;
    const stories = data.recommendedStories.edges;
    const services = data.services.edges;

    const pageTitle = `Recommended`;
    const subTitle = `Developer stories, videos, and services which Abhith recommends.`;

    return (
      <Layout>
        <Seo title={pageTitle} description={subTitle} slug="/recommended/" />
        <PageHero title={pageTitle} subtitle={subTitle} />
        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="column">
                <div>
                  <Link to="/recommended/stories/">
                    <GatsbyImage image={storiesImgData} />
                  </Link>
                  <div className="mt-1">
                    <Link to="/recommended/stories/">
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
                        to="/recommended/stories/"
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
                  <Link to="/recommended/videos/">
                    <GatsbyImage image={videoImgData} />
                  </Link>
                  <div className="mt-1">
                    <Link className="text-dark" to="/recommended/videos/">
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
                        to="/recommended/videos/"
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
                  <Link to="/recommended/services/">
                    <GatsbyImage image={serviceImgData} />
                  </Link>
                  <div className="">
                    <Link className="text-dark" to="/recommended/services/">
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
                        to="/recommended/services/"
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

export const pageQuery = graphql`query RecommendedIndexPageQuery {
  videoImg: file(relativePath: {eq: "recommended-video.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, width: 505, layout: CONSTRAINED)
    }
  }
  recommendedVideos: allVideosJson(limit: 1, sort: {fields: [date], order: DESC}) {
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
  serviceImg: file(relativePath: {eq: "recommended-services.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, width: 505, layout: CONSTRAINED)
    }
  }
  services: allRecommendedService(limit: 3, sort: {fields: [date], order: DESC}) {
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
  storiesImg: file(relativePath: {eq: "recommended-stories.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, width: 505, layout: CONSTRAINED)
    }
  }
  recommendedStories: allStoriesJson(
    limit: 3
    sort: {fields: [date], order: DESC}
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
