import { css } from "@emotion/react";
import styled from "@emotion/styled";

const BreadcrumbActiveCSS = (p) => css`
  a {
    color: ${p.theme.colors.strongText} !important;
  }
`;
const BreadcrumbActive = styled.div`
  ${BreadcrumbActiveCSS}
`;

export default BreadcrumbActive;
