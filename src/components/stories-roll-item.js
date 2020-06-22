import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import TopicImage from "./topic-image";
import { domainFromURL } from "../utils/common";
import TopicsBar from "./topics-bar";
import styled from "@emotion/styled";
const StoryStyled = styled("div")`
  a {
    color: #333;
  }
  p {
    color: #999;
    font-size: 0.9rem;
  }
  .post-title {
    font-size: 1.2rem;
    text-transform: capitalize;
    font-weight: 500;
  }
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 15px 45px -5px rgba(7, 10, 25, 0.25);
    transform: translate(0, -2px);
  }
`;
const StoriesRollItem = ({ post, showDescription }) => {
  return (
    <StoryStyled className="box">
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
    </StoryStyled>
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
