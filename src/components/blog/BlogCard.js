import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";

const BlogCard = ({ post, tag }) => {
  return (
    <div className="column card-post">
      <Link to={post.fields.slug}>
        <div className="featured-image card-image">
          <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
          {tag && (
            <div class="card-content is-overlay is-clipped">
              <span class="tag is-info">{tag}</span>
            </div>
          )}
        </div>
        <div className="content">
          <div className="post-title">{post.frontmatter.title}</div>
          <span className="blog-date">
            {post.frontmatter.date} &middot; {post.fields.readingTime.text}
          </span>
          <p>{post.frontmatter.description}</p>
          <div className="post-meta">
            <div className="author-block">
              <div className="image is-32x32">
                <img src="/img/abhith-avatar.jpg" alt="abhith rajan" />
              </div>
              <div className="author-name">
                <span>by Abhith Rajan</span>
                <span>
                  <small>in</small> {post.frontmatter.tags.join()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
BlogCard.propTypes = {
  post: PropTypes.object.isRequired,
  tag: PropTypes.string
};

export default BlogCard;
