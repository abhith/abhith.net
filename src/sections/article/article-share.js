import {
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  PocketShareButton,
  PocketIcon
} from "react-share";

import React from "react";

const ArticleShare = ({ article, location }) => {
  return (
    <div className="has-text-centered">
      <div className="text-muted">Share this</div>
      <div className="buttons is-centered">
        <TwitterShareButton
          url={location.href}
          className="button"
          title={article.title}
          //   TODO: make dynamic
          via="AbhithRajan"
          hashtags={article.tags}
        >
          <TwitterIcon size={48} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton
          url={location.href}
          className="button"
          title={article.title}
        >
          <LinkedinIcon size={48} round={true} />
        </LinkedinShareButton>
        <RedditShareButton
          url={location.href}
          className="button"
          title={article.title}
        >
          <RedditIcon size={48} round={true} />
        </RedditShareButton>
        <PocketShareButton
          url={location.href}
          className="button"
          title={article.title}
        >
          <PocketIcon size={48} round={true} />
        </PocketShareButton>
        <EmailShareButton
          url={location.href}
          subject={article.title}
          body={article.excerpt}
          separator={`\n`}
          className="button"
        >
          <EmailIcon size={48} round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ArticleShare;
