import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import Tags from "./Tags";

const ServicesRoll = props => {
  const { services } = props;

  return (
    <>
      {services &&
        services.map(({ node: service }) => (
          <div className="box" key={service.id}>
            <div className="columns">
              <div className="column">
                <h4 className="title is-4">
                  <OutboundLink
                    className="has-text-dark"
                    target="_blank"
                    href={service.url}
                  >
                    {service.title}{" "}
                  </OutboundLink>
                </h4>

                <div className="subtitle">{service.description}</div>
                <Tags tags={service.tags} />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
ServicesRoll.propTypes = {
  services: PropTypes.array.isRequired
};

export default ServicesRoll;
