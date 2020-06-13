import React from "react";
import styled from "@emotion/styled";
import { FcHighPriority, FcIdea, FcInfo } from "react-icons/fc";
import { capitalize } from "lodash";

const kindsBackgroundColor = {
  info: "#5352ED",
  positive: "#2ED573",
  negative: "#FF4757",
  warning: "#fffbeb",
  important: "#fffbeb",
};

const kindsColor = {
  info: "#5352ED",
  positive: "#2ED573",
  negative: "#FF4757",
  warning: "#947600",
  important: "#947600",
};

const kindsIcon = {
  important: FcHighPriority,
  idea: FcIdea,
  info: FcInfo,
};

const AlertStyled = styled("div")`
  padding: 15px 20px;
  background: white;
  border-radius: 3px;
  color: white;
  background: ${({ kind = "info" }) => kindsBackgroundColor[kind]};
  color: ${({ kind = "info" }) => kindsColor[kind]};
`;

function Alert({ kind, children }) {
  let KindIcon = kindsIcon[kind];
  return (
    <AlertStyled kind={kind}>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <span className="icon">
              <KindIcon />
            </span>
            <span className="title is-5">{capitalize(kind)}</span>
          </div>
        </div>
      </div>
      <p className="mb-0">{children}</p>
    </AlertStyled>
  );
}

export default Alert;
