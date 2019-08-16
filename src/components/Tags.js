import PropTypes from "prop-types";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import React from "react";

const Tags = ({ tags }) => (
  <small>
    <div className="tags">
      {tags && tags.length
        ? tags.map(tag => (
            <React.Fragment key={tag}>
              <span className="tag">
                <Link
                  className="text-capitalize text-muted smoothscroll"
                  to={`/tags/${kebabCase(tag)}/`}
                >
                  {tag}
                </Link>
              </span>
            </React.Fragment>
          ))
        : null}
    </div>
  </small>
);

Tags.propTypes = {
  tags: PropTypes.array
};

export default Tags;
