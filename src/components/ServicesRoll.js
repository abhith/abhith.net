import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import Tags from "./Tags";
import { truncate } from "lodash";

const ServicesRoll = props => {
  const { services } = props;

  return (
    <div className="row gap-y listrecent listrecent listauthor">
      <>
        {services &&
          services.map(({ node: service }) => (
            <div className="col-6 mb-4" key={service.id}>
              <div className="p-4 border rounded">
                <div className="row">
                  {/* <div className="col-md-3 mb-4 mb-md-0">
                  <img
                    alt={service.title}
                    src={`/img/tags/${service.tags[0]}.png`}
                    className="rounded-circle"
                    height="80"
                    width="80"
                  />
                </div> */}
                  <div className="col-md-12">
                    <OutboundLink target="_blank" href={service.url}>
                      <h4 className="text-dark mb-0"> {service.title} </h4>
                    </OutboundLink>
                    <small className="d-block text-muted">
                      In <Tags tags={service.tags} />
                    </small>
                    <div className="excerpt">
                      {truncate(service.description, { length: 86 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    </div>
  );
};
ServicesRoll.propTypes = {
  services: PropTypes.array.isRequired
};

export default ServicesRoll;
