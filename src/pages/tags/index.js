import React from "react";
import { kebabCase, sortBy } from "lodash";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";
import SEO from "../../components/seo/SEO";
import { FaFileAlt, FaVideo, FaBookOpen } from "react-icons/fa";

const TagsPage = ({
  data: {
    allMarkdownRemark: { group: postsGroup },
    allStoriesJson: { group: storiesGroup },
    allVideosJson: { group: videosGroup }
  }
}) => {
  let tags = [];

  postsGroup.forEach(node => {
    tags.push({
      slug: node.fieldValue,
      totalPosts: node.totalCount,
      totalVideos: 0,
      totalStories: 0
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
        totalStories: node.totalCount
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
        totalStories: 0
      });
    }
  });

  tags = sortBy(tags, tag => tag.slug);

  return (
    <Layout>
      <section className="section">
        <SEO
          title="Tags"
          description="Summary of all the tags on abhith.net"
          slug="/tags"
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="font-weight-bold title h6 text-uppercase mb-4">
                <span>Tags</span>
              </h1>
              {tags.map(tag => (
                <div key={tag.slug} className="mb-3">
                  <span className="taglist">
                    <Link
                      className="sscroll btn btn-dark btn-lg"
                      to={`/tags/${kebabCase(tag.slug)}/`}
                    >
                      {tag.slug}
                    </Link>
                    <Link
                      className="sscroll btn btn-light btn-sm"
                      to={`/tags/${kebabCase(tag.slug)}/`}
                    >
                      <FaFileAlt /> {tag.totalPosts} POSTS
                    </Link>
                    <Link
                      className="sscroll btn btn-lightblue btn-sm"
                      to={`/tags/${kebabCase(tag.slug)}/`}
                    >
                      <FaVideo /> {tag.totalVideos} VIDEOS
                    </Link>
                    <Link
                      className="sscroll btn btn-gray btn-sm"
                      to={`/tags/${kebabCase(tag.slug)}/`}
                    >
                      <FaBookOpen /> {tag.totalStories} STORIES
                    </Link>
                  </span>
                </div>
              ))}
            </div>
            <div className="col-md-4">
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
  }
`;
