import TopicPageBase from "@components/TopicPageBase";
import VideosRoll from "@components/VideosRoll";
import React from "react";

function TopicVideos({ pageContext }) {
  const { topic, videos } = pageContext;

  return (
    <TopicPageBase
      slug={topic.slug}
      title={topic.title}
      totalPostCount={topic.totalPosts}
      totalServiceCount={topic.totalServices}
      totalStoriesCount={topic.totalStories}
      totalVideoCount={topic.totalVideos}
      activeTab="videos"
    >
      {videos.length > 0 && <VideosRoll videos={videos} />}
    </TopicPageBase>
  );
}

export default TopicVideos;
