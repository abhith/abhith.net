import React from "react";
import GitHubButton from "react-github-btn";

const GitHubStar = () => {
  return (
    <div className="has-text-centered mt-3">
      <div className="text-muted mb-1">
        <span role="img" aria-label="star">
          ⭐
        </span>{" "}
        On GitHub
      </div>
      <div className="buttons is-centered">
        <GitHubButton
          href="https://github.com/Abhith/abhith.net"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star Abhith/abhith.net on GitHub"
        >
          Star
        </GitHubButton>
      </div>
    </div>
  );
};
export default GitHubStar;
