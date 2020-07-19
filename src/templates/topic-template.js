import BlogRoll from "@components/blog-roll";
import TopicPageBase from "@components/topic-page-base";
import React from "react";

function Topic({ pageContext }) {
  const { topic, articles, topics } = pageContext;
  return (
    <TopicPageBase topic={topic} activeTab={`Posts`} topics={topics}>
      <BlogRoll posts={articles} />
    </TopicPageBase>
  );
}

export default Topic;
