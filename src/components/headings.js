import styled from "@emotion/styled";
import { css } from "@emotion/react";

import mediaqueries from "@styles/media";

/**
 * Example:
 * <Heading.h1>Lorem Ipsum</Heading.h1>
 */

const commonStyles = (p) => css`
  font-weight: bold !important;
  font-family: ${p.theme.fonts.sansSerif} !important;
  color: ${p.theme.colors.primary} !important;
`;

const h1 = styled.h1`
  word-break: keep-all;
  font-size: 52px;
  line-height: 1.15;
  ${commonStyles};

  ${mediaqueries.desktop`
    font-size: 38px;
    line-height: 1.2;
  `};

  ${mediaqueries.phablet`
    font-size: 32px;
    line-height: 1.3;
  `};
`;

const h2 = styled.h2`
  word-break: keep-all !important;
  font-size: 32px !important;
  line-height: 1.333 !important;
  ${commonStyles};

  ${mediaqueries.desktop`
    font-size: 21px !important;
  `};

  ${mediaqueries.tablet`
    font-size: 24px !important;
    line-height: 1.45 !important;
  `};

  ${mediaqueries.phablet`
    font-size: 22px !important;
  `};
`;

const h3 = styled.h3`
  word-break: keep-all !important;
  font-size: 24px !important;
  line-height: 1.45 !important;
  ${commonStyles};

  ${mediaqueries.tablet`
    font-size: 22px !important;
  `};

  ${mediaqueries.phablet`
    font-size: 20px !important;
  `};
`;

const h4 = styled.h4`
  word-break: keep-all !important;
  font-size: 18px !important;
  line-height: 1.45 !important;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 16px !important;
  `};
`;

const h5 = styled.h5`
  word-break: keep-all !important;
  font-size: 18px !important;
  line-height: 1.45 !important;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 16px !important;
  `};
`;

const h6 = styled.h6`
  word-break: keep-all !important;
  font-size: 16px !important;
  line-height: 1.45 !important;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 14px !important;
  `};
`;

const Heading = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
};

export default Heading;
