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
            <div className="columns p-4 border rounded">
              <div className="column">
                <OutboundLink target="_blank" href={service.url}>
                  <h4 className="title is-5"> {service.title} </h4>
                </OutboundLink>
                <Tags tags={service.tags} />
                <div className="subtitle is-6">{service.description}</div>
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
