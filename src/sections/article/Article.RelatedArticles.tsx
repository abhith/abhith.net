import BlogRollItem from "@components/BlogRollItem";
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

  [relatedPostsFirstHalf, relatedPostsSecondHalf] = partition(articles, i => {
    return articles.indexOf(i) % 2 === 0;
  });

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="section">
      <div className="container is-fluid">
        <TitleBar title={`Related Posts`} />
        <div className="columns">
          <div className="column">
            {relatedPostsFirstHalf.map(article => {
              return <BlogRollItem post={article} key={article.id} />;
            })}
          </div>
          <div className="column">
            {relatedPostsSecondHalf.map(article => {
              return <BlogRollItem post={article} key={article.id} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
