import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const TitleBar = ({ title, linkTo, linkText }) => {
  if (!linkText) {
    linkText = "View All";
  }
  return (
    <h4 className="spanborder title is-4 has-text-primary">
      <span className="has-text-weight-bold">{title}</span>
      {linkTo && (
        <Link
          className="button k-button k-secondary raised is-bold has-gradient slanted is-pulled-right"
          to={linkTo}
        >
          {linkText}
        </Link>
      )}
    </h4>
  );
};

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  linkText: PropTypes.string,
};

export default TitleBar;
