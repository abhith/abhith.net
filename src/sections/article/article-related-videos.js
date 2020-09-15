import TitleBar from "@components/title-bar";
import VideosRoll from "@components/videos-roll";
import React from "react";

const RelatedVideos = ({ relatedVideos }) => {
  if (relatedVideos.length === 0) {
    return null;
  }

  return (
    <section className="section">
      <div className="container">
        <TitleBar title="Related Videos" linkTo="/recommended/videos/" />
        <VideosRoll videos={relatedVideos} itemsPerRow={3} />
      </div>
    </section>
  );
};

export default RelatedVideos;
