import StoriesRoll from "@components/StoriesRoll";
import TopicPageBase from "@components/TopicPageBase";
import { TopicPageTab } from "@types";
import React from "react";

function TopicStories({ pageContext }) {
  const { topic, stories, topics } = pageContext;

  return (
    <TopicPageBase
      topic={topic}
      activeTab={TopicPageTab.Stories}
      topics={topics}
    >
      <StoriesRoll posts={stories} />
    </TopicPageBase>
  );
}

export default TopicStories;
