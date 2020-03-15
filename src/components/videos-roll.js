import React from "react";
import PropTypes from "prop-types";
import ResponsiveReactPlayer from "./responsive-react-player";

const VideosRoll = props => {
  const { videos, itemsPerRow } = props;

  if (itemsPerRow === 1) {
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
  }

  let itemClassName;

  switch (itemsPerRow) {
    case 2:
      itemClassName = `column is-half mb-3`;
      break;
    case 3:
      itemClassName = `column is-one-third mb-3`;
      break;
    default:
      itemClassName = `mb-3`;
      break;
  }

  return (
    <div className="columns">
      {videos &&
        videos.map(({ node: video }) => (
          <div className={itemClassName} key={video.url}>
            <ResponsiveReactPlayer url={video.url} />
          </div>
        ))}
    </div>
  );
};

VideosRoll.propTypes = {
  videos: PropTypes.array.isRequired,
  itemsPerRow: PropTypes.number
};

VideosRoll.defaultProps = {
  itemsPerRow: 1
};

export default VideosRoll;
