import BlogCard from "@components/blog-card";
import TitleBar from "@components/title-bar";
import { chunk } from "lodash";
import React from "react";

const RelatedArticles = ({ articles }) => {
  if (articles.length === 0) {
    return null;
  }

  const rowElements = [];
  let rowItemsCollection = [];
  rowItemsCollection = chunk(articles, 3);
  rowItemsCollection.forEach((rowItems, index) => {
    rowElements.push(
      <div className="columns" key={index}>
        {rowItems.map((article) => {
          return (
            <div className="column is-one-third" key={article.id}>
              <BlogCard post={article} key={article.id} />
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <section className="section">
      <div className="container">
        <TitleBar title="Related Articles" linkTo="/blog/" />
        {rowElements}
      </div>
    </section>
  );
};

export default RelatedArticles;
