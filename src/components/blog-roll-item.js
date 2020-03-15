import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Image from "@components/image";

const BlogRollItem = ({ post }) => {
  return (
    <div className="blog-post">
      <Link to={post.slug}>
        <div className="featured-image">
          <Image src={post.hero.full} alt={post.title} />
        </div>
        <div className="content">
          <div className="post-title">{post.title}</div>
          <span className="blog-date">
            {post.date} &middot; {post.timeToRead}
          </span>
          <p>{post.excerpt}</p>
          <div className="post-meta">
            <div className="author-block">
              <div className="image is-32x32">
                <img src="/img/abhith.jpg" alt="abhith rajan" />
              </div>
              <div className="author-name">
                <span>by Abhith Rajan</span>
                <span>
                  <small>in</small> {post.tags.join()}
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
