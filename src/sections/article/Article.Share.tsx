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
}
const ArticleShare = ({ article }: IArticleShareProps) => {
  return (
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
          //   TODO: make dynamic
          via="AbhithRajan"
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
  );
};

export default ArticleShare;
