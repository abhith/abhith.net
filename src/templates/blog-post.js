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
import { FaCoffee } from "react-icons/fa";

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  PocketShareButton,
  PocketIcon
} from "react-share";

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
  slug,
  siteMetadata
}) => {
  const PostContent = contentComponent || Content;
  const disqusConfig = {
    shortname: `abhith`,
    config: { identifier: commentId, title }
  };

  const pageUrl = `${siteMetadata.siteUrl}${slug}`;

  return (
    <div className="container">
      <SEO
        title={title}
        description={description}
        image={image.childImageSharp.fluid.src}
        isBlogPost={true}
        slug={slug}
        dateModified={dateModifiedSeoFormat}
        datePublished={datePublishedSeoFormat}
      />
      <div className="columns">
        <div className="column">
          <p className="text-uppercase ">
            {tags && tags.length ? (
              <span className="taglist">
                {tags.map(tag => (
                  <React.Fragment key={tag}>
                    <Link
                      className="has-text-danger has-text-weight-bold is-uppercase"
                      to={`/topics/${kebabCase(tag)}/`}
                    >
                      {tag}
                    </Link>{" "}
                    <span className="sep">, </span>
                  </React.Fragment>
                ))}
              </span>
            ) : null}
          </p>
          <h1 className="title is-1 mb-4 article-headline">{title}</h1>
          <div className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img
                  className="is-rounded"
                  src={author.image}
                  alt={author.name}
                />
              </p>
            </figure>
            <div className="media-content">
              <small>
                {author.name}{" "}
                <span>
                  <OutboundLink
                    target="_blank"
                    className="button is-success is-outlined is-small is-rounded ml-1"
                    href={author.url}
                  >
                    Follow
                  </OutboundLink>
                </span>
                <br />
                <span className="text-muted mt-1">
                  {date} &middot; {readingTime} &middot; Last Updated:{" "}
                  <time dateTime={lastModifiedTime}>
                    {lastModifiedTimeString}
                  </time>
                </span>
              </small>
            </div>
          </div>
        </div>
        <div className="column">
          <Img fluid={image.childImageSharp.fluid} />
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-2 pr-4 mb-4">
          <div className="sticky has-text-centered">
            <div className="text-muted">Share this</div>

            <div className="buttons is-centered">
              <FacebookShareButton
                url={pageUrl}
                quote={title}
                className="button is-medium is-white"
              >
                <FacebookIcon size={44} round />
              </FacebookShareButton>

              <TwitterShareButton
                url={pageUrl}
                className="button is-medium is-white"
                title={title}
                via={siteMetadata.social.twitter.split("@").join("")}
                hashtags={tags}
              >
                <TwitterIcon size={44} round></TwitterIcon>
              </TwitterShareButton>
              <LinkedinShareButton
                url={pageUrl}
                className="button is-medium is-white"
                title={title}
              >
                <LinkedinIcon size={44} round></LinkedinIcon>
              </LinkedinShareButton>
              <RedditShareButton
                url={pageUrl}
                className="button is-medium is-white"
                title={title}
              >
                <RedditIcon size={44} round></RedditIcon>
              </RedditShareButton>
              <PocketShareButton
                url={pageUrl}
                className="button is-medium is-white"
                title={title}
              >
                <PocketIcon size={44} round></PocketIcon>
              </PocketShareButton>
              <WhatsappShareButton
                url={pageUrl}
                className="button is-medium is-white"
                title={title}
              >
                <WhatsappIcon size={44} round></WhatsappIcon>
              </WhatsappShareButton>
            </div>
          </div>
        </div>
        <div className="column is-8">
          <PostContent content={content} className={`content`} />
          {tags && tags.length ? (
            <div className="mb-4">
              <span className="taglist">
                {tags.map(tag => (
                  <Link
                    className="sscroll btn btn-light btn-sm "
                    to={`/tags/${kebabCase(tag)}/`}
                    key={tag}
                  >
                    {tag}
                  </Link>
                ))}
              </span>
            </div>
          ) : null}

          <div className="container mt-5">
            <div className="media">
              <figure className="media-left">
                <p className="image is-96x96">
                  <img
                    className="is-rounded"
                    src={author.image}
                    alt={author.name}
                  />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong className="title is-4">
                      Written by {author.name}
                    </strong>{" "}
                    <span>
                      <OutboundLink
                        target="_blank"
                        className="button is-success is-outlined is-small is-rounded ml-1"
                        href={author.url}
                      >
                        Follow
                      </OutboundLink>
                    </span>
                    <span>
                      <OutboundLink
                        className="button is-info is-outlined is-small is-rounded ml-1"
                        href="https://ko-fi.com/abhith"
                        target="_blank"
                      >
                        Buy me a coffee <FaCoffee className="text-danger" />
                      </OutboundLink>
                    </span>
                    <br />
                    {author.minibio}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id="comments" className="mt-5">
            <DiscussionEmbed {...disqusConfig} />
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
  datePublishedSeoFormat: PropTypes.string,
  siteMetadata: PropTypes.object
};

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertbarClass: ""
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 280) {
      this.setState({
        alertbarClass: "show"
      });
    } else {
      this.setState({
        alertbarClass: ""
      });
    }
  };

  render() {
    const data = this.props.data;
    const { markdownRemark: post } = data;

    const relatedPosts = data.relatedPosts.edges;
    const relatedVideos = data.recommendedVideos.edges;
    const relatedStories = data.recommendedStories.edges;
    const relatedServices = data.recommendedServices.edges;
    let featuredServices = [];
    featuredServices.push(data.featuredServices.edges[0].node);
    featuredServices.push(data.featuredServices.edges[1].node);

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
        <div className="section">
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
            siteMetadata={data.site.siteMetadata}
          />

          {relatedPosts.length > 0 && (
            <>
              <h4 className="spanborder">
                <span className="has-text-weight-bold">Related Posts</span>
              </h4>
              <div className="columns">
                <div className="column">
                  {relatedPostsFirstHalf.map(({ node }) => {
                    return <BlogRollItem post={node} key={node.id} />;
                  })}
                </div>
                <div className="column">
                  {relatedPostsSecondHalf.map(({ node }) => {
                    return <BlogRollItem post={node} key={node.id} />;
                  })}
                </div>
              </div>
            </>
          )}
          {relatedVideos.length > 0 && (
            <>
              <h4 className=" spanborder">
                <span className="has-text-weight-bold">Related Videos</span>
              </h4>
              <div className="columns">
                <div className="column is-full">
                  <VideosRoll videos={relatedVideos} />
                </div>
              </div>
            </>
          )}

          {relatedStories.length > 0 && (
            <>
              <h4 className="spanborder">
                <span className="has-text-weight-bold">Related Stories</span>
              </h4>
              <div className="columns">
                <div className="column is-half">
                  {relatedStoriesFirstHalf.map(({ node }) => {
                    return <StoriesRollItem post={node} key={node.id} />;
                  })}
                </div>
                <div className="column is-half">
                  {relatedStoriesSecondHalf.map(({ node }) => {
                    return <StoriesRollItem post={node} key={node.id} />;
                  })}
                </div>
              </div>
            </>
          )}

          {relatedServices.length > 0 && (
            <>
              <div className="columns">
                <div className="column is-full">
                  <h4 className=" spanborder">
                    <span className="has-text-weight-bold">
                      Related Services
                    </span>
                  </h4>
                  <ServicesRoll services={relatedServices} />
                </div>
              </div>
            </>
          )}
        </div>
        {/* <div className={`alertbar ${this.state.alertbarClass}`}>
          <div className="container">
            <div className="columns prevnextlinks small">
              <div className="column is-half rightborder pl-0">
                <OutboundLink
                  className="text-dark"
                  href={featuredServices[0].url}
                  target="_blank"
                >
                  <img
                    height="30px"
                    className="mr-1"
                    src={featuredServices[0].image}
                    alt={featuredServices[0].title}
                  />
                  {featuredServices[0].title}
                </OutboundLink>
              </div>

              <div className="column is-half text-right pr-0">
                <OutboundLink
                  className="text-dark"
                  href={featuredServices[1].url}
                  target="_blank"
                >
                  {featuredServices[1].title}
                  <img
                    height="30px"
                    className="ml-1"
                    src={featuredServices[1].image}
                    alt={featuredServices[1].title}
                  />
                </OutboundLink>
              </div>
            </div>
          </div>
        </div> */}
      </Layout>
    );
  }
}

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
        siteUrl
        social {
          twitter
        }
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
    featuredServices: allServicesJson(
      limit: 2
      sort: { fields: [date], order: DESC }
      filter: { isAffiliate: { eq: true } }
    ) {
      edges {
        node {
          title
          id
          tags
          url
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
