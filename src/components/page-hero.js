import React from "react";
import PropTypes from "prop-types";
import { FaRss } from "react-icons/fa";

const PageHero = ({ title, subtitle, className, subscribeUrl }) => (
  <section className={`hero is-primary is-bold ${className}`}>
    <div className="hero-body">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-two-thirds">
            <h1 className="title"> {title} </h1>
            <h2 className="subtitle">{subtitle}</h2>
            {subscribeUrl && (
              <a className="button ar-is-rss" href={subscribeUrl}>
                <span className="icon">
                  <FaRss></FaRss>
                </span>
                <span>Subscribe</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

PageHero.protoTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  className: PropTypes.string,
  subscribeUrl: PropTypes.string,
};

export default PageHero;
