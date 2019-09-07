import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

export default class Pagination extends Component {
  static propTypes = {
    previousPagePath: PropTypes.string,
    nextPagePath: PropTypes.string
  };

  render() {
    return (
      <nav
        className="pagination is-rounded is-medium"
        role="navigation"
        aria-label="pagination"
      >
        {this.props.previousPagePath ? (
          <Link
            className="pagination-previous"
            to={this.props.previousPagePath}
          >
            Previous
          </Link>
        ) : null}
        {this.props.nextPagePath ? (
          <Link className="pagination-next" to={this.props.nextPagePath}>
            Next
          </Link>
        ) : null}
      </nav>
    );
  }
}
