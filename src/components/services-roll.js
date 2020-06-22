import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import TopicsBar from "./topics-bar";
import Hoverable from "@components/hoverable";

const ServicesRoll = (props) => {
  const { services, hideDescription } = props;

  return (
    <>
      {services &&
        services.map(({ node: service }) => (
          <Hoverable className="box" key={service.id}>
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

                {!hideDescription && (
                  <div className="subtitle">{service.description}</div>
                )}

                <TopicsBar topics={service.tags} />
              </div>
            </div>
          </Hoverable>
        ))}
    </>
  );
};
ServicesRoll.propTypes = {
  services: PropTypes.array.isRequired,
  hideDescription: PropTypes.bool,
};

ServicesRoll.default = {
  hideDescription: false,
};

export default ServicesRoll;
