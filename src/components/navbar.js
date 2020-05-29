import React from "react";
import { Link } from "gatsby";
import { FaCoffee, FaTwitter, FaShieldAlt } from "react-icons/fa";
import {
  FcContacts,
  FcHome,
  FcPortraitMode,
  FcReading,
  FcLike,
  FcTimeline,
} from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
      hamburgerMenuClass: "",
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
              hamburgerMenuClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
              hamburgerMenuClass: "",
            });
      }
    );
  };

  render() {
    return (
      <nav className="navbar is-spaced" id="ar-navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <figure className="image is-vertical-center">
                <Img
                  fluid={this.props.logo.childImageSharp.fluid}
                  className="nav-logo"
                />
              </figure>
            </Link>
            <OutboundLink
              className="navbar-item is-hidden-desktop"
              href="https://github.com/Abhith/abhith.net"
              target="_blank"
            >
              <span className="icon">
                <GoMarkGithub size={24} />
              </span>
            </OutboundLink>
            <OutboundLink
              className="navbar-item is-hidden-desktop"
              href="https://twitter.com/AbhithRajan"
              target="_blank"
            >
              <span className="icon" style={{ color: "#55acee" }}>
                <FaTwitter size={24} />
              </span>
            </OutboundLink>
            <div
              role="button"
              className={`navbar-burger burger ${this.state.hamburgerMenuClass}`}
              onClick={() => this.toggleHamburger()}
              onKeyDown={() => this.toggleHamburger()}
              aria-label="menu"
              aria-expanded="false"
              data-target="ar-navMenu"
              tabIndex={0}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>

          <div
            id="ar-navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                <span class="icon has-text-primary">
                  <FcHome />
                </span>
                <span>Home</span>
              </Link>
              <Link to="/about/" className="navbar-item">
                <span class="icon has-text-primary">
                  <FcPortraitMode />
                </span>
                <span>About</span>
              </Link>
              <Link to="/blog/" className="navbar-item">
                <span className="icon has-text-primary">
                  <FcReading></FcReading>
                </span>
                <span>Blog</span>
              </Link>
              <Link to="/recommended/" className="navbar-item">
                <span className="icon has-text-primary">
                  <FcLike />
                </span>
                <span> Recommended</span>
              </Link>
              <Link to="/topics/" className="navbar-item">
                <span className="icon has-text-primary">
                  <FcTimeline />
                </span>
                <span>Topics</span>
              </Link>
              <Link to="/contact/" className="navbar-item">
                <span className="icon has-text-primary">
                  <FcContacts />
                </span>
                <span>Contact</span>
              </Link>
              <OutboundLink
                className="is-bold button k-button k-secondary raised has-gradient"
                href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
                target="_blank"
              >
                <FaShieldAlt color="black" size={24} />
                <span role="img" aria-label="heart" className="ml-1">
                  Break The Chain | STAY SAFE
                </span>
              </OutboundLink>
            </div>

            <div className="navbar-end">
              <OutboundLink
                className="navbar-item is-hidden-desktop-only"
                href="https://github.com/Abhith/abhith.net"
                target="_blank"
              >
                <span className="icon">
                  <GoMarkGithub size={24} />
                </span>
              </OutboundLink>
              <OutboundLink
                className="navbar-item is-hidden-desktop-only"
                href="https://twitter.com/AbhithRajan"
                target="_blank"
              >
                <span className="icon" style={{ color: "#55acee" }}>
                  <FaTwitter size={24} />
                </span>
              </OutboundLink>

              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <Link
                      to="/donate/"
                      className="button k-button k-primary raised has-gradient slanted"
                    >
                      <span>
                        BUY ME A <FaCoffee />
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default () => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "abhith-logo-lg.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={(data) => <Navbar logo={data.logo} />}
  />
);
