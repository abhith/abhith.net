import React from "react";
import { Link } from "gatsby";

const Button = ({ text, path, align }) => {
  let wrapperClassName;
  if (align) {
    if (align === "left") {
      wrapperClassName = `cta-wrapper`;
    }
  } else {
    wrapperClassName = `cta-wrapper has-text-centered`;
  }
  return (
    <div className={wrapperClassName}>
      <Link
        to={path}
        className="button k-button k-primary raised has-gradient is-bold"
      >
        <span className="text">{text}</span>
        <span className="front-gradient"></span>
      </Link>
    </div>
  );
};

export default Button;
