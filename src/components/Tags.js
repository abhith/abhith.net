import PropTypes from "prop-types";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import React from "react";

const Tags = ({ tags }) => (
  <span className="catlist">
    {tags && tags.length
      ? tags.map(tag => (
          <React.Fragment key={tag}>
            <Link
              className="text-capitalize text-muted smoothscroll"
              to={`/tags/${kebabCase(tag)}/`}
            >
              {tag}
            </Link>
            <span className="sep">, </span>
          </React.Fragment>
        ))
      : null}
  </span>
);

Tags.propTypes = {
  tags: PropTypes.array
};

export default Tags;
