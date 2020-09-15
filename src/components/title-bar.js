import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const TitleBar = ({ title, linkTo }) => (
  <h4 className="spanborder title is-4">
    <span className="has-text-weight-bold">{title}</span>
    {linkTo && (
      <Link
        className="button k-button k-secondary raised is-bold has-gradient slanted is-pulled-right"
        to={linkTo}
      >
        View All
      </Link>
    )}
  </h4>
);

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
};

export default TitleBar;
