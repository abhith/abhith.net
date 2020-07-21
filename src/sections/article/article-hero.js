import Image from "@components/image";
import { Link } from "gatsby";
import React from "react";

const ArticleHero = ({ article, authors }) => {
  return (
    <section className="hero is-primary is-bold position-relative">
      <div className="hero-body">
        <div className="columns is-vcentered">
          <div className="column is-5 is-offset-1 post-caption">
            <p className="text-uppercase ">
              {article.tags && article.tags.length ? (
                <span className="taglist">
                  {article.tags
                    .map((tag) => (
                      <Link
                        key={tag}
                        className="has-text-warning has-text-weight-bold is-uppercase p-category"
                        to={`/topics/${tag}/`}
                      >
                        {tag}
                      </Link>
                    ))
                    .reduce((prev, curr, index) => [
                      prev,
                      <span
                        key={index}
                        className="has-text-primary has-text-weight-light sep"
                      >
                        {" "}
                        |{" "}
                      </span>,
                      curr,
                    ])}
                </span>
              ) : null}
            </p>
            <div className="divider" />
            <h1 className="title is-2 is-light is-semibold is-spaced main-title p-name">
              {article.title}
            </h1>
            <h2 className="subtitle p-summary">{article.excerpt}</h2>
            {authors && authors.length === 1 ? (
              <div className="author-block">
                <div className="image is-64x64">
                  <Image src={authors[0].avatar.small} alt={authors[0].name} />
                </div>
                <div className="author-name">
                  <span>
                    <a
                      className="twitter-follow-button"
                      href={
                        "https://twitter.com/" +
                        authors[0].twitter.replace("@", "")
                      }
                      data-show-screen-name="false"
                    >
                      Follow {authors[0].twitter}
                    </a>
                  </span>
                  <span className="p-author h-card">{authors[0].name}</span>
                  <span>
                    {article.date} &middot; {article.timeToRead} &middot; Last
                    Updated:{" "}
                    <time
                      dateTime={article.lastModifiedTime}
                      className="dt-published"
                    >
                      {article.lastModifiedTimeString}
                    </time>
                  </span>
                </div>
              </div>
            ) : null}
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
