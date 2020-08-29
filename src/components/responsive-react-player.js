import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import TopicsBar from "./topics-bar";
import Hoverable from "@components/hoverable";
import { trackCustomEvent } from "gatsby-plugin-google-analytics";

const ResponsiveReactPlayer = (props) => {
  return (
    <Hoverable className="card">
      <div className="card-image">
        <div className="player-wrapper">
          <ReactPlayer
            light={true}
            className="react-player"
            url={props.url}
            width="100%"
            height="100%"
            onStart={() => {
              try {
                trackCustomEvent({
                  category: "video",
                  action: "play",
                  label: `${props.title}`,
                });
              } catch (err) {
                console.error(`failed to track event`, err);
              }
            }}
          />
        </div>
      </div>
      <div className="card-content">
        <div className="content">
          <p className="title is-5">{props.title}</p>
          <TopicsBar topics={props.topics} />
        </div>
      </div>
    </Hoverable>
  );
};

ResponsiveReactPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  topics: PropTypes.array.isRequired,
};

export default ResponsiveReactPlayer;
