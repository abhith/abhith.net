import React from "react";
import { FcLike, FcRefresh } from "react-icons/fc";
import TitleBar from "@components/title-bar";
import styled from "@emotion/styled";

const CounterStyled = styled("span")`
  padding-left: 0.25rem;
  text-align: center;
  vertical-align: super;
  font-weight: 600;
`;

export default function Webmentions({ edges }) {
  if (!edges) {
    return null;
  }

  const mentions = edges.length;

  if (mentions === 0) {
    return null;
  }

  const likes = edges.filter(({ node }) => node.wmProperty === "like-of");
  const repost = edges.filter(({ node }) => node.wmProperty === "repost-of");

  const likeAuthors = likes.map(
    ({ node }) => node.author && { wmId: node.wmId, ...node.author }
  );

  return (
    <div className="columns mt-5 mb-3">
      <div className="column is-full">
        <TitleBar title={`Webmentions`} />
        <div className="columns">
          <div className="column is-one-quarter">
            <nav class="level is-mobile">
              <div class="level-left">
                <div class="level-item">
                  <span aria-label={`${likes.length} likes`}>
                    <FcLike className="icon" />
                    <CounterStyled>{likes.length}</CounterStyled>
                  </span>
                </div>
                <div class="level-item">
                  <span aria-label={`${repost.length} reposts`}>
                    <FcRefresh className="icon" />
                    <CounterStyled>{repost.length}</CounterStyled>
                  </span>
                </div>
              </div>
            </nav>
          </div>
          <div className="column">
            <div>
              <div className="ar-webmention-avatars">
                {likeAuthors.slice(0, 10).map((author) => (
                  <span className="ar-webmention-avatar" key={author.wmId}>
                    <a href={author.url}>
                      <img
                        alt={author.name}
                        src={author.photo}
                        key={author.wmId}
                      />
                    </a>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
