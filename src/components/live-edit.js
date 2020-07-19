import { css } from "@emotion/core";
import styled from "@emotion/styled";
import * as polished from "polished";
import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import prismTheme from "prism-react-renderer/themes/shadesOfPurple";

const foreground = "#f8f8f2";
const red = "#ff5555";
const lightGrey = "#42374a";
// tslint:disable-next-line: no-submodule-imports

// const StyledProvider = styled(LiveProvider)`
//   border-radius: ${polished.rem(3)};
//   box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
//   overflow: hidden;
//   margin-bottom: ${polished.rem(100)};
// `;

const LiveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const column = css`
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;

  @media (max-width: 600px) {
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
  }
`;

const StyledEditor = styled.div`
  background: ${lightGrey};
  font-family: "Source Code Pro", monospace;
  font-size: ${polished.rem(14)};
  height: ${polished.rem(250)};
  max-height: ${polished.rem(250)};
  overflow: auto;
  border-radius: 5px;
  ${column};
  * > textarea:focus {
    outline: none;
  }
`;

const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  text-align: center;
  border-radius: 5px;
  ${column};
`;

const StyledError = styled(LiveError)`
  display: block;
  padding: ${polished.rem(8)};
  background: ${red};
  color: ${foreground};
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.9em;
  font-family: "Source Code Pro", monospace;
`;

const LiveEdit = ({ noInline, code }) => (
  <LiveProvider code={code} noInline={noInline} theme={prismTheme}>
    <LiveWrapper>
      <StyledEditor>
        <LiveEditor />
      </StyledEditor>
      <StyledPreview />
    </LiveWrapper>
    <StyledError />
  </LiveProvider>
);

export default LiveEdit;
