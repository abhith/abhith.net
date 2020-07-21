import StoriesRoll from "@components/stories-roll";
import TopicPageBase from "@components/topic-page-base";
import React from "react";
import { graphql } from "gatsby";

function TopicStories({ pageContext, data }) {
  const { allWebMentionEntry } = data;
  const { topic, stories, topics } = pageContext;

  return (
    <TopicPageBase
      topic={topic}
      activeTab={`Stories`}
      topics={topics}
      allWebMentionEntry={allWebMentionEntry}
    >
      <StoriesRoll posts={stories} />
    </TopicPageBase>
  );
}

export default TopicStories;

export const pageQuery = graphql`
  query TopicStoriesQuery($permalink: String!) {
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
