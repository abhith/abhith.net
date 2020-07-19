import React from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import TopicsBar from "./topics-bar";
import Button from "./button";
const FeaturedSidebar = ({ items, totalCount }) => {
  return (
    <div className="sticky">
      <h4 className="spanborder">
        <span className="title is-4 has-text-weight-bold">
          Recommended Tools & Services
        </span>
      </h4>
      <ol className="list-featured">
        {items &&
          items.map(({ node: item }) => (
            <li className="mb-4" key={item.id}>
              <span>
                <h6 className="has-text-weight-bold">
                  <OutboundLink
                    target="_blank"
                    className="has-text-dark"
                    href={item.url}
                  >
                    {item.title}
                  </OutboundLink>
                </h6>
                <TopicsBar topics={item.tags} />
              </span>
            </li>
          ))}
      </ol>
      <Button
        text={`View All ${totalCount} Tools & Services`}
        path="/recommended/services"
        align="left"
      ></Button>
    </div>
  );
};

FeaturedSidebar.propTypes = {
  items: PropTypes.array,
};

export default FeaturedSidebar;
