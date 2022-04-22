import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const StrongTextCSS = (p) => css`
  color: ${p.theme.colors.strongText} !important;
`;
const ArticleWrittenBySubtitle = styled.span`
  ${StrongTextCSS}
`;

const ArticleWrittenByText = styled.strong`
  ${StrongTextCSS}
`;

const RoundedImage = styled(GatsbyImage)`
  border-radius: 50%;
`;

const Authors = ({ authors }) => {
  if (authors && authors.length === 1) {
    return (
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
                <ArticleWrittenBySubtitle className="subtitle mr-1">
                  Written by
                </ArticleWrittenBySubtitle>
                <ArticleWrittenByText className="title is-4">
                  {authors[0].name}
                </ArticleWrittenByText>{" "}
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
                  to="/contact/"
                  className="mt-2 button k-button k-secondary raised has-gradient rounded"
                >
                  Connect
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Authors;
