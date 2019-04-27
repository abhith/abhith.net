import React from "react";
import { Link } from "gatsby";
import { FaCoffee } from "react-icons/fa";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
      hamburgerMenuClass: "collapsed"
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
              navBarActiveClass: "show",
              hamburgerMenuClass: ""
            })
          : this.setState({
              navBarActiveClass: "",
              hamburgerMenuClass: "collapsed"
            });
      }
    );
  };

  render() {
    return (
      <nav
        id="MagicMenu"
        class="topnav navbar navbar-expand-lg navbar-light bg-white fixed-top"
      >
        <div class="container">
          <Link to="/" className="navbar-brand">
            <strong>Abhith</strong>
          </Link>

          <button
            className={`navbar-toggler ${this.state.hamburgerMenuClass}`}
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded={this.state.active}
            aria-label="Toggle navigation"
            onClick={() => this.toggleHamburger()}
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div
            className={`navbar-collapse collapse ${
              this.state.navBarActiveClass
            }`}
            id="navbarColor02"
          >
            <ul class="navbar-nav mr-auto d-flex align-items-center">
              <li class="nav-item">
                <a class="nav-link" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/blog" className="nav-link">
                  Blog
                </Link>
              </li>
              {/* <li class="nav-item">
                <a target="_blank" class="nav-link" href="/">
                  Contact
                </a>
              </li> */}
              <li class="nav-item">
                <OutboundLink
                  className="nav-link"
                  href="https://www.buymeacoffee.com/abhith"
                >
                  Buy me a coffee <FaCoffee className="text-danger" />
                </OutboundLink>
              </li>
            </ul>
            <ul class="navbar-nav ml-auto d-flex align-items-center">
              <form
                class="bd-search hidden-sm-down"
                onSubmit="return lunr_search(document.getElementById('lunrsearch').value);"
              >
                <input
                  type="text"
                  class="form-control text-small"
                  id="lunrsearch"
                  name="q"
                  value=""
                  placeholder="Type keyword and enter..."
                />
              </form>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
