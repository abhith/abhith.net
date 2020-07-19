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
import NavbarItem from "@components/navbar-item";
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
            <NavbarItem to="/" title="Home">
              <FcHome />
            </NavbarItem>
            <NavbarItem to="/about/" title="About">
              <FcPortraitMode />
            </NavbarItem>
            <NavbarItem to="/blog/" title="Blog">
              <FcReading />
            </NavbarItem>
            <NavbarItem to="/recommended/" title="Recommended">
              <FcLike />
            </NavbarItem>
            <NavbarItem to="/topics/" title="Topics">
              <FcTimeline />
            </NavbarItem>
            <NavbarItem to="/contact/" title="Contact">
              <FcContacts />
            </NavbarItem>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <OutboundLink
                  className="is-bold button k-button k-secondary raised has-gradient"
                  href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
                  target="_blank"
                >
                  <FaShieldAlt color="black" size={24} />
                  <span className="ml-1">
                    Corona is UNBIASED | Break The Chain
                  </span>
                </OutboundLink>
              </div>
            </div>
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
                <Link
                  to="/donate/"
                  className="button k-button k-primary raised has-gradient slanted"
                >
                  <span>
                    BUY ME A <FaCoffee />
                  </span>
                </Link>
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
