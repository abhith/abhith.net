import React from "react";
import styled from "@emotion/styled";
import { Link, graphql } from "gatsby";
import GitHubStar from "@components/github-star";
import Layout from "@components/layout";
import MDXRenderer from "@components/mdx";
import Seo from "@components/seo/seo";
import TableOfContents from "@components/table-of-contents";
import TopicsBar from "@components/topics-bar";
import Utterances from "@components/utterances";
import Webmentions from "@components/webmentions";
import ArticleHero from "../sections/article/article-hero";
import RelatedArticles from "../sections/article/article-related-articles";
import RelatedStories from "../sections/article/article-related-stories";
import RelatedTools from "../sections/article/article-related-tools";
import RelatedVideos from "../sections/article/article-related-videos";
import ArticleShare from "../sections/article/article-share";
import ArticleRelatedSnippets from "../sections/article/article-related-snippets";
import GitHubTypo from "@components/github-typo";
import AskFeedback from "@components/ask-feedback";
import { GatsbyImage } from "gatsby-plugin-image"


const ArticlePage = ({ pageContext, data, location }) => {
  const { allWebMentionEntry } = data;
  const {
    article,
    authors,
    relatedArticles,
    relatedStories,
    relatedVideos,
    relatedTools,
    relatedSnippets,
    next,
    previous,
  } = pageContext;
  const githubURL = `https://github.com/Abhith/abhith.net/blob/master/content${article.slug.substring(
    0,
    article.slug.length - 1
  )}.mdx`;

  return (
    <Layout>
      <Seo
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
                  <div className="container mt-6 mb-3">
                    <div className="media">
                      <figure className="media-left">
                        <p className="image is-128x128">
                          <RoundedImage
                            image={authors[0].avatar.medium}
                            width={128}
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
                <Webmentions {...allWebMentionEntry} />
                <AskFeedback />
                <GitHubTypo githubURL={githubURL}></GitHubTypo>
                <Utterances repo={`Abhith/abhith.net`} />
              </div>
              <aside className="ar-side">
                <div className="sticky">
                  <ArticleShare article={article} location={location} />
                  <GitHubStar />
                  <TableOfContents page={article} location={location} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <ArticleRelatedSnippets snippets={relatedSnippets} />
      <RelatedArticles articles={relatedArticles} />
      <RelatedVideos relatedVideos={relatedVideos} />
      <RelatedStories relatedStories={relatedStories} />
      <RelatedTools relatedServices={relatedTools} />
    </Layout>
  );
};

const RoundedImage = styled(GatsbyImage)`
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

export default ArticlePage;