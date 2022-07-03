import PropTypes from "prop-types";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import React from "react";

const TopicsBar = ({ topics }) => (
  <small>
    <div className="tags">
      {topics && topics.length
        ? topics.map((topic) => (
            <React.Fragment key={topic}>
              <Link
                className="text-capitalize smoothscroll p-0 m-0"
                to={`/topics/${kebabCase(topic)}/`}
              >
                <span className="tag">{topic}</span>
              </Link>
            </React.Fragment>
          ))
        : null}
    </div>
  </small>
);

TopicsBar.propTypes = {
  topics: PropTypes.array,
};

export default TopicsBar;
