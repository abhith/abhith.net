import styled from "@emotion/styled";
import mediaqueries from "@styles/media";
import React from "react";

const StyledTable = styled.table`
  position: relative;
  line-height: 1.65;
  color: #73737d;
  transition: background 0.25s var(--ease-in-out-quad),
    color 0.25s var(--ease-in-out-quad);
  background: #fafafa;
  margin: 45px auto 85px;
  width: 100%;
  max-width: 1004px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 5px;
  overflow: hidden;
  border-collapse: separate;

  ${mediaqueries.desktop`
    margin: 25px auto 65px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
  `};

  ${mediaqueries.phablet`
    margin: 15px auto 55px;
  `};
`;

function Table({ children }) {
  return (
    <div style={{ overflowX: "auto", padding: "0 20px" }}>
      <StyledTable>{children}</StyledTable>
    </div>
  );
}

export default Table;
