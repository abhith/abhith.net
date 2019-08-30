import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import TopicImage from "./TopicImage";

const StoriesRollItem = ({ post, showDescription }) => {
  return (
    <div className="blog-post">
      <OutboundLink target="_blank" href={post.url}>
        <div className="featured-image">
          <TopicImage slug={post.tags[0]} />
        </div>
        <div className="content">
          <div className="post-title">{post.title}</div>
          <span className="blog-date">{post.date}</span>
          {showDescription && <p>{post.description}</p>}
          <div className="post-meta">
            <div className="author-block">
              <div className="author-name">
                <span>www.site.com</span>
                <span>
                  <small>in</small> {post.tags.join()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </OutboundLink>
    </div>
  );
};
StoriesRollItem.propTypes = {
  post: PropTypes.object.isRequired,
  showDescription: PropTypes.bool
};

StoriesRollItem.defaultProps = {
  showDescription: true
};

export default StoriesRollItem;
