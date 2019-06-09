import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import Tags from "./Tags";
import { truncate } from "lodash";

const ServicesRoll = props => {
  const { services } = props;

  if (!services || !services.length) {
    return <span>Services Coming Soon...</span>;
  }

  return (
    <>
      {services &&
        services.map(({ node: service }) => (
          <div class="col-lg-6 mb-4" key={service.id}>
            <div class="p-4 border rounded">
              <div class="row">
                <div class="col-md-3 mb-4 mb-md-0">
                  <img
                    alt={service.title}
                    src={`/img/tags/${service.tags[0]}.png`}
                    class="rounded-circle"
                    height="80"
                    width="80"
                  />
                </div>
                <div class="col-md-9">
                  <OutboundLink target="_blank" href={service.url}>
                    <h4 class="text-dark mb-0"> {service.title} </h4>
                  </OutboundLink>
                  <small className="d-block text-muted">
                    In <Tags tags={service.tags} />
                  </small>
                  <div class="excerpt">
                    {truncate(service.description, { length: 86 })}
                  </div>
                </div>
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
