import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import Tags from "./Tags";

const StoriesRollItem = ({ post }) => {
  return (
    <div className="mb-3 d-flex align-items-center">
      <div className="col-md-4">
        <OutboundLink href={post.url} target="_blank">
          <PreviewCompatibleImage
            imageInfo={{
              image: `/img/tags/${post.tags[0]}.png`,
              className: "w-100",
              alt: post.title
            }}
          />
        </OutboundLink>
      </div>
      <div>
        <h2 className="mb-2 h6 font-weight-bold">
          <OutboundLink className="text-dark" target="_blank" href={post.url}>
            {post.title}
          </OutboundLink>
        </h2>
        <small className="d-block text-muted">
          In <Tags tags={post.tags} />
        </small>
        <small className="text-muted">{post.date}</small>
      </div>
    </div>
  );
};
StoriesRollItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default StoriesRollItem;
