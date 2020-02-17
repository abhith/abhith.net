import React from "react";

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href^="#"]');
}
// depth and maxDepth are used to figure out how many bullets deep to render in the ToC sidebar, if no
// max depth is set via the tableOfContentsDepth field in the frontmatter, all headings will be rendered
function createItems(items, location, depth) {
  return (
    items &&
    items.map((item, index) => (
      <li key={location.pathname + (item.url || depth + `-` + index)}>
        {item.url && <a href={item.url}>{item.title}</a>}
        {item.items && (
          <ul className="ml-3 mt-2">
            {createItems(item.items, location, depth + 1)}
          </ul>
        )}
      </li>
    ))
  );
}

export default ({ page, location }) => {
  return (
    <nav id="anchors" className="ar-anchors is-active">
      <p className="ar-anchors-title">On this page</p>
      <ul className="ar-anchors-list">
        {createItems(page.tableOfContents.items, location, 1)}
        <li>
          <a href="#ar-comments">Comments</a>
        </li>
        <li className="mt-1">
          <a href="#ar-navbar">Back to top</a>
        </li>
      </ul>
    </nav>
  );
};
