import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import Tags from "./Tags";

const FeaturedSidebar = ({ items }) => {
  return (
    <div className="sticky-top sticky-top-offset">
      <h4 className="font-weight-bold spanborder">
        <span>Featured</span>
      </h4>
      <ol className="list-featured">
        {items &&
          items.map(({ node: item }) => (
            <li className="mb-4" key={item.id}>
              <span>
                <h6 className="font-weight-bold">
                  <OutboundLink
                    className="text-dark"
                    target="_blank"
                    href={item.url}
                  >
                    {item.title}
                  </OutboundLink>
                </h6>
                <span className="d-block text-muted">
                  In <Tags tags={item.tags} />
                </span>
              </span>
            </li>
          ))}
      </ol>
    </div>
  );
};

FeaturedSidebar.propTypes = {
  items: PropTypes.array
};

export default FeaturedSidebar;
