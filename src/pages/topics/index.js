import React from "react";
import { capitalize, sortBy } from "lodash";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";
import SEO from "../../components/seo/SEO";
import PageHero from "../../components/PageHero";
import { FaFileAlt, FaVideo, FaBookOpen, FaGlobe } from "react-icons/fa";
import TopicImage from "../../components/TopicImage";

const TopicsPage = ({
  data: {
    articleTagsGroup: { group: postsGroup },
    allStoriesJson: { group: storiesGroup },
    allVideosJson: { group: videosGroup },
    allServicesJson: { group: servicesGroup },
    allTopicsJson: { edges: existingTopics }
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

  // merging with existing topics
  topics.forEach(node => {
    let topicDetails = existingTopics.find(
      topic => topic.node.slug === node.slug
    );
    if (topicDetails) {
      node.title = topicDetails.node.title;
    } else {
      node.title = capitalize(node.slug);
    }
  });

  topics = sortBy(topics, topic => topic.slug);

  return (
    <Layout>
      <SEO
        title="Topics"
        description={`Summary of all the ${topics.length} topics in abhith.net`}
        slug="/topics"
      />
      <PageHero
        title={`All Topics`}
        subtitle={`Summary of all the ${topics.length} topics in abhith.net`}
        className={`position-relative page-hero`}
      ></PageHero>
      <section className="section">
        <div className="container is-fluid" id="topics-block">
          <div className="columns is-centered">
            <div className="column is-9">
              <div className="columns is-centered is-multiline">
                {topics.map(topic => (
                  <div className="column is-3" key={topic.slug}>
                    <div className="block">
                      <div className="inner-block position-relative">
                        <div className="media-left">
                          <figure className="image is-64x64">
                            <TopicImage slug={topic.slug} />
                          </figure>
                        </div>
                        <h2 className="mt-2 title is-4">{topic.title}</h2>

                        <div className="buttons has-addons mb-2">
                          {topic.totalPosts > 0 && (
                            <Link
                              className="button is-outlined"
                              to={`/topics/${topic.slug}/`}
                            >
                              <FaFileAlt />
                              <span>&nbsp;{topic.totalPosts}</span>
                            </Link>
                          )}
                          {topic.totalVideos > 0 && (
                            <Link
                              className="button is-primary is-outlined"
                              to={`/topics/${topic.slug}/`}
                            >
                              <FaVideo /> <span>&nbsp;{topic.totalVideos}</span>
                            </Link>
                          )}

                          {topic.totalStories > 0 && (
                            <Link
                              className="button is-link is-outlined"
                              to={`/topics/${topic.slug}/`}
                            >
                              <FaBookOpen />
                              <span>&nbsp;{topic.totalStories}</span>
                            </Link>
                          )}
                          {topic.totalServices > 0 && (
                            <Link
                              className="button is-success is-outlined"
                              to={`/topics/${topic.slug}/`}
                            >
                              <FaGlobe />
                              <span>&nbsp;{topic.totalServices}</span>
                            </Link>
                          )}
                        </div>
                        <p className="position-absolute guide">
                          <Link
                            className="is-bold"
                            to={`/topics/${topic.slug}/`}
                          >
                            View details{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="#007bff"
                              style={{ verticalAlign: "middle" }}
                            >
                              <path fill="none" d="M0 0h24v24H0V0z"></path>
                              <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z"></path>
                            </svg>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
    articleTagsGroup: allMdx {
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
    allTopicsJson {
      edges {
        node {
          slug
          image
          title
        }
      }
    }
  }
`;
