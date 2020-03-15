import React from "react";
import PropTypes from "prop-types";

const TitleBar = ({ title }) => (
  <h4 className="spanborder title is-4">
    <span className="has-text-weight-bold">{title}</span>
  </h4>
);

TitleBar.propTypes = {
  title: PropTypes.string.isRequired
};

export default TitleBar;
