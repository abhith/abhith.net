import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import { Link } from "gatsby";
import { FaStar } from "react-icons/fa";
const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <Link to="/" className="title">
                <strong>Abhith</strong>
              </Link>
            </div>
            <div className="column">
              <p className="subtitle is-5">Links</p>
              <ul className="list-clean">
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/tags">Tags</Link>
                </li>
              </ul>
            </div>
            <div className="column">
              <p className="subtitle is-5">Find Me On</p>
              <ul className="list-clean has-icons">
                <li>
                  <OutboundLink
                    className="link"
                    target="_blank"
                    href="https://github.com/Abhith/abhith.net"
                  >
                    <FaStar className="fab" /> Abhith.net on Github
                  </OutboundLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="columns">
            <div className="column content has-text-centered">
              <span>Copyright © 2019</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};
export default Footer;
