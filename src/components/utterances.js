import React, { useEffect } from "react";
import { useColorMode } from "theme-ui";

const src = "https://utteranc.es/client.js";
const branch = "master";

const Utterances = ({ repo }) => {
  const [colorMode] = useColorMode();

  const theme = colorMode === "light" ? "github-light" : "github-dark";

  const rootElm = React.createRef();

  useEffect(() => {
    const utterances = document.createElement("script");
    const utterancesConfig = {
      src,
      repo,
      branch,
      async: true,
      "issue-term": "pathname",
      label: "type:comment",
      crossorigin: "anonymous",
      theme,
    };

    Object.keys(utterancesConfig).forEach((configKey) => {
      utterances.setAttribute(configKey, utterancesConfig[configKey]);
    });
    rootElm.current.appendChild(utterances);
  }, []);

  return <div id="ar-comments" className="utterances" ref={rootElm} />;
};

export default Utterances;
