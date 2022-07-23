import React from "react";

const GitHubStar = () => {
  return (
    <div className="has-text-centered mt-3">
      <hr />
      <div className="text-muted mb-1">
        <span role="img" aria-label="star">
          ⭐
        </span>{" "}
        On GitHub
      </div>
      <div className="is-centered">
        <iframe
          src="https://ghbtns.com/github-btn.html?user=Abhith&repo=abhith.net&type=star&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          width="120"
          height="30"
          title="Star abhith/abhith.net on GitHub"
        ></iframe>
      </div>
    </div>
  );
};
export default GitHubStar;
