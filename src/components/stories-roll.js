import React from "react";
import PropTypes from "prop-types";
import StoriesRollItem from "./stories-roll-item";

const StoriesRoll = ({ posts, showDescription }) => {
  const renderItem = post => {
    return (
      <StoriesRollItem
        post={post}
        key={post.id}
        showDescription={showDescription}
      />
    );
  };
  return <>{posts && posts.map(({ node: post }) => renderItem(post))}</>;
};

StoriesRoll.default = {
  showDescription: true
};

StoriesRoll.propTypes = {
  posts: PropTypes.array.isRequired,
  showDescription: PropTypes.bool
};

export default StoriesRoll;
