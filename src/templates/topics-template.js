import Layout from "@components/layout";
import PageHero from "@components/page-hero";
import SEO from "@components/seo/seo";
import TopicImage from "@components/topic-image";
import { Link } from "gatsby";
import React from "react";
// tslint:disable-next-line: no-submodule-imports
import { FiBookOpen, FiFileText, FiGlobe, FiVideo } from "react-icons/fi";

function TopicsPage({ pageContext }) {
  const { topics } = pageContext;

  return (
    <Layout>
      <SEO
        title="Topics"
        description={`Summary of all the ${topics.length} topics in abhith.net`}
        slug="/topics"
      />
      <PageHero
        title={`All Topics`}
        subtitle={`Summary of all the ${topics.length} topics in abhith.net`}
        className={`position-relative page-hero`}
      />
      <section className="section">
        <div className="container is-fluid" id="topics-block">
          <div className="columns is-centered">
            <div className="column is-9">
              <div className="columns is-centered is-multiline">
                {topics.map(topic => (
                  <div
                    className="column is-full-mobile
                    is-half-tablet
                    is-half-desktop
                    is-one-third-widescreen
                    is-one-quarter-fullhd"
                    key={topic.slug}
                  >
                    <div className="block">
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
                            >
                              <span className="icon is-small">
                                <FiFileText />
                              </span>
                              <span>{topic.totalPosts}</span>
                            </Link>
                          )}
                          {topic.totalVideos > 0 && (
                            <Link
                              className="button is-primary is-outlined"
                              to={`/topics/${topic.slug}/videos/`}
                            >
                              <span className="icon is-small">
                                <FiVideo />
                              </span>
                              <span>{topic.totalVideos}</span>
                            </Link>
                          )}
                          {topic.totalStories > 0 && (
                            <Link
                              className="button is-link is-outlined"
                              to={`/topics/${topic.slug}/stories/`}
                            >
                              <span className="icon is-small">
                                <FiBookOpen />
                              </span>
                              <span>{topic.totalStories}</span>
                            </Link>
                          )}
                          {topic.totalServices > 0 && (
                            <Link
                              className="button is-success is-outlined"
                              to={`/topics/${topic.slug}/tools/`}
                            >
                              <span className="icon is-small">
                                <FiGlobe />
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
                    </div>
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
