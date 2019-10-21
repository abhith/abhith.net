import StoriesRoll from "@components/StoriesRoll";
import TitleBar from "@components/TitleBar";
import { partition } from "lodash";
import React from "react";

const RelatedStories = ({ relatedStories }) => {
  if (relatedStories.length === 0) {
    return null;
  }

  let relatedStoriesFirstHalf = [];
  let relatedStoriesSecondHalf = [];

  [relatedStoriesFirstHalf, relatedStoriesSecondHalf] = partition(
    relatedStories,
    i => {
      return relatedStories.indexOf(i) % 2 === 0;
    }
  );

  return (
    <section className="section">
      <div className="container is-fluid">
        <TitleBar title={`Related Stories`} />
        <div className="columns">
          <div className="column is-half">
            <StoriesRoll posts={relatedStoriesFirstHalf} />
          </div>
          <div className="column is-half">
            <StoriesRoll posts={relatedStoriesSecondHalf} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedStories;
