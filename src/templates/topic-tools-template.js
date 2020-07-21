import ServicesRoll from "@components/services-roll";
import TopicPageBase from "@components/topic-page-base";
import React from "react";
import { graphql } from "gatsby";

function TopicTools({ pageContext, data }) {
  const { allWebMentionEntry } = data;
  const { topic, tools, topics } = pageContext;

  return (
    <TopicPageBase
      topic={topic}
      activeTab={`Tools`}
      topics={topics}
      allWebMentionEntry={allWebMentionEntry}
    >
      <ServicesRoll services={tools} />
    </TopicPageBase>
  );
}

export default TopicTools;

export const pageQuery = graphql`
  query TopicToolsQuery($permalink: String!) {
    allWebMentionEntry(filter: { wmTarget: { eq: $permalink } }) {
      edges {
        node {
          wmTarget
          wmSource
          wmProperty
          wmId
          type
          url
          likeOf
          author {
            url
            type
            photo
            name
          }
          content {
            text
          }
        }
      }
    }
  }
`;
