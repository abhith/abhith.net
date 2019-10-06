import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import TopicImage from "./TopicImage";
import {domainFromURL} from "../utils/common"

const StoriesRollItemCompact = ({ post, showDescription }) => {
  return (
    <div className="story-post">
      <OutboundLink target="_blank" href={post.url}>
        <div className="columns">
          <div className="column is-one-fifth">
            <div className="featured-image">
              <TopicImage slug={post.tags[0]} />
            </div>
          </div>
          <div className="column is-four-fifths">
            <div className="post-title">{post.title}</div>
            <small>in</small> {post.tags.join()} | <span>{domainFromURL(post.url)}</span>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="content">
              {showDescription && <p>{post.description}</p>}
            </div>
          </div>
        </div>
      </OutboundLink>
    </div>
  );
};
StoriesRollItemCompact.propTypes = {
  post: PropTypes.object.isRequired,
  showDescription: PropTypes.bool
};

StoriesRollItemCompact.defaultProps = {
  showDescription: true
};

export default StoriesRollItemCompact;
