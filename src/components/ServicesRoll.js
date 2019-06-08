import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import Tags from "./Tags";

const ServicesRoll = props => {
  const { services } = props;

  if (!services || !services.length) {
    return <span>Services Coming Soon...</span>;
  }

  return (
    <>
      {services &&
        services.map(({ node: service }) => (
          <div className="col-md-6" key={service.id}>
            <div className="card border-0 mb-4 box-shadow">
              <OutboundLink target="_blank" href={service.url}>
                <div
                  style={{ backgroundImage: `url(${service.image})` }}
                  className={`img-bg topfirstimage`}
                />
              </OutboundLink>

              <div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
                <h2 className="h4 font-weight-bold">
                  <OutboundLink
                    className="text-dark"
                    target="_blank"
                    href={service.url}
                  >
                    {service.title}
                  </OutboundLink>
                </h2>
                <p className="excerpt">{service.description}</p>
                <div>
                  <small className="d-block text-muted">
                    In <Tags tags={service.tags} />
                  </small>
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
