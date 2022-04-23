import React from "react";
import PropTypes from "prop-types";
import TopicImage from "./topic-image";
import { Link } from "gatsby";
import BoxStyled from "./box-styled";

const SnippetsRollItem = ({ snippet, showDescription }) => {
  return (
    <BoxStyled>
      <Link to={snippet.slug} className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <TopicImage slug={snippet.topics[0]} />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <strong className="post-title">{snippet.title}</strong>
            <p className="ar-subtitle">{showDescription && snippet.excerpt}</p>
            <small>Last Updated &middot; {snippet.date}</small>
          </div>
        </div>
      </Link>
    </BoxStyled>
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
