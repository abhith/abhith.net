import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import Tags from "./Tags";

const BlogRollItem = ({ post: node }) => {
  return (
    <div className="mb-3 d-flex align-items-center" key={node.fields.slug}>
      <div className="col-md-4">
        <Link to={`${node.fields.slug}`}>
          <Img
            className="w-100"
            fluid={node.frontmatter.image.childImageSharp.fluid}
          />
        </Link>
      </div>
      <div>
        <h2 className="mb-2 h6 font-weight-bold">
          <Link className="text-dark" to={`${node.fields.slug}`}>
            {node.frontmatter.title}
          </Link>
        </h2>
        <small className="d-block text-muted">
          In <Tags tags={node.frontmatter.tags} />
        </small>
        <small className="text-muted">
          {node.frontmatter.date} &middot; {node.fields.readingTime.text}
        </small>
      </div>
    </div>
  );
};
BlogRollItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default BlogRollItem;
