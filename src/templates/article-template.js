import React from "react";
import styled from "@emotion/styled";
import { Link, graphql } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import GitHubButton from "react-github-btn";

import Layout from "@components/layout";
import LiveEdit from "@components/live-edit";
import MDXRenderer from "@components/mdx";
import SEO from "@components/seo/seo";
import TableOfContents from "@components/table-of-contents";
import TopicsBar from "@components/topics-bar";
import Utterances from "@components/utterances";
import Image from "@components/image";
import Webmentions from "@components/webmentions";

import ArticleHero from "../sections/article/article-hero";
import RelatedArticles from "../sections/article/article-related-articles";
import RelatedStories from "../sections/article/article-related-stories";
import RelatedTools from "../sections/article/article-related-tools";
import RelatedVideos from "../sections/article/article-related-videos";
import ArticleShare from "../sections/article/article-share";

export default ({ pageContext, data, location }) => {
  const { allWebMentionEntry } = data;
  const {
    article,
    authors,
    relatedArticles,
    relatedStories,
    relatedVideos,
    relatedTools,
    next,
    previous,
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
          <h5>
            👊 that ⭐️ button on the official{" "}
            <a
              href="https://github.com/Abhith/abhith.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repo
            </a>
          </h5>
          <p>
            Please leave a comment below! <br />
            &#123; thank you ♥ &#125; is enough
          </p>
        </div>
      );
    } else if (isHelpful === "no") {
      note = (
        <div className="notification is-warning is-light">
          <h4>Sorry about that!</h4>
          <p> TODO(abhith): let me know how can I improve it?</p>
        </div>
      );
    } else {
      note = (
        <>
          <h4>Your opinion matters</h4>
          <p>Please share your thought about this article </p>
        </>
      );
    }
    return (
      <div className="content">
        <h3>Was this article helpful?</h3>
        <div className="buttons is-centered">
          <button
            className="button is-success is-light"
            onClick={() => setIsHelpful("yes")}
          >
            👍 Yes
          </button>
          <button
            className="button is-warning is-light"
            onClick={() => setIsHelpful("no")}
          >
            👎 No
          </button>
        </div>
        {note}
      </div>
    );
  }
  `.trim();

  return (
    <Layout>
      <SEO
        title={article.title}
        description={article.excerpt}
        image={article.hero.full.src}
        isBlogPost={true}
        slug={article.slug}
        dateModified={article.dateModifiedSeoFormat}
        datePublished={article.datePublishedSeoFormat}
      />
      <div className="h-entry">
        <ArticleHero article={article} authors={authors} />
        <div className="ar-main">
          <div className="ar-side-background" />
          <div className="ar-main-container container">
            <div className="ar-duo">
              <div className="ar-lead">
                <div className="ar-breadcrumb is-hidden-mobile">
                  <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                      <li>
                        <Link to={`/`}>Home</Link>
                      </li>
                      <li>
                        <Link to={`/blog/`}>Blog</Link>
                      </li>
                      <li className="is-active">
                        <a
                          className="u-url"
                          href={"https://www.abhith.net" + article.slug}
                        >
                          {article.title}
                        </a>
                      </li>
                    </ul>
                  </nav>
                  <nav className="bd-prev-next">
                    {next ? (
                      <Link to={next.slug} title={next.title}>
                        ←
                      </Link>
                    ) : (
                      <span>←</span>
                    )}
                    {previous ? (
                      <Link to={previous.slug} title={previous.title}>
                        →
                      </Link>
                    ) : (
                      <span>→</span>
                    )}
                  </nav>
                </div>
                <MDXRenderer content={article.body}>
                  <TopicsBar topics={article.tags} />
                </MDXRenderer>
                {authors && authors.length === 1 ? (
                  <div className="container mt-5 mb-3">
                    <div className="media">
                      <figure className="media-left">
                        <p className="image is-128x128">
                          <RoundedImage
                            src={authors[0].avatar.medium}
                            alt={authors[0].name}
                          />
                        </p>
                      </figure>
                      <div className="media-content">
                        <div className="content">
                          <p>
                            <strong className="title is-4">
                              Written by {authors[0].name}
                            </strong>{" "}
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
                            <br />
                            {authors[0].bio}
                            <br />
                            <Link
                              to="/donate/"
                              className="button k-button k-primary raised has-gradient rounded"
                            >
                              Buy me a coffee{" "}
                              <span role="img" aria-label="coffee">
                                ☕
                              </span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
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
                <Webmentions {...allWebMentionEntry} />
                <Utterances repo={`Abhith/abhith.net`} />
              </div>
              <aside className="ar-side">
                <div className="sticky">
                  <ArticleShare article={article} location={location} />
                  <div className="has-text-centered mt-3">
                    <div className="text-muted mb-1">
                      <span role="img" aria-label="star">
                        ⭐
                      </span>{" "}
                      On GitHub
                    </div>
                    <div className="buttons is-centered">
                      <GitHubButton
                        href="https://github.com/Abhith/abhith.net"
                        data-icon="octicon-star"
                        data-size="large"
                        data-show-count="true"
                        aria-label="Star Abhith/abhith.net on GitHub"
                      >
                        Star
                      </GitHubButton>
                    </div>
                  </div>
                  <TableOfContents page={article} location={location} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <RelatedArticles articles={relatedArticles} />
      <RelatedVideos relatedVideos={relatedVideos} />
      <RelatedStories relatedStories={relatedStories} />
      <RelatedTools relatedServices={relatedTools} />
    </Layout>
  );
};

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

export const pageQuery = graphql`
  query ArticleQuery($permalink: String!) {
    allWebMentionEntry(filter: { wmTarget: { eq: $permalink } }) {
      edges {
        node {
          wmTarget
          wmSource
          wmProperty
          wmId
          type
          url
          likeOf
          author {
            url
            type
            photo
            name
          }
          content {
            text
          }
        }
      }
    }
  }
`;
