import React from "react";
import { Link } from "gatsby";

function NavbarItem({ to, title, children }) {
  return (
    <Link to={to} className="navbar-item ar-navbar-item">
      <span className="icon">{children}</span>
      <span>{title}</span>
      <span className="cd-cursor"></span>
    </Link>
  );
}

export default NavbarItem;
