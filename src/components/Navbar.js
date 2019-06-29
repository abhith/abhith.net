import React from "react";
import { Link } from "gatsby";
import { FaCoffee } from "react-icons/fa";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
      hamburgerMenuClass: ""
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
              hamburgerMenuClass: "is-active"
            })
          : this.setState({
              navBarActiveClass: "",
              hamburgerMenuClass: ""
            });
      }
    );
  };

  render() {
    return (
      <nav className="navbar has-shadow is-spaced is-dark">
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

            {/* <a
            className="navbar-item is-hidden-desktop"
            href="https://github.com/jgthms/bulma"
            target="_blank"
          >
            <span className="icon" style={{ color: "#333" }}>
              <i className="fa fa-github"></i>
            </span>
          </a>

          <a
            className="navbar-item is-hidden-desktop"
            href="https://twitter.com/jgthms"
            target="_blank"
          >
            <span className="icon" style={{ color: "#55acee" }}>
              <i className="fa fa-twitter"></i>
            </span>
          </a> */}

            <div
              className={`navbar-burger burger ${this.state.hamburgerMenuClass}`}
              onClick={() => this.toggleHamburger()}
              data-target="navMenubd-example"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div
            id="navMenubd-example"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start">
              {/* <div className="navbar-item has-dropdown is-hoverable">
              <a
                className="navbar-link  is-active"
                href="/documentation/overview/start/"
              >
                Docs
              </a>
              <div className="navbar-dropdown ">
                <a
                  className="navbar-item "
                  href="/documentation/overview/start/"
                >
                  Overview
                </a>
                <a
                  className="navbar-item "
                  href="http://bulma.io/documentation/modifiers/syntax/"
                >
                  Modifiers
                </a>
                <a
                  className="navbar-item "
                  href="http://bulma.io/documentation/columns/basics/"
                >
                  Columns
                </a>
                <a
                  className="navbar-item "
                  href="http://bulma.io/documentation/layout/container/"
                >
                  Layout
                </a>
                <a
                  className="navbar-item "
                  href="http://bulma.io/documentation/form/general/"
                >
                  Form
                </a>
                <a
                  className="navbar-item "
                  href="http://bulma.io/documentation/elements/box/"
                >
                  Elements
                </a>

                <a
                  className="navbar-item is-active"
                  href="http://bulma.io/documentation/components/breadcrumb/"
                >
                  Components
                </a>

                <hr className="navbar-divider" />
                <div className="navbar-item">
                  <div>
                    <p className="is-size-6-desktop">
                      <strong className="has-text-info">0.5.1</strong>
                    </p>

                    <small>
                      <a className="bd-view-all-versions" href="/versions">
                        View all versions
                      </a>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable is-mega">
              <div className="navbar-link">Blog</div>
              <div
                id="blogDropdown"
                className="navbar-dropdown "
                data-style={{ width: 18 + "rem" }}
              >
                <div className="container is-fluid">
                  <div className="columns">
                    <div className="column">
                      <h1 className="title is-6 is-mega-menu-title">
                        Sub Menu Title
                      </h1>
                      <a
                        className="navbar-item"
                        href="/2017/08/03/list-of-tags/"
                      >
                        <div className="navbar-content">
                          <p>
                            <small className="has-text-info">03 Aug 2017</small>
                          </p>
                          <p>New feature: list of tags</p>
                        </div>
                      </a>
                      <a
                        className="navbar-item"
                        href="/2017/08/03/list-of-tags/"
                      >
                        <div className="navbar-content">
                          <p>
                            <small className="has-text-info">03 Aug 2017</small>
                          </p>
                          <p>New feature: list of tags</p>
                        </div>
                      </a>
                      <a
                        className="navbar-item"
                        href="/2017/08/03/list-of-tags/"
                      >
                        <div className="navbar-content">
                          <p>
                            <small className="has-text-info">03 Aug 2017</small>
                          </p>
                          <p>New feature: list of tags</p>
                        </div>
                      </a>
                    </div>
                    <div className="column">
                      <h1 className="title is-6 is-mega-menu-title">
                        Sub Menu Title
                      </h1>
                      <a
                        className="navbar-item"
                        href="/2017/08/03/list-of-tags/"
                      >
                        <div className="navbar-content">
                          <p>
                            <small className="has-text-info">03 Aug 2017</small>
                          </p>
                          <p>New feature: list of tags</p>
                        </div>
                      </a>
                      <a
                        className="navbar-item "
                        href="/documentation/overview/start/"
                      >
                        Overview
                      </a>
                      <a
                        className="navbar-item "
                        href="http://bulma.io/documentation/modifiers/syntax/"
                      >
                        Modifiers
                      </a>
                      <a
                        className="navbar-item "
                        href="http://bulma.io/documentation/columns/basics/"
                      >
                        Columns
                      </a>
                    </div>
                    <div className="column">
                      <h1 className="title is-6 is-mega-menu-title">
                        Sub Menu Title
                      </h1>
                      <a
                        className="navbar-item"
                        href="/2017/08/03/list-of-tags/"
                      >
                        <div className="navbar-content">
                          <p>
                            <small className="has-text-info">03 Aug 2017</small>
                          </p>
                          <p>New feature: list of tags</p>
                        </div>
                      </a>
                      <a
                        className="navbar-item"
                        href="/2017/08/03/list-of-tags/"
                      >
                        <div className="navbar-content">
                          <p>
                            <small className="has-text-info">03 Aug 2017</small>
                          </p>
                          <p>New feature: list of tags</p>
                        </div>
                      </a>
                      <a
                        className="navbar-item"
                        href="/2017/08/03/list-of-tags/"
                      >
                        <div className="navbar-content">
                          <p>
                            <small className="has-text-info">03 Aug 2017</small>
                          </p>
                          <p>New feature: list of tags</p>
                        </div>
                      </a>
                    </div>
                    <div className="column">
                      <h1 className="title is-6 is-mega-menu-title">
                        Sub Menu Title
                      </h1>
                      <a
                        className="navbar-item "
                        href="/documentation/overview/start/"
                      >
                        Overview
                      </a>
                      <a
                        className="navbar-item "
                        href="http://bulma.io/documentation/modifiers/syntax/"
                      >
                        Modifiers
                      </a>
                      <a
                        className="navbar-item "
                        href="http://bulma.io/documentation/columns/basics/"
                      >
                        Columns
                      </a>
                      <a
                        className="navbar-item "
                        href="http://bulma.io/documentation/layout/container/"
                      >
                        Layout
                      </a>
                    </div>
                  </div>
                </div>

                <hr className="navbar-divider" />
                <div className="navbar-item">
                  <div className="navbar-content">
                    <div className="level is-mobile">
                      <div className="level-left">
                        <div className="level-item">
                          <strong>Stay up to date!</strong>
                        </div>
                      </div>
                      <div className="level-right">
                        <div className="level-item">
                          <a
                            className="button bd-is-rss is-small"
                            href="http://bulma.io/atom.xml"
                          >
                            <span className="icon is-small">
                              <i className="fa fa-rss"></i>
                            </span>
                            <span>Subscribe</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">More</div>
              <div id="moreDropdown" className="navbar-dropdown ">
                <a className="navbar-item " href="http://bulma.io/extensions/">
                  <div className="level is-mobile">
                    <div className="level-left">
                      <div className="level-item">
                        <p>
                          <strong>Extensions</strong>
                          <br />
                          <small>Side projects to enhance Bulma</small>
                        </p>
                      </div>
                    </div>
                    <div className="level-right">
                      <div className="level-item">
                        <span className="icon has-text-info">
                          <i className="fa fa-plug"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div> */}
              <Link to="/" className="navbar-item">
                Home
              </Link>
              <Link to="/about" className="navbar-item">
                About
              </Link>
              <Link to="/blog" className="navbar-item">
                Blog
              </Link>
              <Link to="/recommended" className="navbar-item">
                Recommended
              </Link>

              {/* <a className="navbar-item " href="http://bulma.io/expo/">
              <span className="bd-emoji">🎨</span> &nbsp;Expo
            </a>
            <a className="navbar-item " href="http://bulma.io/love/">
              <span className="bd-emoji">❤️</span> &nbsp;Love
            </a> */}
            </div>

            <div className="navbar-end">
              {/* <a
              className="navbar-item is-hidden-desktop-only"
              href="https://github.com/jgthms/bulma"
              target="_blank"
            >
              <span className="icon" style={{ color: "#333" }}>
                <i className="fa fa-github"></i>
              </span>
            </a>
            <a
              className="navbar-item is-hidden-desktop-only"
              href="https://twitter.com/jgthms"
              target="_blank"
            >
              <span className="icon" style={{ color: "#55acee" }}>
                <i className="fa fa-twitter"></i>
              </span>
            </a> */}
              <div className="navbar-item">
                <div className="field is-grouped">
                  {/* <p className="control">
                  <a
                    className="bd-tw-button button"
                    data-social-network="Twitter"
                    data-social-action="tweet"
                    data-social-target="http://bulma.io"
                    target="_blank"
                    href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&hashtags=bulmaio&url=http://bulma.io&via=jgthms"
                  >
                    <span className="icon">
                      <i className="fa fa-twitter"></i>
                    </span>
                    <span>Tweet</span>
                  </a>
                </p> */}
                  <p className="control">
                    <OutboundLink
                      className="button is-primary"
                      href="https://ko-fi.com/abhith"
                      target="_blank"
                    >
                      Buy me a coffee <FaCoffee className="text-danger" />
                    </OutboundLink>
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
    render={data => <Navbar logo={data.logo} />}
  />
);
