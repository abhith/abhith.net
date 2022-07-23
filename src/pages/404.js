import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
import { GoMarkGithub } from "react-icons/go";
import { OutboundLink } from "gatsby-plugin-google-gtag";

const NotFoundPage = () => (
  <Layout>
    <section class="section is-medium">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column has-text-centered">
            <h1 class="title">404 Page Not Found</h1>
            <p class="subtitle">
              The page you are looking for doesn't exist or an unexpected error
              has occurred 😞
              <br /> Do drop me a line about the missing page if you have time
              👍
            </p>
            <div class="buttons are-large is-centered">
              <Link className="button is-primary is-light" to="/">
                Home
              </Link>
              <OutboundLink
                className="button is-info is-light"
                href="https://github.com/abhith/abhith.net"
                target="_blank"
              >
                <span className="icon">
                  <GoMarkGithub />
                </span>
                <span></span>
              </OutboundLink>
              <Link className="button is-link is-light" to="/contact/">
                Contact
              </Link>
            </div>
          </div>
          <div class="column has-text-centered">
            <img
              src="/img/site/404.jpg"
              alt="404 Page Not Found"
              className="blog-featured"
            />
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;
