import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import Tags from "./Tags";

const FeaturedSidebar = ({ items }) => {
  return (
    <div className="sticky-top sticky-top-offset">
      <h4 className="spanborder">
        <span className="has-text-weight-bold">Featured</span>
      </h4>
      <ol className="list-featured">
        {items &&
          items.map(({ node: item }) => (
            <li className="ml-3 mb-4" key={item.id}>
              <span>
                <OutboundLink
                  className="text-dark"
                  target="_blank"
                  href={item.url}
                >
                  <h6 className="title is-6 has-text-weight-bold">
                    {item.title}
                  </h6>
                </OutboundLink>

                <Tags tags={item.tags} />
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
