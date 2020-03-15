import StoriesRollItem from "@components/stories-roll-item";
import TitleBar from "@components/title-bar";
import { partition } from "lodash";
import React from "react";
const RelatedStories = ({ relatedStories }) => {
  if (relatedStories.length === 0) {
    return null;
  }

  let relatedStoriesFirstHalf = [];
  let relatedStoriesSecondHalf = [];
  const columnElements = [];

  [relatedStoriesFirstHalf, relatedStoriesSecondHalf] = partition(
    relatedStories,
    i => {
      return relatedStories.indexOf(i) % 2 === 0;
    }
  );

  const groupedItems = [relatedStoriesFirstHalf, relatedStoriesSecondHalf];

  groupedItems.forEach((group, index) => {
    columnElements.push(
      <div className="column" key={index}>
        {group.map(({ node: article }) => {
          return <StoriesRollItem key={article.id} post={article} />;
        })}
      </div>
    );
  });

  return (
    <section className="section">
      <div className="container is-fluid">
        <TitleBar title={`Related Stories`} />
        <div className="columns">{columnElements}</div>
      </div>
    </section>
  );
};

export default RelatedStories;
