import BlogRoll from "@components/BlogRoll";
import TopicPageBase from "@components/TopicPageBase";
import { TopicPageTab } from "@types";
import React from "react";

function Topic({ pageContext }) {
  const { topic, articles, topics } = pageContext;
  return (
    <TopicPageBase topic={topic} activeTab={TopicPageTab.Posts} topics={topics}>
      <BlogRoll posts={articles} />
    </TopicPageBase>
  );
}

export default Topic;
