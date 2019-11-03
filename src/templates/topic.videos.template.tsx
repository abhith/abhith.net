import TopicPageBase from "@components/TopicPageBase";
import VideosRoll from "@components/VideosRoll";
import { TopicPageTab } from "@types";
import React from "react";

function TopicVideos({ pageContext }) {
  const { topic, videos, topics } = pageContext;

  return (
    <TopicPageBase
      topic={topic}
      activeTab={TopicPageTab.Videos}
      topics={topics}
    >
      <VideosRoll videos={videos} />
    </TopicPageBase>
  );
}

export default TopicVideos;
