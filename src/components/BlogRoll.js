import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import Tags from "./Tags";

const BlogRoll = props => {
  const { posts } = props;

  return (
    <>
      {posts &&
        posts.map(({ node: post }) => (
          <div
            className="mb-5 d-flex justify-content-between main-loop-card"
            key={post.id}
          >
            <div className="pr-3">
              <h2 className="mb-1 h4 font-weight-bold">
                <Link className="text-dark" to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
              </h2>
              <p className="excerpt">{post.frontmatter.description}</p>
              <small className="d-block text-muted">
                In <Tags tags={post.frontmatter.tags} />
              </small>
              <small className="text-muted">
                {post.frontmatter.date} &middot; {post.fields.readingTime.text}
              </small>
            </div>
            <div className="col-md-3 pr-0 text-right">
              <Link to={`${post.fields.slug}`}>
                <Img
                  className="w-100"
                  fluid={post.frontmatter.image.childImageSharp.fluid}
                />
              </Link>
            </div>
          </div>
        ))}
    </>
  );
};
BlogRoll.propTypes = {
  posts: PropTypes.array.isRequired
};

export default BlogRoll;
