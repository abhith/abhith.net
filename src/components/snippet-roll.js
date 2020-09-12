import React from "react";
import PropTypes from "prop-types";
import SnippetRollItem from "@components/snippet-roll-item";
const SnippetRoll = (props) => {
  const { snippets } = props;

  return (
    <>
      {snippets &&
        snippets.map((snippet) => (
          <SnippetRollItem snippet={snippet} key={snippet.id}></SnippetRollItem>
        ))}
    </>
  );
};
SnippetRoll.propTypes = {
  snippets: PropTypes.array.isRequired,
};

export default SnippetRoll;
