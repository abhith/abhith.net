import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import GitHubButton from "react-github-btn";

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
    <footer class="ar-footer is-medium section">
      <div class="container">
        <div class="columns">
          <div class="column is-5 is-4-widescreen">
            <div class="summary">
              <Link to="/" className="brand">
                <div class="brand-icon">
                  <img
                    alt="Abhith Rajan"
                    role="presentation"
                    src="/img/site/brand/icon.png"
                  />
                </div>
                <div class="brand-content">
                  <div class="brand-title"> Abhith Rajan </div>
                  <div class="brand-subtitle">Full Stack Dev</div>
                </div>
              </Link>
              <hr class="spacer"></hr>
              <p> {site.siteMetadata.description}</p>
            </div>
          </div>
          <div class="column is-7 is-6-widescreen is-offset-2-widescreen">
            <div class="columns">
              <div class="column is-4">
                <div class="menu">
                  <p class="menu-label"> Website </p>
                  <ul class="menu-list">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                      <Link to="/topics">Topics</Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy">Privacy Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="column is-4">
                <div class="menu">
                  <p class="menu-label">Recommended</p>
                  <ul class="menu-list">
                    <li>
                      <Link to="/recommended/stories">Stories</Link>
                    </li>
                    <li>
                      <Link to="/recommended/videos">Videos</Link>
                    </li>
                    <li>
                      <Link to="/recommended/services">Services</Link>
                    </li>
                    <li>
                      <GitHubButton
                        href="https://github.com/Abhith/abhith.net"
                        data-size="large"
                        data-show-count="true"
                        aria-label="Star Abhith/abhith.net on GitHub"
                      >
                        Star
                      </GitHubButton>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="column is-4">
                <div class="menu">
                  <p class="menu-label">Connect with me</p>
                  <ul class="menu-list">
                    <li>
                      <a
                        className="twitter-follow-button"
                        href="https://twitter.com/abhithrajan"
                        data-size="large"
                        data-show-screen-name="false"
                      >
                        Follow @AbhithRajan
                      </a>
                    </li>
                    <li>
                      <GitHubButton
                        href="https://github.com/Abhith"
                        data-size="large"
                        data-show-count="true"
                        aria-label="Follow @Abhith on GitHub"
                      >
                        Follow @Abhith
                      </GitHubButton>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
