import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";

const BlogRollItem = ({ post }) => {
  return (
    <div className="blog-post">
      <Link to={post.fields.slug}>
        <div className="featured-image">
          <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
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
BlogRollItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default BlogRollItem;
