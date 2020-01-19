import { IArticle } from "@types";
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

import React from "react";

interface IArticleShareProps {
  article: IArticle;
  location: any;
}
const ArticleShare = ({ article, location }: IArticleShareProps) => {
  return (
    <div className="sticky has-text-centered">
      <div className="text-muted">Share this</div>
      <div className="buttons is-centered article-share">
        <FacebookShareButton
          url={location.href}
          quote={article.title}
          className="button"
        >
          <FacebookIcon size={48} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={location.href}
          className="button"
          title={article.title}
          //   TODO: make dynamic
          via="AbhithRajan"
          hashtags={article.tags}
        >
          <TwitterIcon size={48} round />
        </TwitterShareButton>
        <LinkedinShareButton
          url={location.href}
          className="button"
          title={article.title}
        >
          <LinkedinIcon size={48} round />
        </LinkedinShareButton>
        <RedditShareButton
          url={location.href}
          className="button"
          title={article.title}
        >
          <RedditIcon size={48} round />
        </RedditShareButton>
        <PocketShareButton
          url={location.href}
          className="button"
          title={article.title}
        >
          <PocketIcon size={48} round />
        </PocketShareButton>
        <WhatsappShareButton
          url={location.href}
          className="button"
          title={article.title}
        >
          <WhatsappIcon size={48} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ArticleShare;
