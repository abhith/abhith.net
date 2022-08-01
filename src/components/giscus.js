import React, { useEffect } from "react";
import { useColorMode } from "theme-ui";
import HorizontalRule from "@components/horizontal-rule";

const src = "https://giscus.app/client.js";

const Giscus = () => {
  const [colorMode] = useColorMode();
  const rootElm = React.createRef();

  useEffect(() => {
    const giscus = document.createElement("script");
    const giscusConfig = {
      src,
      "data-repo": "abhith/abhith.net",
      "data-repo-id": "MDEwOlJlcG9zaXRvcnkxMDE4OTk5NDk=",
      "data-category": "Comments",
      "data-category-id": "DIC_kwDOBhLerc4CQjyF",
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "bottom",
      "data-theme": colorMode === "light" ? "light" : "dark",
      "data-lang": "en",
      "data-loading": "lazy",
      crossorigin: "anonymous",
      async: true,
    };

    Object.keys(giscusConfig).forEach((configKey) => {
      giscus.setAttribute(configKey, giscusConfig[configKey]);
    });
    rootElm.current.appendChild(giscus);
  }, [colorMode]);

  return (
    <>
      <HorizontalRule />
      <div id="ar-comments" className="giscus-comments" ref={rootElm} />
    </>
  );
};

export default Giscus;
