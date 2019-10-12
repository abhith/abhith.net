import Layout from "@components/Layout";
import MDXRenderer from "@components/MDX";
import SEO from "@components/seo/SEO";
import TopicsBar from "@components/TopicsBar";
import { OutboundLink } from "gatsby-plugin-google-analytics";

import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  PocketShareButton,
  PocketIcon
} from "react-share";
import { IArticle } from "@types";
import { FaCoffee } from "react-icons/fa";

import ArticleHero from "../sections/article/Article.Hero";

const siteQuery = graphql`
  {
    site {
      siteMetadata {
        siteUrl
        social {
          twitter
        }
        author {
          name
          minibio
          url
          image
        }
      }
    }
  }
`;

export default ({ pageContext, location }) => {
  console.log(pageContext);

  const { article }: { article: IArticle } = pageContext;
  const results = useStaticQuery(siteQuery);
  console.log(results);
  const githubURL = `https://github.com/Abhith/abhith.net/blob/master/src/pages${article.slug.substring(
    0,
    article.slug.length - 1
  )}.md`;
  // const commentId =
  //   post.frontmatter.commentId === null
  //     ? post.fields.slug
  //     : post.frontmatter.commentId;

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
          <div className="container is-fluid">
            <div className="columns is-centered">
              <div className="column is-2 pr-4 mb-4">
                {/* TODO: separate as a section */}
                <div className="sticky has-text-centered">
                  <div className="text-muted">Share this</div>
                  <div className="buttons is-centered">
                    <FacebookShareButton
                      url={location.href}
                      quote={article.title}
                      className="button is-medium is-white"
                    >
                      <FacebookIcon size={44} round />
                    </FacebookShareButton>

                    <TwitterShareButton
                      url={location.href}
                      className="button is-medium is-white"
                      title={article.title}
                      via={results.site.siteMetadata.social.twitter
                        .split("@")
                        .join("")}
                      hashtags={article.tags}
                    >
                      <TwitterIcon size={44} round></TwitterIcon>
                    </TwitterShareButton>
                    <LinkedinShareButton
                      url={location.href}
                      className="button is-medium is-white"
                      title={article.title}
                    >
                      <LinkedinIcon size={44} round></LinkedinIcon>
                    </LinkedinShareButton>
                    <RedditShareButton
                      url={location.href}
                      className="button is-medium is-white"
                      title={article.title}
                    >
                      <RedditIcon size={44} round></RedditIcon>
                    </RedditShareButton>
                    <PocketShareButton
                      url={location.href}
                      className="button is-medium is-white"
                      title={article.title}
                    >
                      <PocketIcon size={44} round></PocketIcon>
                    </PocketShareButton>
                    <WhatsappShareButton
                      url={location.href}
                      className="button is-medium is-white"
                      title={article.title}
                    >
                      <WhatsappIcon size={44} round></WhatsappIcon>
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
              <div className="column is-8">
                <MDXRenderer content={article.body}>
                  <TopicsBar topics={article.tags} />
                  <div id="typo" className="bd-typo">
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
                  <div className="container mt-5">
                    <div className="media">
                      <figure className="media-left">
                        <p className="image is-96x96">
                          <img
                            className="is-rounded"
                            src={`https://www.abhith.net/img/abhith-avatar.jpg`}
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
                              <OutboundLink
                                target="_blank"
                                className="button is-success is-outlined is-small is-rounded ml-1"
                                href={`https://twitter.com/abhithrajan`}
                              >
                                Follow
                              </OutboundLink>
                            </span>
                            <span>
                              <OutboundLink
                                className="button is-info is-outlined is-small is-rounded ml-1"
                                href="https://ko-fi.com/abhith"
                                target="_blank"
                              >
                                Buy me a coffee{" "}
                                <FaCoffee className="text-danger" />
                              </OutboundLink>
                            </span>
                            <br />
                            {`
        Abhith Rajan is an aspiring software engineer with more than 6 years of experience and proven successful track record of delivering technology-based products and services.
      `}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </MDXRenderer>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
