import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import TopicsBar from "./topics-bar";
import BoxStyled from "@components/box-styled";

const ResponsiveReactPlayer = (props) => {
  return (
    <BoxStyled className="card mb-5">
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
                typeof window !== "undefined" &&
                  window.gtag("event", "play", {
                    event_category: "Videos",
                    event_label: `${props.title}`,
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
    </BoxStyled>
  );
};

ResponsiveReactPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  topics: PropTypes.array.isRequired,
};

export default ResponsiveReactPlayer;
