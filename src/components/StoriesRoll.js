import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import TagImage from "./TagImage";

import Tags from "./Tags";
import { truncate } from "lodash";

const StoriesRoll = props => {
  const { posts } = props;

  return (
    <>
      {posts &&
        posts.map(({ node: post }) => (
          <div className="mb-5 columns" key={post.id}>
            <div className="column is-three-quarters pr-3">
              <OutboundLink
                className="text-dark"
                target="_blank"
                href={post.url}
              >
                <h2 className="title is-4">{post.title}</h2>
              </OutboundLink>

              <p className="subtitle is-6">
                {truncate(post.description, { length: 186 })}
              </p>
              <Tags tags={post.tags} />
              <small className="text-muted">{post.date}</small>
            </div>
            <div className="column is-one-quarter">
              <OutboundLink href={post.url} target="_blank">
                <TagImage tagSlug={post.tags[0]} />
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
