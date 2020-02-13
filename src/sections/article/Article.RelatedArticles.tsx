import BlogCard from "@components/blog/BlogCard";
import TitleBar from "@components/TitleBar";
import { IArticle } from "@types";
import { partition } from "lodash";
import React from "react";

interface IArticleRelatedArticlesProps {
  articles: IArticle[];
}
const RelatedArticles = ({ articles }: IArticleRelatedArticlesProps) => {
  let relatedPostsFirstHalf = [];
  let relatedPostsSecondHalf = [];
  const rowElements = [];

  [relatedPostsFirstHalf, relatedPostsSecondHalf] = partition(articles, i => {
    return articles.indexOf(i) % 2 === 0;
  });

  rowElements.push(
    <div className="columns" key={1}>
      {relatedPostsFirstHalf.map(article => {
        return <BlogCard post={article} key={article.id} />;
      })}
    </div>
  );

  rowElements.push(
    <div className="columns" key={2}>
      {relatedPostsSecondHalf.map(article => {
        return <BlogCard post={article} key={article.id} />;
      })}
    </div>
  );

  if (articles.length === 0) {
    return null;
  }

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
