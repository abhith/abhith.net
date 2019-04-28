import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const Footer = class extends React.Component {
  render() {
    return (
      <footer class="bg-white border-top p-3 text-muted small">
        <div class="container">
          <div class="row align-items-center justify-content-between">
            <div>
              <span class="navbar-brand mr-2 mb-0">
                <strong>Abhith</strong>
              </span>
              <span>
                Copyright ©{" "}
                <script>document.write(new Date().getFullYear())</script>.
              </span>

              <OutboundLink
                className="text-dark ml-1"
                target="_blank"
                href="https://github.com/wowthemesnet/mundana-theme-jekyll"
              >
                <i class="fab fa-github" /> Fork on Github
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
