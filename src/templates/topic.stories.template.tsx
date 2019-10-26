import StoriesRoll from "@components/StoriesRoll";
import TopicPageBase from "@components/TopicPageBase";
import React from "react";

function TopicStories({ pageContext }) {
  const { topic, stories } = pageContext;

  return (
    <TopicPageBase
      slug={topic.slug}
      title={topic.title}
      totalPostCount={topic.totalPosts}
      totalServiceCount={topic.totalServices}
      totalStoriesCount={topic.totalStories}
      totalVideoCount={topic.totalVideos}
      activeTab="stories"
    >
      {stories.length > 0 && <StoriesRoll posts={stories} />}
    </TopicPageBase>
  );
}

export default TopicStories;
