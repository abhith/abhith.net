import React from "react";
import PropTypes from "prop-types";
import ResponsiveReactPlayer from "./ResponsiveReactPlayer";

const VideosRoll = props => {
  const { videos } = props;

  if (!videos || !videos.length) {
    return (
      <div className="mb-5">
        <span>Videos Coming Soon...</span>
      </div>
    );
  }

  return (
    <>
      {videos &&
        videos.map(({ node: video }) => (
          <div className="mb-3" key={video.url}>
            <ResponsiveReactPlayer url={video.url} />
          </div>
        ))}
    </>
  );
};
VideosRoll.propTypes = {
  videos: PropTypes.array.isRequired
};

export default VideosRoll;
