import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import SEO from "../components/seo/SEO";
import Img from "gatsby-image";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import { DiscussionEmbed } from "disqus-react";

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
  const { markdownRemark: post } = data;

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
  query BlogPostByID($id: String!) {
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
  }
`;
