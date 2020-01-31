import Layout from "@components/Layout";
import LiveEdit from "@components/LiveEdit";
import MDXRenderer from "@components/MDX";
import SEO from "@components/SEO";
import TopicsBar from "@components/TopicsBar";
import Utterances from "@components/Utterances";

import { OutboundLink } from "gatsby-plugin-google-analytics";

import React from "react";

import { IArticle } from "@types";

// tslint:disable-next-line: no-submodule-imports
import { FaCoffee } from "react-icons/fa";

import { Link } from "gatsby";
import ArticleHero from "../sections/article/Article.Hero";
import RelatedArticles from "../sections/article/Article.RelatedArticles";
import RelatedStories from "../sections/article/Article.RelatedStories";
import RelatedTools from "../sections/article/Article.RelatedTools";
import RelatedVideos from "../sections/article/Article.RelatedVideos";
import ArticleShare from "../sections/article/Article.Share";

export default ({ pageContext, location }) => {
  const {
    article,
    relatedArticles,
    relatedStories,
    relatedVideos,
    relatedTools,
    next,
    previous
  }: {
    article: IArticle;
    relatedArticles: IArticle[];
    relatedStories: any;
    relatedVideos: any;
    relatedTools: any;
    next: IArticle;
    previous: IArticle;
  } = pageContext;

  const githubURL = `https://github.com/Abhith/abhith.net/blob/master/content${article.slug.substring(
    0,
    article.slug.length - 1
  )}.mdx`;

  const askForCommentsCode = `
  function AskForFeedback() {
    const [isHelpful, setIsHelpful] = React.useState();
    let note;
    if (isHelpful === "yes") {
      note = (
        <div className="notification is-success is-light">
          <h3>
            👊 that ⭐️ button on the official{" "}
            <a
              href="https://github.com/Abhith/abhith.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repo
            </a>{" "}
            to stay up to date.
          </h3>
          <p>Say thanks ♥ in the comments</p>
        </div>
      );
    } else if (isHelpful === "no") {
      note = (
        <div className="notification is-warning is-light">
          <h3>Sorry about that</h3>
          <p> TODO(abhith): let me know how can I improve it?</p>
        </div>
      );
    } else {
      note = (
        <>
          <h3>Your opinion matters</h3>
          <p>Please share your thought about this article </p>
        </>
      );
    }
    return (
      <div className="content">
        <h2>Was this article helpful?</h2>
        <div className="buttons is-centered">         
          <button
            className="button is-success is-light"
            onClick={() => setIsHelpful("yes")}
          >
            Yes
          </button>
          <button
            className="button is-warning is-light"
            onClick={() => setIsHelpful("no")}
          >
            No
          </button>
        </div>
        {note}
      </div>
    );
  } 
  `.trim();

  return (
    <Layout>
      <div className="blog-post-wrapper">
        <SEO
          title={article.title}
          description={article.excerpt}
          image={article.hero.full.src}
          isBlogPost={true}
          slug={article.slug}
          dateModified={article.dateModifiedSeoFormat}
          datePublished={article.datePublishedSeoFormat}
        />
        <ArticleHero article={article} />
        <section className="section">
          <div className="columns is-centered">
            <div className="column is-1">
              <ArticleShare article={article} location={location} />
            </div>
            <div className="column is-9">
              <div className="ar-breadcrumb is-hidden-mobile">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li>
                      <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                      <Link to={`/blog`}>Blog</Link>
                    </li>
                    <li className="is-active">
                      <Link to={article.slug}>{article.title}</Link>
                    </li>
                  </ul>
                </nav>
                <nav className="bd-prev-next">
                  {previous ? (
                    <Link to={previous.slug} title={previous.title}>
                      ←
                    </Link>
                  ) : (
                    <span>←</span>
                  )}

                  {next ? (
                    <Link to={next.slug} title={next.title}>
                      →
                    </Link>
                  ) : (
                    <span>→</span>
                  )}
                </nav>
              </div>
              <MDXRenderer content={article.body}>
                <TopicsBar topics={article.tags} />
                <div className="container mt-5 mb-3">
                  <div className="media">
                    <figure className="media-left">
                      <p className="image is-128x128">
                        <img
                          className="is-rounded"
                          src={`https://www.abhith.net/img/abhith.jpg`}
                          alt={`Abhith Rajan`}
                        />
                      </p>
                    </figure>
                    <div className="media-content">
                      <div className="content">
                        <p>
                          <strong className="title is-4">
                            Written by {`Abhith Rajan`}
                          </strong>{" "}
                          <span>
                            <a
                              className="twitter-follow-button"
                              href="https://twitter.com/abhithrajan"
                              data-show-screen-name="false"
                            >
                              Follow @AbhithRajan
                            </a>
                          </span>
                          <br />
                          {/* TODO: Make dynamic */}
                          {`
        Abhith Rajan is an aspiring software engineer with more than 7 years of experience and proven successful track record of delivering technology-based products and services.
      `}
                          <br />
                          <Link
                            to="/donate"
                            className="button k-button k-primary raised has-gradient rounded"
                          >
                            Buy me a coffee <FaCoffee />
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <LiveEdit code={askForCommentsCode} noInline={false} />
                <div id="typo" className="ar-typo">
                  <p className="has-text-grey">
                    This page is{" "}
                    <strong className="has-text-grey">open source</strong>.
                    Noticed a typo? Or something unclear?
                    <br />
                    <OutboundLink
                      href={githubURL}
                      target="_blank"
                      className="has-text-grey"
                    >
                      Improve this page on GitHub
                    </OutboundLink>
                  </p>
                </div>
                <Utterances repo={`Abhith/abhith.net`} />
              </MDXRenderer>
            </div>
          </div>
        </section>
      </div>
      <RelatedArticles articles={relatedArticles} />
      <RelatedVideos relatedVideos={relatedVideos} />
      <RelatedStories relatedStories={relatedStories} />
      <RelatedTools relatedServices={relatedTools} />
    </Layout>
  );
};
