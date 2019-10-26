import ServicesRoll from "@components/ServicesRoll";
import TopicPageBase from "@components/TopicPageBase";
import React from "react";

function TopicTools({ pageContext }) {
  const { topic, tools } = pageContext;

  return (
    <TopicPageBase
      slug={topic.slug}
      title={topic.title}
      totalPostCount={topic.totalPosts}
      totalServiceCount={topic.totalServices}
      totalStoriesCount={topic.totalStories}
      totalVideoCount={topic.totalVideos}
      activeTab="tools"
    >
      {tools.length > 0 && <ServicesRoll services={tools} />}
    </TopicPageBase>
  );
}

export default TopicTools;
