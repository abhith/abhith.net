import BlogCard from "@components/blog-card";
import TitleBar from "@components/title-bar";
import { partition } from "lodash";
import React from "react";

const RelatedArticles = ({ articles }) => {
  if (articles.length === 0) {
    return null;
  }

  let relatedPostsFirstHalf = [];
  let relatedPostsSecondHalf = [];
  const rowElements = [];

  let rowItemsCollection = [];
  if (articles.length > 3) {
    [relatedPostsFirstHalf, relatedPostsSecondHalf] = partition(articles, i => {
      return articles.indexOf(i) % 2 === 0;
    });
    rowItemsCollection = [relatedPostsFirstHalf, relatedPostsSecondHalf];
  } else {
    rowItemsCollection = [articles];
  }

  rowItemsCollection.forEach((rowItems, index) => {
    rowElements.push(
      <div className="columns" key={index}>
        {rowItems.map(article => {
          return <BlogCard post={article} key={article.id} />;
        })}
      </div>
    );
  });

  return (
    <section className="section">
      <div className="container is-fluid">
        <TitleBar title={`Related Posts`} />
        {rowElements}
      </div>
    </section>
  );
};

export default RelatedArticles;
