import TopicPageBase from "@components/topic-page-base";
import VideosRoll from "@components/videos-roll";
import React from "react";
import { graphql } from "gatsby";

function TopicVideos({ pageContext, data }) {
  const { allWebMentionEntry } = data;
  const { topic, videos, topics } = pageContext;

  return (
    <TopicPageBase
      topic={topic}
      activeTab={`Videos`}
      topics={topics}
      allWebMentionEntry={allWebMentionEntry}
    >
      <VideosRoll videos={videos} />
    </TopicPageBase>
  );
}

export default TopicVideos;

export const pageQuery = graphql`
  query TopicVideosQuery($permalink: String!) {
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
