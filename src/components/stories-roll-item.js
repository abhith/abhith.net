import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import TopicImage from "./topic-image";
import { domainFromURL, transformURL } from "../utils/common";
import TopicsBar from "./topics-bar";
import BoxStyled from "./box-styled";

const StoriesRollItem = ({ post, showDescription }) => {
  return (
    <BoxStyled>
      <OutboundLink
        className="media"
        target="_blank"
        href={transformURL(post.url)}
      >
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
            {showDescription && (
              <p className="ar-subtitle"> {post.description}</p>
            )}
          </div>
        </div>
      </OutboundLink>
      <TopicsBar topics={post.tags} />
    </BoxStyled>
  );
};
StoriesRollItem.propTypes = {
  post: PropTypes.object.isRequired,
  showDescription: PropTypes.bool,
};

StoriesRollItem.defaultProps = {
  showDescription: true,
};

export default StoriesRollItem;
