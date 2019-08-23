import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import { Link, useStaticQuery, graphql } from "gatsby";
import { FaStar } from "react-icons/fa";

function Footer() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            description
          }
        }
      }
    `
  );

  return (
    <footer className="abhith-footer">
      <div className="container">
        <div className="footer-logo">
          <Link to="/">
            {/* <img
              className="rotating"
              src="assets/images/logo/krypton-gradient.svg"
              alt=""
            /> */}
            <div className="brand-name">Abhith Rajan</div>
            <div className="brand-subtitle">{site.siteMetadata.description}</div>
          </Link>
        </div>

        <div className="columns footer-columns is-vcentered">
          <div className="column is-4">
            <ul className="footer-links">
              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/blog">Blog</Link>
              </li>

              <li>
                <Link to="/recommended">Recommended</Link>
              </li>
            </ul>
          </div>
          <div className="column is-4">
            {/* <div className="subscribe-block">
              <form>
                <div className="control">
                  <input
                    className="krypton-subscribe-input"
                    type="email"
                    name="email"
                    placeholder=""
                  />
                  <button className="subscribe-button">
                    <span>Subscribe</span>
                  </button>
                </div>
              </form>
            </div> */}
          </div>
          <div className="column is-4">
            <ul className="footer-links">
              <li>
                <Link to="/topics">Topics</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <li>
                  <OutboundLink
                    target="_blank"
                    href="https://github.com/Abhith/abhith.net"
                  >
                    <FaStar className="fab" /> Abhith.net on Github
                  </OutboundLink>
                </li>
              </li>
            </ul>
          </div>
        </div>
        <p className="k-copyright">© 2019 | Abhith. All Rights Reserved</p>
        <br />
        <p className="coded-by">
          Designed and Coded by{" "}
          <OutboundLink href="https://twitter.com/AbhithRajan" target="_blank">
            Abhith Rajan
          </OutboundLink>
        </p>
      </div>

      {/* <img className="solar-system" src="assets/images/bg/solar.svg" alt="" /> */}
    </footer>
  );
}
export default Footer;
