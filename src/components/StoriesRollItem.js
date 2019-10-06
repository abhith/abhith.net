import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import TopicImage from "./TopicImage";
import { domainFromURL } from "../utils/common";

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
            <span>
              <small>in</small> {post.tags.join()} | {domainFromURL(post.url)}
            </span>
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
