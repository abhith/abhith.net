import React from "react";
import { kebabCase, sortBy } from "lodash";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";
import SEO from "../../components/seo/SEO";
import { FaFileAlt, FaVideo, FaBookOpen, FaGlobe } from "react-icons/fa";

const TopicsPage = ({
  data: {
    allMarkdownRemark: { group: postsGroup },
    allStoriesJson: { group: storiesGroup },
    allVideosJson: { group: videosGroup },
    allServicesJson: { group: servicesGroup }
  }
}) => {
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

  return (
    <Layout>
      <section className="section">
        <SEO
          title="Topics"
          description={`Summary of all the ${topics.length} topics in abhith.net`}
          slug="/topics"
        />
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds">
              <h1 className="has-text-weight-bold title is-6 text-uppercase mb-4">
                <span>All Topics</span>
              </h1>
              {topics.map(topic => (
                <div className="box" key={topic.slug}>
                  <Link to={`/topics/${kebabCase(topic.slug)}/`}>
                    <p className="title mb-2">{topic.slug}</p>
                  </Link>
                  <div className="buttons">
                    {topic.totalPosts > 0 && (
                      <Link
                        className="button is-light"
                        to={`/topics/${kebabCase(topic.slug)}/`}
                      >
                        <FaFileAlt /> <span>&nbsp;{topic.totalPosts} POSTS</span>
                      </Link>
                    )}
                    {topic.totalVideos > 0 && (
                      <Link
                        className="button is-info"
                        to={`/topics/${kebabCase(topic.slug)}/`}
                      >
                        <FaVideo /> <span>&nbsp;{topic.totalVideos} VIDEOS</span>
                      </Link>
                    )}

                    {topic.totalStories > 0 && (
                      <Link
                        className="button is-link"
                        to={`/topics/${kebabCase(topic.slug)}/`}
                      >
                        <FaBookOpen /> <span>&nbsp;{topic.totalStories} STORIES</span>
                      </Link>
                    )}
                    {topic.totalServices > 0 && (
                      <Link
                        className="button is-white"
                        to={`/topics/${kebabCase(topic.slug)}/`}
                      >
                        <FaGlobe /> <span>&nbsp;{topic.totalServices} SERVICES</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="column">
              {/* {% include sidebar-featured.html %}     */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default TopicsPage;

export const pageQuery = graphql`
  query PageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
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
