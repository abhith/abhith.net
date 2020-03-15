import Layout from "@components/layout";
import PageHero from "@components/page-hero";
import SEO from "@components/seo/seo";
import TopicsSideNav from "@components/topic-side-nav";
import { Link } from "gatsby";
import React from "react";

const TopicPageBase = ({ activeTab, topic, topics, children }) => {
  const summary = [];

  let pageTitle;
  let pageSubtitle;

  if (activeTab === "Videos") {
    pageTitle = `Recommended videos about ${topic.title}`;
    pageSubtitle = `Watch the ${topic.totalVideos} video${
      topic.totalVideos === 1 ? "" : "s"
    } on topic ${topic.title}`;
  } else if (topic.totalVideos > 0) {
    summary.push(
      `${topic.totalVideos} video${topic.totalVideos === 1 ? "" : "s"}`
    );
  }

  if (activeTab === "Stories") {
    pageTitle = `Recommended stories about ${topic.title}`;
    pageSubtitle = `Find the ${topic.totalStories} interesting developer stor${
      topic.totalStories === 1 ? "y" : "ies"
    } on topic ${topic.title}`;
  } else if (topic.totalStories > 0) {
    summary.push(
      `${topic.totalStories} developer stor${
        topic.totalStories === 1 ? "y" : "ies"
      }`
    );
  }

  if (activeTab === "Tools") {
    pageTitle = `Recommended tools and services for ${topic.title}`;
    pageSubtitle = `Check the ${topic.totalServices} useful tool${
      topic.totalServices === 1 ? "" : "s"
    } on topic ${topic.title}`;
  } else if (topic.totalServices > 0) {
    summary.push(
      `${topic.totalServices} tool${topic.totalServices === 1 ? "" : "s"}`
    );
  }

  if (activeTab === "Posts") {
    if (topic.totalPosts > 0) {
      summary.push(
        `${topic.totalPosts} post${topic.totalPosts === 1 ? "" : "s"}`
      );
    }

    let tagHeader;
    if (summary.length === 1) {
      tagHeader = `${summary[0]} tagged with “${topic.title}”`;
    } else {
      tagHeader = `${summary
        .join(", ")
        .replace(/, ([^,]*)$/, " and $1")} tagged with “${topic.title}”`;
    }

    pageTitle = topic.title;
    pageSubtitle = tagHeader;
  }

  const topicImage = topic.image ? `/img/topics/${topic.image}` : null;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={pageSubtitle}
        slug={`/topics/${topic.slug}`}
        image={topicImage}
      />
      <PageHero title={topic.title} subtitle={pageSubtitle} />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-3 is-2-widescreen is-hidden-mobile">
              <TopicsSideNav activeTopic={topic.slug} topics={topics} />
            </div>
            <div className="column is-9 is-10-widescreen">
              <div className="tabs">
                <ul>
                  {topic.totalPosts > 0 && (
                    <li className={activeTab === "Posts" ? "is-active" : ""}>
                      <Link to={`/topics/${topic.slug}/`}>
                        <div className="has-numbers">
                          Posts <span className="tag">{topic.totalPosts}</span>{" "}
                        </div>
                      </Link>
                    </li>
                  )}
                  {topic.totalStories > 0 && (
                    <li className={activeTab === "Stories" ? "is-active" : ""}>
                      <Link to={`/topics/${topic.slug}/stories/`}>
                        <div className="has-numbers">
                          Stories{" "}
                          <span className="tag">{topic.totalStories}</span>{" "}
                        </div>
                      </Link>
                    </li>
                  )}
                  {topic.totalVideos > 0 && (
                    <li className={activeTab === "Videos" ? "is-active" : ""}>
                      <Link to={`/topics/${topic.slug}/videos/`}>
                        <div className="has-numbers">
                          Videos{" "}
                          <span className="tag">{topic.totalVideos}</span>{" "}
                        </div>
                      </Link>
                    </li>
                  )}
                  {topic.totalServices > 0 && (
                    <li className={activeTab === "Tools" ? "is-active" : ""}>
                      <Link to={`/topics/${topic.slug}/tools/`}>
                        <div className="has-numbers">
                          Tools{" "}
                          <span className="tag">{topic.totalServices}</span>{" "}
                        </div>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              {children}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default TopicPageBase;
