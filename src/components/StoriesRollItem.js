import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import TagImage from "./TagImage";
import TopicsBar from "./TopicsBar";

const StoriesRollItem = ({ post }) => {
  return (
    <div className="columns">
      <div className="column is-one-third">
        <OutboundLink href={post.url} target="_blank">
          <TagImage tagSlug={post.tags[0]} />
        </OutboundLink>
      </div>
      <div className="column is-two-third">
        <h2 className="title is-6 has-text-weight-bold">
          <OutboundLink
            className="has-text-dark"
            target="_blank"
            href={post.url}
          >
            {post.title}
          </OutboundLink>
        </h2>
        <TopicsBar topics={post.tags} />
        <small className="text-muted">{post.date}</small>
      </div>
    </div>
  );
};
StoriesRollItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default StoriesRollItem;
