import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React from "react";

const BoxCss = (p) => css`
  background-color: ${p.theme.colors.background};
  a {
    color: ${p.theme.colors.strongText};
  }
  .title {
    color: ${p.theme.colors.strongText} !important;
  }
`;

const StyledDiv = styled("div")`
  ${BoxCss}
  p {
    font-size: 0.9rem;
  }
  .post-title {
    font-size: 1.2rem;
    text-transform: capitalize;
    font-weight: 500;
  }
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 15px 45px -5px rgba(7, 10, 25, 0.25);
    transform: translate(0, -2px);
  }
`;

const BoxStyled = ({ children }) => {
  return <StyledDiv className="box">{children}</StyledDiv>;
};

export default BoxStyled;
