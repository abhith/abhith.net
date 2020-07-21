import Blockquote from "@components/blockquote";
import { CodePre, CodePrism } from "@components/code";
import { Table, TableCell, TableHeadCell, TableHead } from "@components/tables";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { MDXProvider } from "@mdx-js/react";
import mediaqueries from "@styles/media";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";

const components = {
  blockquote: Blockquote,
  code: CodePrism,
  pre: CodePre,
  table: Table,
  thead: TableHead,
  th: TableHeadCell,
  td: TableCell,
};

function MDX({ content, children, ...props }) {
  return (
    <MDXProvider components={components}>
      <MDXBody>
        <article className="content post-body e-content">
          <MDXRenderer {...props}>{content}</MDXRenderer>
        </article>
      </MDXBody>
      <div className="mt-3">{children}</div>
    </MDXProvider>
  );
}

export default MDX;

const PrismCSS = (p) => css`
  .prism-code {
    width: 100%;
    margin: 0 auto;
    padding: 32px;
    font-size: 13px;
    margin: 15px auto 50px;
    border-radius: 5px;
    font-family: ${p.theme.fonts.monospace};
    background: ${p.theme.colors.prism.background};

    .number-line {
      display: inline-block;
      width: 32px;
      user-select: none;
      opacity: 0.3;
      color: #dcd9e6;

      ${mediaqueries.tablet`
        opacity: 0;
        width: 0;
      `};
    }

    .token-line.highlight-line {
      margin: 0 -32px;
      padding: 0 32px;
      background: ${p.theme.colors.prism.highlight};
      border-left: 3px solid ${p.theme.colors.prism.highlightBorder};

      ${mediaqueries.tablet`
        margin: 0 -20px;
        padding: 0 20px;
      `};
    }

    .operator + .maybe-class-name {
      color: #ffcf74 !important;
    }

    .plain ~ .operator {
      color: #5fa8aa !important;
    }

    ${mediaqueries.desktop`
      left: -26px;
    `};

    ${mediaqueries.tablet`
      max-width: 526px;
      padding: 20px 20px;
      left: 0;
    `};

    ${mediaqueries.phablet`
      border-radius: 0;
      margin: 0 auto 25px;
      padding: 25px 20px;
      overflow: initial;
      width: unset;
      max-width: unset;
      float: left;
      min-width: 100%;
      overflow: initial;
      position: relative;
    `};
  }
`;

/**
 * MDXBody
 * Here we're applying "global" selectors to make sure we maintain an article
 * body type feel. We're also applying all the Prism selecotors and styles within
 * the MDXBody.
 */
const MDXBody = styled.div`
  ${PrismCSS}
`;
