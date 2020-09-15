import TitleBar from "@components/title-bar";
import React from "react";
import SnippetRollItem from "@components/snippet-roll-item";
import { chunk } from "lodash";

const ArticleRelatedSnippets = ({ snippets }) => {
  if (!snippets || snippets.length === 0) {
    return null;
  }

  const rowElements = [];
  let rowItemsCollection = [];
  rowItemsCollection = chunk(snippets, 2);

  rowItemsCollection.forEach((rowItems, index) => {
    rowElements.push(
      <div className="columns" key={index}>
        {rowItems.map((snippet) => {
          return (
            <div className="column" key={snippet.id}>
              <SnippetRollItem
                snippet={snippet}
                key={snippet.id}
              ></SnippetRollItem>
            </div>
          );
        })}
      </div>
    );
  });
  return (
    <section className="section">
      <div className="container">
        <TitleBar title="Related Snippets" linkTo="/snippets/" />
        {rowElements}
      </div>
    </section>
  );
};

export default ArticleRelatedSnippets;
