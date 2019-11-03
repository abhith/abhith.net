import StoriesRoll from "@components/StoriesRoll";
import TopicPageBase from "@components/TopicPageBase";
import { TopicPageTab } from "@types";
import React from "react";

function TopicStories({ pageContext }) {
  const { topic, stories } = pageContext;

  return (
    <TopicPageBase topic={topic} activeTab={TopicPageTab.Stories}>
      <StoriesRoll posts={stories} />
    </TopicPageBase>
  );
}

export default TopicStories;
