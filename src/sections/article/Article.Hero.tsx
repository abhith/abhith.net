import Image from "@components/Image";
import { IArticle } from "@types";
import { Link } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import React from "react";

interface IArticleHeroProps {
  article: IArticle;
  //   authors: IAuthor[];
}

const ArticleHero = ({ article }: IArticleHeroProps) => {
  return (
    <section className="hero hero-is-secondary">
      <div className="hero-body">
        <div className="columns is-vcentered">
          <div className="column is-5 is-offset-1 post-caption">
            <p className="text-uppercase ">
              {article.tags && article.tags.length ? (
                <span className="taglist">
                  {article.tags.map(tag => (
                    <React.Fragment key={tag}>
                      <Link
                        className="has-text-danger has-text-weight-bold is-uppercase"
                        to={`/topics/${tag}/`}
                      >
                        {tag}
                      </Link>{" "}
                      <span className="sep">, </span>
                    </React.Fragment>
                  ))}
                </span>
              ) : null}
            </p>
            <div className="divider"></div>
            <h1 className="title is-2 is-light is-semibold is-spaced main-title">
              {article.title}
            </h1>

            <div className="author-block">
              <div className="image is-64x64">
                <img src="/img/abhith-avatar.jpg" alt="" />
              </div>
              <div className="author-name">
                <span>
                  by Abhith Rajan{" "}
                  <OutboundLink
                    target="_blank"
                    className="button is-info is-outlined is-small is-rounded ml-1"
                    href={`https://twitter.com/abhithrajan`}
                  >
                    Follow
                  </OutboundLink>
                </span>

                <span>
                  {article.date} &middot; {article.timeToRead} &middot; Last
                  Updated:{" "}
                  <time dateTime={article.lastModifiedTime}>
                    {article.lastModifiedTimeString}
                  </time>
                </span>
              </div>
            </div>
          </div>
          <div className="column is-5">
            <figure className="image">
              <Image
                src={article.hero.full}
                className={`blog-featured`}
                alt={article.title}
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ArticleHero;
