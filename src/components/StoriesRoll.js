import React from "react";
import PropTypes from "prop-types";
import StoriesRollItem from "./StoriesRollItem";
import StoriesRollItemCompact from "./StoriesRollItemCompact";

const StoriesRoll = ({ posts, mode, showDescription }) => {
  const renderItem = (mode, post) => {
    switch (mode) {
      case "compact":
        return (
          <StoriesRollItemCompact
            post={post}
            key={post.id}
            showDescription={showDescription}
          />
        );
      default:
        return (
          <StoriesRollItem
            post={post}
            key={post.id}
            showDescription={showDescription}
          />
        );
    }
  };

  return (
    <>
      {posts &&
        posts.map(
          ({ node: post }) => renderItem(mode, post)
        )}
    </>
  );
};

StoriesRoll.default = {
  mode: "Default",
  showDescription: true
};

StoriesRoll.propTypes = {
  posts: PropTypes.array.isRequired,
  mode: PropTypes.oneOf(["default", "compact"]),
  showDescription: PropTypes.bool
};

export default StoriesRoll;
