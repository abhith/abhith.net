import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import TopicsBar from "./topics-bar";
import BoxStyled from "@components/box-styled";

import { domainFromURL, transformURL } from "../utils/common";

const ServicesRoll = (props) => {
  const { services, hideDescription } = props;

  return (
    <>
      {services &&
        services.map(({ node: service }) => (
          <BoxStyled key={service.id}>
            <div className="columns">
              <div className="column">
                <small>{domainFromURL(service.url)}</small>
                <h4 className="title is-4">
                  <OutboundLink
                    target="_blank"
                    href={transformURL(service.url)}
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
          </BoxStyled>
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
