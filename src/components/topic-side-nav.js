import { Link } from "gatsby";
import React from "react";

function TopicSideNav({ topics, activeTopic }) {
  return (
    <div className="menu ar-topic-menu">
      <p className="menu-label"> Filter by topic </p>
      <ul className="menu-list">
        <li>
          <Link to={`/topics`}>All</Link>
        </li>
        {topics.map(topic => (
          <li key={topic.slug}>
            <Link
              className={topic.slug === activeTopic ? "is-active" : ""}
              to={`/topics/${topic.slug}/`}
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TopicSideNav;
