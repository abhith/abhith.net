import VideosRoll from "@components/VideosRoll";
import TitleBar from "@components/TitleBar";
import React from "react";
import { Link } from "gatsby";

const RelatedVideos = ({ relatedVideos }) => {
  if (relatedVideos.length === 0) {
    return null;
  }

  return (
    <section className="section">
      <div className="container is-fluid">
        <TitleBar title={`Related Videos`} />
        <VideosRoll videos={relatedVideos} itemsPerRow={3} />
        <div className="cta-wrapper has-text-centered">
          <Link
            to="/recommended/videos"
            className="button k-button k-primary raised has-gradient is-bold"
          >
            <span className="text">View More Videos</span>
            <span className="front-gradient"></span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedVideos;
