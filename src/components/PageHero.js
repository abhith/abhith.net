import React from "react";
import PropTypes from "prop-types";

const PageHero = ({ title, subtitle }) => (
  <section className="hero is-primary is-bold">
    <div className="hero-body">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-two-thirds">
            <h1 className="title"> {title} </h1>
            <h2 className="subtitle">{subtitle}</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
);

PageHero.protoTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default PageHero;
