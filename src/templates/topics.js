import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import SEO from "../components/seo/SEO";
import StoriesRoll from "../components/StoriesRoll";
import VideosRoll from "../components/VideosRoll";
import ServicesRoll from "../components/ServicesRoll";
import { kebabCase, sortBy } from "lodash";
class TagRoute extends React.Component {
  render() {
    const data = this.props.data;

    const postsGroup = data.allBlogPostTopics.group;
    const storiesGroup = data.allStoriesJson.group;
    const videosGroup = data.allVideosJson.group;
    const servicesGroup = data.allServicesJson.group;

    let topics = [];

    postsGroup.forEach(node => {
      topics.push({
        slug: node.fieldValue,
        totalPosts: node.totalCount,
        totalVideos: 0,
        totalStories: 0,
        totalServices: 0
      });
    });

    storiesGroup.forEach(node => {
      let topic = topics.find(topic => topic.slug === node.fieldValue);
      if (topic) {
        topic.totalStories = node.totalCount;
      } else {
        topics.push({
          slug: node.fieldValue,
          totalPosts: 0,
          totalVideos: 0,
          totalStories: node.totalCount,
          totalServices: 0
        });
      }
    });

    videosGroup.forEach(node => {
      let topic = topics.find(topic => topic.slug === node.fieldValue);
      if (topic) {
        topic.totalVideos = node.totalCount;
      } else {
        topics.push({
          slug: node.fieldValue,
          totalPosts: 0,
          totalVideos: node.totalCount,
          totalStories: 0,
          totalServices: 0
        });
      }
    });

    servicesGroup.forEach(node => {
      let topic = topics.find(topic => topic.slug === node.fieldValue);
      if (topic) {
        topic.totalServices = node.totalCount;
      } else {
        topics.push({
          slug: node.fieldValue,
          totalPosts: 0,
          totalVideos: 0,
          totalStories: 0,
          totalServices: node.totalCount
        });
      }
    });

    topics = sortBy(topics, topic => topic.slug);

    const posts = data.allMarkdownRemark.edges;
    const topicDetails = data.topicDetails;

    const tag =
      topicDetails === null ? this.props.pageContext.tag : topicDetails.title;

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
          slug={`\\topics\\${this.props.pageContext.tag}`}
        />
        <div className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-two-thirds">
                  <h1 className="title"> {tag} </h1>
                  <h2 className="subtitle">{tagHeader}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-3 is-2-widescreen is-hidden-mobile">
                <div className="menu">
                  <p className="menu-label"> Filter by topic </p>
                  <ul className="menu-list">
                    <li>
                      <a href="/topics">All</a>
                    </li>
                    {topics.map(topic => (
                      <li key={topic.slug}>
                        <Link
                          className={
                            topic.slug === this.props.pageContext.tag
                              ? "is-active"
                              : ""
                          }
                          to={`/topics/${kebabCase(topic.slug)}/`}
                        >
                          {topic.slug}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="column is-9 is-10-widescreen">
                <BlogRoll posts={posts} />
                {videos.length > 0 && (
                  <div>
                    <h4 className=" spanborder">
                      <span className="has-text-weight-bold">
                        Recommended Videos
                      </span>
                    </h4>
                    <VideosRoll videos={videos} />
                  </div>
                )}

                {stories.length > 0 && (
                  <div>
                    <h4 className=" spanborder">
                      <span className="has-text-weight-bold">
                        Recommended Stories
                      </span>
                    </h4>
                    <StoriesRoll posts={stories} />
                  </div>
                )}
                {services.length > 0 && (
                  <div>
                    <h4 className=" spanborder">
                      <span className="has-text-weight-bold">
                        Recommended Services
                      </span>
                    </h4>
                    <ServicesRoll services={services} />
                  </div>
                )}
              </div>
              <div className="column">
                {/* {% include sidebar-featured.html %}     */}
              </div>
            </div>
          </div>
        </section>
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
    topicDetails: topicsJson(slug: { eq: $tag }) {
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
    allBlogPostTopics: allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
    allStoriesJson {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
    allVideosJson {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
    allServicesJson {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
