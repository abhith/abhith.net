import StoriesRoll from "@components/stories-roll";
import TopicPageBase from "@components/topic-page-base";
import React from "react";

function TopicStories({ pageContext }) {
  const { topic, stories, topics } = pageContext;

  return (
    <TopicPageBase topic={topic} activeTab={`Stories`} topics={topics}>
      <StoriesRoll posts={stories} />
    </TopicPageBase>
  );
}

export default TopicStories;
