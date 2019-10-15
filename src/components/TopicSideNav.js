import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";
import { kebabCase, sortBy } from "lodash";
import PropTypes from "prop-types";

const TopicSideNav = ({ slug }) => (
  <StaticQuery
    query={graphql`
      query {
        allBlogPostTopics: allMdx {
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
    `}
    render={data => {
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

      return (
        <div className="menu">
          <p className="menu-label"> Filter by topic </p>
          <ul className="menu-list">
            <li>
              <Link to={`/topics`}>All</Link>
            </li>
            {topics.map(topic => (
              <li key={topic.slug}>
                <Link
                  className={topic.slug === slug ? "is-active" : ""}
                  to={`/topics/${kebabCase(topic.slug)}/`}
                >
                  {topic.slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }}
  />
);

TopicSideNav.propTypes = {
  slug: PropTypes.string
};

export default TopicSideNav;
