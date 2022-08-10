import React from "react";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { useColorMode } from "theme-ui";

const GitHubTypo = ({ githubURL }) => {
  const [colorMode] = useColorMode();
  const className = `${
    colorMode === "light" ? "has-text-grey" : "has-text-grey-dark"
  }`;
  return (
    <div id="typo" className="ar-typo">
      <p className={className}>
        This page is <strong className={className}>open source</strong>. Noticed
        a typo? Or something unclear?
        <br />
        <OutboundLink href={githubURL} target="_blank" className={className}>
          Improve this page on GitHub
        </OutboundLink>
      </p>
    </div>
  );
};
export default GitHubTypo;
