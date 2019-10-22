import Highlight from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import mediaqueries from "@styles/media";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { copyToClipboard } from "@utils";
import { FaCopy, FaClipboard } from "react-icons/fa";

import Prism from "prismjs";
require("prismjs/components/prism-csharp");
require("prismjs/components/prism-graphql");

const Pre = styled.pre`
  position: relative;
`;

const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`;

function CodePrism({ codeString, language, metastring, ...props }) {
  return (
    <Highlight
      Prism={Prism}
      theme={theme}
      code={codeString}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div style={{ overflow: "auto" }}>
          <Pre className={className} style={style}>
            <Copy toCopy={codeString} />
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Pre>
        </div>
      )}
    </Highlight>
  );
}

export default CodePrism;

function Copy({ toCopy }: { toCopy: string }) {
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  function copyToClipboardOnClick() {
    if (hasCopied) {
      return;
    }

    copyToClipboard(toCopy);
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }

  return (
    <CopyButton onClick={copyToClipboardOnClick} data-a11y="false">
      {hasCopied ? (
        <>
          Copied <FaClipboard></FaClipboard>
        </>
      ) : (
        <>
          Copy <FaCopy />
        </>
      )}
    </CopyButton>
  );
}

const CopyButton = styled.button`
  position: absolute;
  right: 22px;
  top: 24px;
  padding: 8px 12px 7px;
  border-radius: 5px;
  color: #6f7177;
  transition: background 0.3s ease;

  -webkit-appearance: none;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  outline: none;
  background: transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
  }

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: -2%;
    top: -2%;
    width: 104%;
    height: 104%;
    border: 2px solid #6166dc;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.01);
  }

  ${mediaqueries.tablet`
    display: none;
  `}
`;
