import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import TopicImage from "./topic-image";
import { domainFromURL } from "../utils/common";
import TopicsBar from "./topics-bar";

const StoriesRollItem = ({ post, showDescription }) => {
  return (
    <div className="box ar-story">
      <OutboundLink className="media" target="_blank" href={post.url}>
        <div className="media-left">
          <figure className="image is-64x64">
            <TopicImage slug={post.tags[0]} />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <div>
              <strong className="post-title">{post.title}</strong>
              <br />
              <small>
                {domainFromURL(post.url)} &middot; {post.date}
              </small>
              <br />
            </div>
            <p>{showDescription && post.description}</p>
          </div>
        </div>
      </OutboundLink>
      <TopicsBar topics={post.tags} />
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
