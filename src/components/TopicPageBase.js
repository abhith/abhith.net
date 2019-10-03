import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Layout from "./Layout";
import SEO from "./seo/SEO";

import PageHero from "./PageHero";
import TopicsSideNav from "./TopicSideNav";

const TopicPageBase = ({
  activeTab,
  slug,
  title,
  totalPostCount,
  totalVideoCount,
  totalServiceCount,
  totalStoriesCount,
  children
}) => {
  let summary = [];

  let pageTitle;
  let pageSubtitle;

  if (activeTab === "videos") {
    pageTitle = `Recommended videos about ${title}`;
    pageSubtitle = `Watch the ${totalVideoCount} video${
      totalVideoCount === 1 ? "" : "s"
    } on topic ${title}`;
  } else if (totalVideoCount > 0) {
    summary.push(`${totalVideoCount} video${totalVideoCount === 1 ? "" : "s"}`);
  }

  if (activeTab === "stories") {
    pageTitle = `Recommended stories about ${title}`;
    pageSubtitle = `Find the ${totalStoriesCount} interesting developer stor${
      totalStoriesCount === 1 ? "y" : "ies"
    } on topic ${title}`;
  } else if (totalStoriesCount > 0) {
    summary.push(
      `${totalStoriesCount} developer stor${
        totalStoriesCount === 1 ? "y" : "ies"
      }`
    );
  }

  if (activeTab === "tools") {
    pageTitle = `Recommended tools and services for ${title}`;
    pageSubtitle = `Check the ${totalServiceCount} useful tool${
      totalServiceCount === 1 ? "" : "s"
    } on topic ${title}`;
  } else if (totalServiceCount > 0) {
    summary.push(
      `${totalServiceCount} tool${totalServiceCount === 1 ? "" : "s"}`
    );
  }

  if (activeTab === "posts") {
    if (totalPostCount > 0) {
      summary.push(`${totalPostCount} post${totalPostCount === 1 ? "" : "s"}`);
    }

    let tagHeader;
    if (summary.length === 1) {
      tagHeader = `${summary[0]} tagged with “${title}”`;
    } else {
      tagHeader = `${summary
        .join(", ")
        .replace(/, ([^,]*)$/, " and $1")} tagged with “${title}”`;
    }

    pageTitle = title;
    pageSubtitle = tagHeader;
  }

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={pageSubtitle}
        slug={`\\topics\\${slug}`}
      />
      <PageHero title={title} subtitle={pageSubtitle}></PageHero>

      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-3 is-2-widescreen is-hidden-mobile">
              <TopicsSideNav slug={slug}></TopicsSideNav>
            </div>
            <div className="column is-9 is-10-widescreen">
              <div className="tabs">
                <ul>
                  {totalPostCount > 0 && (
                    <li className={activeTab === "posts" ? "is-active" : ""}>
                      <Link to={`/topics/${slug}/`}>
                        <div className="has-numbers">
                          Posts <span className="tag">{totalPostCount}</span>{" "}
                        </div>
                      </Link>
                    </li>
                  )}
                  {totalStoriesCount > 0 && (
                    <li className={activeTab === "stories" ? "is-active" : ""}>
                      <Link to={`/topics/${slug}/stories/`}>
                        <div className="has-numbers">
                          Stories{" "}
                          <span className="tag">{totalStoriesCount}</span>{" "}
                        </div>
                      </Link>
                    </li>
                  )}
                  {totalVideoCount > 0 && (
                    <li className={activeTab === "videos" ? "is-active" : ""}>
                      <Link to={`/topics/${slug}/videos/`}>
                        <div className="has-numbers">
                          Videos <span className="tag">{totalVideoCount}</span>{" "}
                        </div>
                      </Link>
                    </li>
                  )}
                  {totalServiceCount > 0 && (
                    <li className={activeTab === "tools" ? "is-active" : ""}>
                      <Link to={`/topics/${slug}/tools/`}>
                        <div className="has-numbers">
                          Tools <span className="tag">{totalServiceCount}</span>{" "}
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

TopicPageBase.propTypes = {
  activeTab: PropTypes.oneOf(["posts", "stories", "videos", "tools"])
};

export default TopicPageBase;
