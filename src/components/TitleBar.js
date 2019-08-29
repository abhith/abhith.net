import PropTypes from "prop-types";
import { Link } from "gatsby";
import React from "react";

const TitleBar = ({ title }) => (
  <h4 className="spanborder title is-4">
    <span className="has-text-weight-bold">{title}</span>
  </h4>
);

TitleBar.propTypes = {};

export default TitleBar;
