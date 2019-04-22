import React from "react";
import { Link } from "gatsby";
// import github from "../img/github-icon.svg";
// import logo from "../img/logo.svg";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ""
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
              navBarActiveClass: "is-active"
            })
          : this.setState({
              navBarActiveClass: ""
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
            class="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="navbar-collapse collapse" id="navbarColor02">
            <ul class="navbar-nav mr-auto d-flex align-items-center">
              <li class="nav-item">
                <a class="nav-link" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  About
                </a>
              </li>
              <li class="nav-item">
                <Link to="/blog" className="nav-link">
                  Blog
                </Link>
              </li>
              <li class="nav-item">
                <a target="_blank" class="nav-link" href="/">
                  Contact
                </a>
              </li>
              <li class="nav-item">
                {/* <OutboundLink
                                className="nav-link"
                                href="https://www.buymeacoffee.com/abhith"
                            >
                                Buy me a coffee <i class="fa fa-coffee text-danger"></i>
                            </OutboundLink> */}
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

      // <nav
      //   className="navbar is-transparent"
      //   role="navigation"
      //   aria-label="main-navigation"
      // >
      //   <div className="container">
      //     <div className="navbar-brand">
      //       <Link to="/" className="navbar-item" title="Logo">
      //         <img src={logo} alt="Kaldi" style={{ width: "88px" }} />
      //       </Link>
      //       {/* Hamburger menu */}
      //       <div
      //         className={`navbar-burger burger ${this.state.navBarActiveClass}`}
      //         data-target="navMenu"
      //         onClick={() => this.toggleHamburger()}
      //       >
      //         <span />
      //         <span />
      //         <span />
      //       </div>
      //     </div>
      //     <div
      //       id="navMenu"
      //       className={`navbar-menu ${this.state.navBarActiveClass}`}
      //     >
      //       <div className="navbar-start has-text-centered">
      //         <Link className="navbar-item" to="/about">
      //           About
      //         </Link>
      //         <Link className="navbar-item" to="/products">
      //           Products
      //         </Link>
      //         <Link className="navbar-item" to="/blog">
      //           Blog
      //         </Link>
      //         <Link className="navbar-item" to="/contact">
      //           Contact
      //         </Link>
      //         <Link className="navbar-item" to="/contact/examples">
      //           Form Examples
      //         </Link>
      //       </div>
      //       <div className="navbar-end has-text-centered">
      //         <a
      //           className="navbar-item"
      //           href="https://github.com/AustinGreen/gatsby-netlify-cms-boilerplate"
      //           target="_blank"
      //           rel="noopener noreferrer"
      //         >
      //           <span className="icon">
      //             <img src={github} alt="Github" />
      //           </span>
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </nav>
    );
  }
};

export default Navbar;
