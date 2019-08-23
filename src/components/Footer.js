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
    <footer class="abhith-footer">
      <div class="container">
        <div class="footer-logo">
          <Link to="/">
            {/* <img
              class="rotating"
              src="assets/images/logo/krypton-gradient.svg"
              alt=""
            /> */}
            <div class="brand-name">Abhith Rajan</div>
            <div class="brand-subtitle">{site.siteMetadata.description}</div>
          </Link>
        </div>

        <div class="columns footer-columns is-vcentered">
          <div class="column is-4">
            <ul class="footer-links">
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
          <div class="column is-4">
            {/* <div class="subscribe-block">
              <form>
                <div class="control">
                  <input
                    class="krypton-subscribe-input"
                    type="email"
                    name="email"
                    placeholder=""
                  />
                  <button class="subscribe-button">
                    <span>Subscribe</span>
                  </button>
                </div>
              </form>
            </div> */}
          </div>
          <div class="column is-4">
            <ul class="footer-links">
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
        <p class="k-copyright">© 2019 | Abhith. All Rights Reserved</p>
        <br />
        <p class="coded-by">
          Designed and Coded by{" "}
          <OutboundLink href="https://twitter.com/AbhithRajan" target="_blank">
            Abhith Rajan
          </OutboundLink>
        </p>
      </div>

      {/* <img class="solar-system" src="assets/images/bg/solar.svg" alt="" /> */}
    </footer>
  );
}
export default Footer;
