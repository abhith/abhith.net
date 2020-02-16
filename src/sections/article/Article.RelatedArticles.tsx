import BlogCard from "@components/blog/BlogCard";
import TitleBar from "@components/TitleBar";
import { IArticle } from "@types";
import { partition } from "lodash";
import React from "react";

interface IArticleRelatedArticlesProps {
  articles: IArticle[];
}
const RelatedArticles = ({ articles }: IArticleRelatedArticlesProps) => {
  if (articles.length === 0) {
    return null;
  }

  let relatedPostsFirstHalf = [];
  let relatedPostsSecondHalf = [];
  const rowElements: JSX.Element[] = [];

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
