import React from "react";
import PropTypes from "prop-types";
import TopicImage from "./topic-image";
import styled from "@emotion/styled";
import { Link } from "gatsby";

const StoryStyled = styled("div")`
  a {
    color: #333;
  }
  p {
    color: #999;
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
const SnippetsRollItem = ({ snippet, showDescription }) => {
  return (
    <StoryStyled className="box">
      <Link to={snippet.slug} className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <TopicImage slug={snippet.topics[0]} />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <strong className="post-title">{snippet.title}</strong>
            <p>{showDescription && snippet.excerpt}</p>
            <small>Last Updated &middot; {snippet.date}</small>
          </div>
        </div>
      </Link>
    </StoryStyled>
  );
};
SnippetsRollItem.propTypes = {
  snippet: PropTypes.object.isRequired,
  showDescription: PropTypes.bool,
};

SnippetsRollItem.defaultProps = {
  showDescription: true,
};

export default SnippetsRollItem;
