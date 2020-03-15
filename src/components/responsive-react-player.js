import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

const ResponsivePlayer = props => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        light={true}
        className="react-player"
        url={props.url}
        width="100%"
        height="100%"
      />
    </div>
  );
};

ResponsivePlayer.propTypes = {
  url: PropTypes.string.isRequired
};

export default ResponsivePlayer;
