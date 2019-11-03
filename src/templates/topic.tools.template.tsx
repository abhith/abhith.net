import ServicesRoll from "@components/ServicesRoll";
import TopicPageBase from "@components/TopicPageBase";
import { TopicPageTab } from "@types";
import React from "react";

function TopicTools({ pageContext }) {
  const { topic, tools, topics } = pageContext;

  return (
    <TopicPageBase topic={topic} activeTab={TopicPageTab.Tools} topics={topics}>
      <ServicesRoll services={tools} />
    </TopicPageBase>
  );
}

export default TopicTools;
