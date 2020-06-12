import React, { SFC } from "react";
import styled from "@emotion/styled";

const kinds = {
  info: "#5352ED",
  positive: "#2ED573",
  negative: "#FF4757",
  warning: "#fffbeb",
};

const kindsColor = {
  info: "#5352ED",
  positive: "#2ED573",
  negative: "#FF4757",
  warning: "#947600",
};

const AlertStyled = styled("div")`
  padding: 15px 20px;
  background: white;
  border-radius: 3px;
  color: white;
  background: ${({ kind = "info" }) => kinds[kind]};
  color: ${({ kind = "info" }) => kindsColor[kind]};
`;

function Alert({ kind, ...props }) {
  return <AlertStyled {...props} kind={kind} />;
}

export default Alert;
