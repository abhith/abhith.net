import React from "react";

function Badge({ fill, textColorIsWhite, children }) {
  if (textColorIsWhite) {
    return (
      <span className="tag" style={{ backgroundColor: fill, color: "#fff" }}>
        {children}
      </span>
    );
  }
  return (
    <span className="tag" style={{ backgroundColor: fill }}>
      {children}
    </span>
  );
}

export default Badge;
