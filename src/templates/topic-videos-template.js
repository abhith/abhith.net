import TopicPageBase from "@components/topic-page-base";
import VideosRoll from "@components/videos-roll";
import React from "react";

function TopicVideos({ pageContext }) {
  const { topic, videos, topics } = pageContext;

  return (
    <TopicPageBase topic={topic} activeTab={`Videos`} topics={topics}>
      <VideosRoll videos={videos} />
    </TopicPageBase>
  );
}

export default TopicVideos;
