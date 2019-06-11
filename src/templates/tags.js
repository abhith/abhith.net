import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import SEO from "../components/seo/SEO";
import StoriesRoll from "../components/StoriesRoll";
import VideosRoll from "../components/VideosRoll";
import ServicesRoll from "../components/ServicesRoll";

class TagRoute extends React.Component {
  render() {
    const data = this.props.data;

    const posts = data.allMarkdownRemark.edges;
    const tagDetails = data.tagDetails;

    const tag =
      tagDetails === null ? this.props.pageContext.tag : tagDetails.title;

    const totalPostCount = data.allMarkdownRemark.totalCount;
    const totalVideoCount = data.recommendedVideos.totalCount;
    const totalServiceCount = data.recommendedServices.totalCount;
    const totalStoriesCount = data.recommendedStories.totalCount;
    let summary = [];

    if (totalPostCount > 0) {
      summary.push(`${totalPostCount} post${totalPostCount === 1 ? "" : "s"}`);
    }

    if (totalVideoCount > 0) {
      summary.push(
        `${totalVideoCount} video${totalVideoCount === 1 ? "" : "s"}`
      );
    }

    if (totalStoriesCount > 0) {
      summary.push(
        `${totalStoriesCount} developer stor${
          totalStoriesCount === 1 ? "y" : "ies"
        }`
      );
    }

    if (totalServiceCount > 0) {
      summary.push(
        `${totalServiceCount} tool(s)/service${
          totalServiceCount === 1 ? "" : "s"
        }`
      );
    }

    let tagHeader;
    if (summary.length === 1) {
      tagHeader = `${summary[0]} tagged with “${tag}”`;
    } else {
      tagHeader = `${summary
        .join(", ")
        .replace(/, ([^,]*)$/, " and $1")} tagged with “${tag}”`;
    }

    const stories = data.recommendedStories.edges;
    const videos = data.recommendedVideos.edges;
    const services = data.recommendedServices.edges;

    return (
      <Layout>
        <SEO
          title={tag}
          description={tagHeader}
          slug={`\\tags\\${this.props.pageContext.tag}`}
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="font-weight-bold title h6 text-uppercase mb-4">
                <span>Tags</span>
              </h1>
              <h4 className="font-weight-bold spanborder text-capitalize">
                <span>{tag}</span>
              </h4>

              <BlogRoll posts={posts} />

              {videos.length > 0 && (
                <div>
                  <h4 className="font-weight-bold spanborder">
                    <span>Recommended Videos</span>
                  </h4>
                  <VideosRoll videos={videos} />
                </div>
              )}

              {stories.length > 0 && (
                <div>
                  <h4 className="font-weight-bold spanborder">
                    <span>Recommended Stories</span>
                  </h4>
                  <StoriesRoll posts={stories} />
                </div>
              )}
              {services.length > 0 && (
                <div>
                  <h4 className="font-weight-bold spanborder">
                    <span>Recommended Services</span>
                  </h4>
                  <ServicesRoll services={services} />
                </div>
              )}
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

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    tagDetails: tagsJson(slug: { eq: $tag }) {
      title
      slug
      description
      id
      image
    }
    recommendedServices: allServicesJson(
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
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
    recommendedStories: allStoriesJson(
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
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
    recommendedVideos: allVideosJson(
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 186)
          id
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            description
            templateKey
            date(formatString: "MMMM DD, YYYY")
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
