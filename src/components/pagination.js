import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

export default class Pagination extends Component {
  static propTypes = {
    previousPagePath: PropTypes.string,
    nextPagePath: PropTypes.string,
    kind: PropTypes.string,
  };

  render() {
    return (
      <nav
        className="pagination ar-pagination ar-pagination-links"
        role="navigation"
        aria-label="pagination"
      >
        <Link
          className="pagination-previous button ar-fat-button is-primary is-light ar-pagination-prev"
          to={this.props.previousPagePath}
          disabled={!this.props.previousPagePath}
          title="Previous"
        >
          <i>←</i>
          <span>
            <em>{this.props.kind}:</em>
            <strong>Previous</strong>
          </span>
        </Link>

        <Link
          className="pagination-next button ar-fat-button is-primary is-light ar-pagination-next"
          to={this.props.nextPagePath}
          disabled={!this.props.nextPagePath}
          title="Next"
        >
          <span>
            <em>{this.props.kind}:</em>
            <strong>Next</strong>
          </span>
          <i>→</i>
        </Link>
      </nav>
    );
  }
}
