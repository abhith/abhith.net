import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import Tags from "./Tags";

const StoriesRoll = props => {
  const { posts } = props;

  if (!posts || !posts.length) {
    return <span>Nothing Found</span>;
  }

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
                <OutboundLink
                  className="text-dark"
                  target="_blank"
                  href={post.url}
                >
                  {post.title}
                </OutboundLink>
              </h2>
              <p className="excerpt">{post.description}</p>
              <small className="d-block text-muted">
                In <Tags tags={post.tags} />
              </small>
              <small className="text-muted">{post.date}</small>
            </div>
            <div className="col-md-3 pr-0 text-right">
              <OutboundLink href={post.url} target="_blank">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: post.image,
                    className: "w-100",
                    alt: post.title
                  }}
                />
              </OutboundLink>
            </div>
          </div>
        ))}
    </>
  );
};
StoriesRoll.propTypes = {
  posts: PropTypes.array.isRequired
};

export default StoriesRoll;
