import React from "react";
import styled from "@emotion/styled";
import { Link, graphql } from "gatsby";
import GitHubButton from "react-github-btn";

import Layout from "@components/layout";
import LiveEdit from "@components/live-edit";
import MDXRenderer from "@components/mdx";
import SEO from "@components/seo/seo";
import TopicsBar from "@components/topics-bar";
import Utterances from "@components/utterances";
import Image from "@components/image";
import Webmentions from "@components/webmentions";

import SnippetHero from "../sections/snippet/snippet-hero";
import RelatedArticles from "../sections/article/article-related-articles";
import RelatedStories from "../sections/article/article-related-stories";
import RelatedTools from "../sections/article/article-related-tools";
import RelatedVideos from "../sections/article/article-related-videos";
import GitHubTypo from "../sections/common/github-typo";

export default ({ pageContext, data, location }) => {
  console.log(pageContext);
  const { allWebMentionEntry } = data;
  const {
    snippet,
    authors,
    relatedArticles,
    relatedStories,
    relatedVideos,
    relatedTools,
    next,
    previous,
    category,
  } = pageContext;

  const pageTitle = `${category.title} - ${snippet.title}`;

  const githubURL = `https://github.com/Abhith/abhith.net/blob/master/content${snippet.slug.substring(
    0,
    snippet.slug.length - 1
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
          <p>Please share your thought about this snippet </p>
        </>
      );
    }
    return (
      <div className="content">
        <h3>Was this snippet helpful?</h3>
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
        title={pageTitle}
        description={snippet.excerpt}
        isBlogPost={false}
        slug={snippet.slug}
        dateModified={snippet.dateModifiedSeoFormat}
        datePublished={snippet.datePublishedSeoFormat}
      />
      <div className="h-entry">
        <SnippetHero snippet={snippet} authors={authors} />
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
                        <Link to={`/snippets/`}>Snippets</Link>
                      </li>
                      <li>
                        <Link to={`/snippets/${category.slug}/`}>
                          {category.title}
                        </Link>
                      </li>
                      <li className="is-active">
                        <a
                          className="u-url"
                          href={"https://www.abhith.net" + snippet.slug}
                        >
                          {snippet.title}
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
                <MDXRenderer content={snippet.body}>
                  <TopicsBar topics={snippet.topics} />
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
                <GitHubTypo githubURL={githubURL}></GitHubTypo>
                <Webmentions {...allWebMentionEntry} />
                <Utterances repo={`Abhith/abhith.net`} />
              </div>
              <aside className="ar-side">
                <div className="sticky">
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
  query SnippetQuery($permalink: String!) {
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
