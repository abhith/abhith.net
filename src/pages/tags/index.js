import React from "react";
import { kebabCase, sortBy } from "lodash";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";
import SEO from "../../components/seo/SEO";
import { FaFileAlt, FaVideo, FaBookOpen, FaGlobe } from "react-icons/fa";

const TagsPage = ({
  data: {
    allMarkdownRemark: { group: postsGroup },
    allStoriesJson: { group: storiesGroup },
    allVideosJson: { group: videosGroup },
    allServicesJson: { group: servicesGroup }
  }
}) => {
  let tags = [];

  postsGroup.forEach(node => {
    tags.push({
      slug: node.fieldValue,
      totalPosts: node.totalCount,
      totalVideos: 0,
      totalStories: 0,
      totalServices: 0
    });
  });

  storiesGroup.forEach(node => {
    let tag = tags.find(tag => tag.slug === node.fieldValue);
    if (tag) {
      tag.totalStories = node.totalCount;
    } else {
      tags.push({
        slug: node.fieldValue,
        totalPosts: 0,
        totalVideos: 0,
        totalStories: node.totalCount,
        totalServices: 0
      });
    }
  });

  videosGroup.forEach(node => {
    let tag = tags.find(tag => tag.slug === node.fieldValue);
    if (tag) {
      tag.totalVideos = node.totalCount;
    } else {
      tags.push({
        slug: node.fieldValue,
        totalPosts: 0,
        totalVideos: node.totalCount,
        totalStories: 0,
        totalServices: 0
      });
    }
  });

  servicesGroup.forEach(node => {
    let tag = tags.find(tag => tag.slug === node.fieldValue);
    if (tag) {
      tag.totalServices = node.totalCount;
    } else {
      tags.push({
        slug: node.fieldValue,
        totalPosts: 0,
        totalVideos: 0,
        totalStories: 0,
        totalServices: node.totalCount
      });
    }
  });

  tags = sortBy(tags, tag => tag.slug);

  return (
    <Layout>
      <section className="section">
        <SEO
          title="Tags"
          description={`Summary of all the ${tags.length} tags used in abhith.net`}
          slug="/tags"
        />
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds">
              <h1 className="has-text-weight-bold title is-6 text-uppercase mb-4">
                <span>Tags</span>
              </h1>
              {tags.map(tag => (
                <div className="box" key={tag.slug}>
                  <Link to={`/tags/${kebabCase(tag.slug)}/`}>
                    <p className="title mb-2">{tag.slug}</p>
                  </Link>
                  <div className="buttons">
                    {tag.totalPosts > 0 && (
                      <Link
                        className="button is-light"
                        to={`/tags/${kebabCase(tag.slug)}/`}
                      >
                        <FaFileAlt /> {tag.totalPosts} POSTS
                      </Link>
                    )}
                    {tag.totalVideos > 0 && (
                      <Link
                        className="button is-info"
                        to={`/tags/${kebabCase(tag.slug)}/`}
                      >
                        <FaVideo /> {tag.totalVideos} VIDEOS
                      </Link>
                    )}

                    {tag.totalStories > 0 && (
                      <Link
                        className="button is-link"
                        to={`/tags/${kebabCase(tag.slug)}/`}
                      >
                        <FaBookOpen /> {tag.totalStories} STORIES
                      </Link>
                    )}
                    {tag.totalServices > 0 && (
                      <Link
                        className="button is-white"
                        to={`/tags/${kebabCase(tag.slug)}/`}
                      >
                        <FaGlobe /> {tag.totalServices} SERVICES
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
export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
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
