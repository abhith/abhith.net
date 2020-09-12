import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const GitHubTypo = ({ githubURL }) => {
  return (
    <div id="typo" className="ar-typo">
      <p className="has-text-grey">
        This page is <strong className="has-text-grey">open source</strong>.
        Noticed a typo? Or something unclear?
        <br />
        <OutboundLink
          href={githubURL}
          target="_blank"
          className="has-text-grey"
        >
          Improve this page on GitHub
        </OutboundLink>
      </p>
    </div>
  );
};
export default GitHubTypo;
