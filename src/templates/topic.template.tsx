import TopicPageBase from "@components/TopicPageBase";
import BlogRoll from "@components/BlogRoll";
import React from "react";

function Topic({ pageContext }) {
  const { topic, articles } = pageContext;
  return (
    <TopicPageBase
      slug={topic.slug}
      title={topic.title}
      totalPostCount={topic.totalPosts}
      totalServiceCount={topic.totalServices}
      totalStoriesCount={topic.totalStories}
      totalVideoCount={topic.totalVideos}
      activeTab="posts"
    >
      <BlogRoll posts={articles} />
    </TopicPageBase>
  );
}

export default Topic;
