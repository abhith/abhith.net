import PropTypes from "prop-types";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import React from "react";

const TopicsBar = ({ topics }) => (
  <small>
    <div className="tags">
      {topics && topics.length
        ? topics.map(topic => (
            <React.Fragment key={topic}>
              <span className="tag">
                <Link
                  className="text-capitalize text-muted smoothscroll"
                  to={`/topics/${kebabCase(topic)}/`}
                >
                  {topic}
                </Link>
              </span>
            </React.Fragment>
          ))
        : null}
    </div>
  </small>
);

TopicsBar.propTypes = {
  topics: PropTypes.array
};

export default TopicsBar;
