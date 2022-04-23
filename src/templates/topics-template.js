import Layout from "@components/layout";
import PageHero from "@components/page-hero";
import Seo from "@components/seo/seo";
import TopicImage from "@components/topic-image";
import { Link } from "gatsby";
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  FcReading,
  FcPuzzle,
  FcVideoCall,
  FcReadingEbook,
  FcSupport,
} from "react-icons/fc";

const BoxCss = (p) => css`
  .inner-block {
    background-color: ${p.theme.colors.background};
    border: 1px solid ${p.theme.colors.border};
  }
  .inner-block .guide {
    background-color: ${p.theme.colors.guideBackground};
  }
  .title {
    color: ${p.theme.colors.articleText} !important;
  }
`;

const StyledDiv = styled("div")`
  ${BoxCss}
`;
function TopicsPage({ pageContext }) {
  const { topics } = pageContext;

  return (
    <Layout>
      <Seo
        title="Topics"
        description={`Summary of all the ${topics.length} topics in abhith.net`}
        slug="/topics/"
      />
      <PageHero
        title={`All Topics`}
        subtitle={`Summary of all the ${topics.length} topics in abhith.net`}
        className={`position-relative page-hero`}
      />
      <section className="section">
        <div className="container" id="topics-block">
          <div className="columns is-centered">
            <div className="column">
              <div className="columns is-centered is-multiline">
                {topics.map((topic) => (
                  <div
                    className="column is-full-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
                    key={topic.slug}
                  >
                    <StyledDiv className="block">
                      <div className="inner-block position-relative">
                        <div className="media-left">
                          <figure className="image is-64x64">
                            <TopicImage slug={topic.slug} />
                          </figure>
                        </div>
                        <h2 className="title is-4">{topic.title}</h2>
                        <div className="buttons has-addons">
                          {topic.totalPosts > 0 && (
                            <Link
                              className="button is-outlined"
                              to={`/topics/${topic.slug}/`}
                              title={`Articles on topic ${topic.title}`}
                            >
                              <span className="icon">
                                <FcReading />
                              </span>
                              <span>{topic.totalPosts}</span>
                            </Link>
                          )}
                          {topic.totalSnippets > 0 && (
                            <Link
                              className="button is-outlined"
                              to={`/snippets/${topic.slug}/`}
                              title={`Snippets on topic ${topic.title}`}
                            >
                              <span className="icon">
                                <FcPuzzle />
                              </span>
                              <span>{topic.totalSnippets}</span>
                            </Link>
                          )}
                          {topic.totalVideos > 0 && (
                            <Link
                              className="button is-outlined"
                              to={`/topics/${topic.slug}/videos/`}
                              title={`Recommended videos on topic ${topic.title}`}
                            >
                              <span className="icon">
                                <FcVideoCall />
                              </span>
                              <span>{topic.totalVideos}</span>
                            </Link>
                          )}
                          {topic.totalStories > 0 && (
                            <Link
                              className="button is-outlined"
                              to={`/topics/${topic.slug}/stories/`}
                              title={`Recommended developer stories on topic ${topic.title}`}
                            >
                              <span className="icon">
                                <FcReadingEbook />
                              </span>
                              <span>{topic.totalStories}</span>
                            </Link>
                          )}
                          {topic.totalServices > 0 && (
                            <Link
                              className="button is-outlined"
                              to={`/topics/${topic.slug}/tools/`}
                              title={`Tools & services on topic ${topic.title}`}
                            >
                              <span className="icon">
                                <FcSupport />
                              </span>
                              <span>{topic.totalServices}</span>
                            </Link>
                          )}
                        </div>
                        <p className="position-absolute guide">
                          <Link
                            className="is-bold"
                            to={`/topics/${topic.slug}/`}
                          >
                            View details{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="#007bff"
                              style={{ verticalAlign: "middle" }}
                            >
                              <path fill="none" d="M0 0h24v24H0V0z"></path>
                              <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z"></path>
                            </svg>
                          </Link>
                        </p>
                      </div>
                    </StyledDiv>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default TopicsPage;
