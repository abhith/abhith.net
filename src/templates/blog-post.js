import React from "react";
import PropTypes from "prop-types";
import { kebabCase, partition } from "lodash";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import SEO from "../components/seo/SEO";
import Img from "gatsby-image";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import { DiscussionEmbed } from "disqus-react";
import BlogRollItem from "../components/BlogRollItem";
import VideosRoll from "../components/VideosRoll";
import ServicesRoll from "../components/ServicesRoll";
import StoriesRollItem from "../components/StoriesRollItem";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  image,
  tags,
  title,
  date,
  author,
  readingTime,
  commentId,
  lastModifiedTime,
  lastModifiedTimeString,
  dateModifiedSeoFormat,
  datePublishedSeoFormat,
  slug
}) => {
  const PostContent = contentComponent || Content;
  const disqusConfig = {
    shortname: `abhith`,
    config: { identifier: commentId, title }
  };

  return (
    <div>
      <SEO
        title={title}
        description={description}
        image={image.childImageSharp.fluid.src}
        isBlogPost={true}
        slug={slug}
        dateModified={dateModifiedSeoFormat}
        datePublished={datePublishedSeoFormat}
      />
      <div className="container">
        <div className="jumbotron jumbotron-fluid mb-3 pl-0 pt-0 pb-0 bg-white position-relative">
          <div className="h-100 tofront">
            <div
              className={
                image == null
                  ? `row justify-content-center`
                  : `row justify-content-between`
              }
            >
              <div
                className={
                  image == null
                    ? ` col-md-8 pr-0 pr-md-4 pt-4 pb-4 align-self-center`
                    : `col-md-6 pr-0 pr-md-4 pt-4 pb-4 align-self-center`
                }
              >
                <p className="text-uppercase font-weight-bold">
                  {tags && tags.length ? (
                    <span className="taglist">
                      {tags.map(tag => (
                        <React.Fragment key={tag}>
                          <Link
                            className="sscroll text-danger"
                            to={`/tags/${kebabCase(tag)}/`}
                          >
                            {tag}
                          </Link>{" "}
                          <span className="sep">, </span>
                        </React.Fragment>
                      ))}
                    </span>
                  ) : null}
                </p>
                <h1 className="display-4 mb-4 article-headline">{title}</h1>

                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    src={author.image}
                    alt={author.name}
                    width="70"
                  />
                  <small className="ml-3">
                    {" "}
                    {author.name}{" "}
                    <span>
                      <OutboundLink
                        target="_blank"
                        className="btn btn-outline-success btn-sm btn-round ml-1"
                        href={author.url}
                      >
                        Follow
                      </OutboundLink>
                    </span>
                    <span className="text-muted d-block mt-1">
                      {date} &middot; {readingTime} &middot; Last Updated:{" "}
                      <time dateTime={lastModifiedTime}>
                        {lastModifiedTimeString}
                      </time>
                    </span>
                  </small>
                </div>
              </div>

              {image && (
                <div className="col-md-6 pr-0 align-self-center">
                  <Img
                    className="rounded"
                    fluid={image.childImageSharp.fluid}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container-lg pt-4 pb-4">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-8">
            <PostContent content={content} className={`article-post`} />
            {tags && tags.length ? (
              <div className="mb-4">
                <span className="taglist">
                  {tags.map(tag => (
                    <Link
                      className="sscroll btn btn-light btn-sm font-weight-bold"
                      to={`/tags/${kebabCase(tag)}/`}
                      key={tag}
                    >
                      {tag}
                    </Link>
                  ))}
                </span>
              </div>
            ) : null}

            <div className="row mt-5">
              <div className="col-md-2 align-self-center">
                <img
                  className="rounded-circle"
                  src={author.image}
                  alt={author.name}
                  width="90"
                />
              </div>
              <div className="col-md-10">
                <h5 className="font-weight-bold">
                  Written by {author.name}{" "}
                  <span>
                    <OutboundLink
                      target="_blank"
                      className="btn btn-outline-success btn-sm btn-round ml-2"
                      href={author.url}
                    >
                      Follow
                    </OutboundLink>
                  </span>
                </h5>
                {author.minibio}
              </div>
            </div>
            <div id="comments" className="mt-5">
              <DiscussionEmbed {...disqusConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  image: PropTypes.object,
  date: PropTypes.string,
  author: PropTypes.object,
  readingTime: PropTypes.string,
  commentId: PropTypes.string,
  lastModifiedTime: PropTypes.string,
  lastModifiedTimeString: PropTypes.string,
  dateModifiedSeoFormat: PropTypes.string,
  datePublishedSeoFormat: PropTypes.string
};

const BlogPost = ({ data }) => {
  // console.log(`page data is`, data);

  const { markdownRemark: post } = data;

  const relatedPosts = data.relatedPosts.edges;
  const relatedVideos = data.recommendedVideos.edges;
  const relatedStories = data.recommendedStories.edges;
  const relatedServices = data.recommendedServices.edges;

  let relatedPostsFirstHalf = [];
  let relatedPostsSecondHalf = [];
  let relatedStoriesFirstHalf = [];
  let relatedStoriesSecondHalf = [];

  [relatedPostsFirstHalf, relatedPostsSecondHalf] = partition(
    relatedPosts,
    i => {
      return relatedPosts.indexOf(i) % 2 === 0;
    }
  );

  [relatedStoriesFirstHalf, relatedStoriesSecondHalf] = partition(
    relatedStories,
    i => {
      return relatedStories.indexOf(i) % 2 === 0;
    }
  );

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        slug={post.fields.slug}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        date={post.frontmatter.dateString}
        author={data.site.siteMetadata.author}
        readingTime={post.fields.readingTime.text}
        commentId={
          post.frontmatter.commentId === null
            ? post.fields.slug
            : post.frontmatter.commentId
        }
        lastModifiedTime={
          post.frontmatter.lastModificationTime === null
            ? post.frontmatter.date
            : post.frontmatter.lastModificationTime
        }
        lastModifiedTimeString={
          post.frontmatter.lastModificationTime === null
            ? post.frontmatter.dateString
            : post.frontmatter.lastModificationTimeString
        }
        dateModifiedSeoFormat={post.frontmatter.dateModifiedSeoFormat}
        datePublishedSeoFormat={post.frontmatter.datePublishedSeoFormat}
      />
      <div className="container">
        {relatedPosts.length > 0 && (
          <div className="row mt-5">
            <div className="col-md-12">
              <h4 className="font-weight-bold spanborder">
                <span>Related Posts</span>
              </h4>
            </div>
            <div className="col-md-6">
              {relatedPostsFirstHalf.map(({ node }) => {
                return <BlogRollItem post={node} key={node.id} />;
              })}
            </div>
            <div className="col-md-6">
              {relatedPostsSecondHalf.map(({ node }) => {
                return <BlogRollItem post={node} key={node.id} />;
              })}
            </div>
          </div>
        )}
        {relatedVideos.length > 0 && (
          <div className="row mt-5">
            <div className="col-md-12">
              <h4 className="font-weight-bold spanborder">
                <span>Related Videos</span>
              </h4>
              <VideosRoll videos={relatedVideos} />
            </div>
          </div>
        )}

        {relatedStories.length > 0 && (
          <div className="row mt-5">
            <div className="col-md-12">
              <h4 className="font-weight-bold spanborder">
                <span>Related Stories</span>
              </h4>
            </div>
            <div className="col-md-6">
              {relatedStoriesFirstHalf.map(({ node }) => {
                return <StoriesRollItem post={node} key={node.id} />;
              })}
            </div>
            <div className="col-md-6">
              {relatedStoriesSecondHalf.map(({ node }) => {
                return <StoriesRollItem post={node} key={node.id} />;
              })}
            </div>
          </div>
        )}

        {relatedServices.length > 0 && (
          <div className="row mt-5">
            <div className="col-md-12">
              <h4 className="font-weight-bold spanborder">
                <span>Related Services</span>
              </h4>
              <ServicesRoll services={relatedServices} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!, $tags: [String!]) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
        readingTime {
          text
        }
      }
      frontmatter {
        date
        dateString: date(formatString: "MMMM DD, YYYY")
        datePublishedSeoFormat: date(formatString: "YYYY-MM-DD")
        title
        description
        tags
        lastModificationTime
        lastModificationTimeString: lastModificationTime(
          formatString: "MMMM DD, YYYY"
        )
        dateModifiedSeoFormat: lastModificationTime(formatString: "YYYY-MM-DD")
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        commentId
      }
    }
    site {
      siteMetadata {
        author {
          name
          minibio
          url
          image
        }
      }
    }
    recommendedStories: allStoriesJson(
      limit: 6
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: $tags } }
    ) {
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
      limit: 3
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: $tags } }
    ) {
      edges {
        node {
          id
          url
          type
        }
      }
    }
    recommendedServices: allServicesJson(
      limit: 2
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: $tags } }
    ) {
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
    relatedPosts: allMarkdownRemark(
      limit: 6
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: $tags } }, id: { ne: $id } }
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
