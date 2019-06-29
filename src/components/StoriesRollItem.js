import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import TagImage from "./TagImage";
import Tags from "./Tags";

const StoriesRollItem = ({ post }) => {
  return (
    <div className="mb-3 columns">
      <div className="column is-one-third">
        <OutboundLink href={post.url} target="_blank">
          <TagImage tagSlug={post.tags[0]} />
        </OutboundLink>
      </div>
      <div className="column is-two-third">
        <h2 className="mb-2 title is-6 has-text-weight-bold">
          <OutboundLink target="_blank" href={post.url}>
            {post.title}
          </OutboundLink>
        </h2>
        <Tags tags={post.tags} />
        <small className="text-muted">{post.date}</small>
      </div>
    </div>
  );
};
StoriesRollItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default StoriesRollItem;
