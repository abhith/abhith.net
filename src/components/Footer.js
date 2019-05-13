import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import { Link } from "gatsby";
import { FaStar } from "react-icons/fa";
const Footer = class extends React.Component {
  render() {
    return (
      <footer className="bg-white border-top p-3 text-muted small">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div>
              <span className="navbar-brand mr-2 mb-0">
                <strong>Abhith</strong>
              </span>
              <span>Copyright © 2019.</span>

              <Link to="/privacy-policy" className="text-dark ml-1">
                Privacy Policy
              </Link>
              <span> | </span>
              <OutboundLink
                className="text-dark ml-1"
                target="_blank"
                href="https://github.com/Abhith/abhith.net"
              >
                <FaStar className="fab" /> on Github
              </OutboundLink>
            </div>
            <div>
              Made with{" "}
              <OutboundLink
                target="_blank"
                className="text-dark font-weight-bold"
                href="https://www.wowthemes.net/mundana-jekyll-theme/"
              >
                {" "}
                Mundana Jekyll Theme{" "}
              </OutboundLink>{" "}
              by{" "}
              <OutboundLink
                className="text-dark"
                target="_blank"
                href="https://www.wowthemes.net"
              >
                WowThemes
              </OutboundLink>
              .
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
