import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Hoverable from "@components/hoverable";
const SnippetRoll = (props) => {
  const { snippets } = props;

  return (
    <>
      {snippets &&
        snippets.map((snippet) => (
          <Hoverable className="box" key={snippet.id}>
            <div className="columns">
              <div className="column">
                <small>{snippet.topics[0]}</small>
                <Link to={snippet.slug} className="has-text-dark">
                  <h4 className="title is-4">{snippet.title} </h4>
                  <div className="subtitle">{snippet.excerpt}</div>
                </Link>

                {/* <TopicsBar topics={snippet.tags} /> */}
              </div>
            </div>
          </Hoverable>
        ))}
    </>
  );
};
SnippetRoll.propTypes = {
  snippets: PropTypes.array.isRequired,
};

export default SnippetRoll;
