/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useColorMode } from "theme-ui";

const TitleCss = (p) => css`
  color: ${p.theme.colors.strongText} !important;
`;

const Title = styled.h3`
  ${TitleCss}
`;

const AskFeedback = () => {
  const [colorMode] = useColorMode();

  const [isHelpful, setIsHelpful] = React.useState();
  let note;
  if (isHelpful === "yes") {
    note = (
      <div className="notification is-success is-light has-text-centered">
        <h5>
          👊 that ⭐️ button on the official{" "}
          <a
            href="https://github.com/abhith/abhith.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repo
          </a>
        </h5>
        <p>
          It'd be awesome if you could leave a comment below! <br />
          &#123; thank you ♥ &#125; is enough
        </p>
      </div>
    );
  } else if (isHelpful === "no") {
    note = (
      <div className="notification is-warning is-light has-text-centered">
        <h4>Sorry about that!</h4>
        <p> TODO(abhith): Please let me know how can I improve it?</p>
      </div>
    );
  } else {
    note = (
      <div
        className={`notification is-info has-text-centered ${
          colorMode === "light" ? "is-light" : "has-background-dark"
        }`}
      >
        <a
          href="/donate/"
          className="button k-button k-primary raised has-gradient rounded"
        >
          Buy me a coffee{" "}
          <span role="img" aria-label="coffee">
            ☕
          </span>
        </a>
      </div>
    );
  }
  return (
    <div className="content">
      <Title className="has-text-centered">Is this page helpful?</Title>
      <div className="buttons is-centered">
        <button
          className="button is-success is-light"
          onClick={() => setIsHelpful("yes")}
        >
          👍 Yes
        </button>
        <button
          className="button is-warning is-light"
          onClick={() => setIsHelpful("no")}
        >
          👎 No
        </button>
      </div>
      {note}
    </div>
  );
};
export default AskFeedback;
