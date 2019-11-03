import ServicesRoll from "@components/ServicesRoll";
import TopicPageBase from "@components/TopicPageBase";
import { TopicPageTab } from "@types";
import React from "react";

function TopicTools({ pageContext }) {
  const { topic, tools } = pageContext;

  return (
    <TopicPageBase topic={topic} activeTab={TopicPageTab.Tools}>
      <ServicesRoll services={tools} />
    </TopicPageBase>
  );
}

export default TopicTools;
