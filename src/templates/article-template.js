/** @jsx jsx */
import { jsx } from "theme-ui";

import { Link, graphql } from "gatsby";
import GitHubStar from "@components/github-star";
import Layout from "@components/layout";
import MDXRenderer from "@components/mdx";
import Seo from "@components/seo/seo";
import TableOfContents from "@components/table-of-contents";
import TopicsBar from "@components/topics-bar";
import Giscus from "@components/giscus";
import Webmentions from "@components/webmentions";
import Authors from "@components/authors";
import BreadcrumbActive from "@components/breadcrumb-active";
import ArticleHero from "../sections/article/article-hero";
import RelatedArticles from "../sections/article/article-related-articles";
import RelatedStories from "../sections/article/article-related-stories";
import RelatedTools from "../sections/article/article-related-tools";
import RelatedVideos from "../sections/article/article-related-videos";
import ArticleShare from "../sections/article/article-share";
import ArticleRelatedSnippets from "../sections/article/article-related-snippets";
import GitHubTypo from "@components/github-typo";
import AskFeedback from "@components/ask-feedback";

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
  const githubURL = `https://github.com/abhith/abhith.net/blob/master/content${article.slug.substring(
    0,
    article.slug.length - 1
  )}.mdx`;

  return (
    <Layout>
      <Seo
        title={article.title}
        description={article.excerpt}
        image={article.hero.seo}
        isBlogPost={true}
        slug={article.slug}
        dateModified={article.dateModifiedSeoFormat}
        datePublished={article.datePublishedSeoFormat}
      />
      <div className="h-entry">
        <ArticleHero article={article} authors={authors} />
        <div className="ar-main">
          <div
            className="ar-side-background"
            sx={{
              backgroundColor: "sideBackground",
            }}
          />
          <div className="ar-main-container container">
            <div className="ar-duo">
              <div
                className="ar-lead"
                sx={{
                  backgroundColor: "background",
                }}
              >
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
                        <BreadcrumbActive>
                          <a
                            className="u-url"
                            href={"https://www.abhith.net" + article.slug}
                            sx={{
                              color: "strongText",
                            }}
                          >
                            {article.title}
                          </a>
                        </BreadcrumbActive>
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
                <GitHubTypo githubURL={githubURL}></GitHubTypo>
                <Giscus />
                <Authors authors={authors} />
                <Webmentions {...allWebMentionEntry} />
                <AskFeedback />
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
