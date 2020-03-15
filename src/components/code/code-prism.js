import Highlight from "prism-react-renderer";
import prismTheme from "prism-react-renderer/themes/nightOwl";
import mediaqueries from "@styles/media";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { copyToClipboard } from "@utils";
import { FaCopy, FaClipboard } from "react-icons/fa";

import Prism from "prismjs";
require("prismjs/components/prism-csharp");
require("prismjs/components/prism-graphql");
require("prismjs/components/prism-sql");
require("prismjs/components/prism-yaml");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-json");
require("prismjs/components/prism-dart");

const Pre = styled.pre`
  position: relative;
`;

const LineNo = styled.span`
  display: inline-block;
  width: 32px;
  user-select: none;
  opacity: 0.3;
  color: #dcd9e6;

  ${mediaqueries.tablet`
  opacity: 0;
  width: 0;
`};
`;

const RE = /{([\d,-]+)}/;

function calculateLinesToHighlight(meta) {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(",")
      .map(v => v.split("-").map(y => parseInt(y, 10)));

    return index => {
      const lineNumber = index + 1;
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      );
      return inRange;
    };
  } else {
    return () => false;
  }
}

function CodePrism({ codeString, language, metastring }) {
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  return (
    <Highlight
      Prism={Prism}
      theme={prismTheme}
      code={codeString}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div style={{ overflow: "auto" }}>
          <Pre className={className} style={style}>
            <Copy toCopy={codeString} />

            {tokens.map((line, index) => {
              const { className } = getLineProps({
                line,
                key: index,
                className: shouldHighlightLine(index) ? "highlight-line" : ""
              });
              return (
                <div key={index} className={className}>
                  <LineNo>{index + 1}</LineNo>

                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </Pre>
        </div>
      )}
    </Highlight>
  );
}

export default CodePrism;

function Copy({ toCopy }) {
  const [hasCopied, setHasCopied] = useState(false);

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
    border: 2px solid ${p => p.theme.colors.accent};
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.01);
  }

  ${mediaqueries.tablet`
    display: none;
  `}
`;
