import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import Tags from "./Tags";

const BlogRollItem = ({ post: node }) => {
  return (
    <div className="columns">
      <div className="column is-one-third">
        <figure className="image">
          <Link to={`${node.fields.slug}`}>
            <Img fluid={node.frontmatter.image.childImageSharp.fluid} />
          </Link>
        </figure>
      </div>
      <div className="column">
        <div className="content">
          <Link to={`${node.fields.slug}`}>
            <p className="title is-6">{node.frontmatter.title}</p>
          </Link>
          <small className="text-muted">
            {node.frontmatter.date} &middot; {node.fields.readingTime.text}
          </small>
          <Tags tags={node.frontmatter.tags} />
        </div>
      </div>
    </div>
  );
};
BlogRollItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default BlogRollItem;
