import ServicesRoll from "@components/services-roll";
import TopicPageBase from "@components/topic-page-base";
import React from "react";

function TopicTools({ pageContext }) {
  const { topic, tools, topics } = pageContext;

  return (
    <TopicPageBase topic={topic} activeTab={`Tools`} topics={topics}>
      <ServicesRoll services={tools} />
    </TopicPageBase>
  );
}

export default TopicTools;
