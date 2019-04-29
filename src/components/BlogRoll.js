import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import Img from "gatsby-image";

const BlogRoll = props => {
  const { posts } = props;

  return (
    <>
      {posts &&
        posts.map(({ node: post }) => (
          <div
            class="mb-5 d-flex justify-content-between main-loop-card"
            key={post.id}
          >
            <div class="pr-3">
              <h2 class="mb-1 h4 font-weight-bold">
                <Link className="text-dark" to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
              </h2>
              <p class="excerpt">{post.excerpt}</p>
              <small class="d-block text-muted">
                In{" "}
                <span class="catlist">
                  {post.frontmatter.tags && post.frontmatter.tags.length
                    ? post.frontmatter.tags.map(tag => (
                        <>
                          <Link
                            className="text-capitalize text-muted smoothscroll"
                            to={`/tags/${kebabCase(tag)}/`}
                          >
                            {tag}
                          </Link>
                          <span class="sep">, </span>
                        </>
                      ))
                    : null}
                </span>
              </small>
              <small class="text-muted">
                {post.frontmatter.date} &middot;{" "}
                {post.frontmatter.fields.readingTime.text}
              </small>
            </div>
            <div class="col-md-3 pr-0 text-right">
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
