import { css } from "@emotion/react";

import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ArticleCss = (p) => css`
  strong {
    color: ${p.theme.colors.strongText} !important;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${p.theme.colors.strongText} !important;
  }
`;

const Article = styled.article`
  ${ArticleCss}
`;

export const HTMLContent = ({ content, className }) => (
  <Article
    className={className}
    dangerouslySetInnerHTML={{ __html: content }}
  ></Article>
);

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
);

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
