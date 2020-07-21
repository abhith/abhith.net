import React from "react";
import { FcLike, FcSms } from "react-icons/fc";
import TitleBar from "@components/title-bar";

export default function Webmentions({ edges }) {
  if (!edges) {
    return null;
  }
  const mentions = edges.length;
  const likes = edges.filter(({ node }) => node.wmProperty === "like-of");
  const likeAuthors = likes.map(
    ({ node }) => node.author && { wmId: node.wmId, ...node.author }
  );

  if (mentions == 0) {
    return null;
  }
  return (
    <div className="columns">
      <div className="column is-full">
        <TitleBar title={`Webmentions`} />
        <div className="columns">
          <div className="column is-one-quarter">
            <span aria-label={`${likes.length} likes`}>
              <span className="icon">
                <FcLike />
              </span>
              {likes.length}
            </span>
            <span aria-label={`${mentions} Mentions`}>
              <span className="icon">
                <FcSms />
              </span>
              {mentions}
            </span>
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
