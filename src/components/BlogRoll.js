import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import TopicsBar from "./TopicsBar";

const BlogRoll = props => {
  const { posts } = props;

  return (
    <>
      {posts &&
        posts.map(({ node: post }) => (
          <div className="mb-5 columns" key={post.id}>
            <div className="column is-three-quarters">
              <div className="content">
                <Link className="text-dark" to={post.fields.slug}>
                  <h2 className="mb-1 title is-4 has-text-weight-bold">
                    {post.frontmatter.title}
                  </h2>
                </Link>
                <p className="subtitle">{post.frontmatter.description}</p>
                <TopicsBar topics={post.frontmatter.tags} />
                <small className="text-muted">
                  {post.frontmatter.date} &middot;{" "}
                  {post.fields.readingTime.text}
                </small>
              </div>
            </div>
            <div className="column">
              <Link to={`${post.fields.slug}`}>
                <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
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
