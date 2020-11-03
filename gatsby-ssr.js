import React from "react";

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  const pluginOptions = {
    googleAdClientId: `ca-pub-5964640183793435`,
    head: true,
  };

  if (process.env.NODE_ENV !== `production`) {
    return null;
  }
  if (pluginOptions.googleAdClientId === undefined) {
    return null;
  }
  const setComponents = pluginOptions.head
    ? setHeadComponents
    : setPostBodyComponents;
  return setComponents([
    <script
      async
      type="text/javascript"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    />,
    <script
      key={`gatsby-plugin-google-adsense`}
      dangerouslySetInnerHTML={{
        __html: `
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "${pluginOptions.googleAdClientId}",
            enable_page_level_ads: true
        });
        `,
      }}
    />,
    <script
      async
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "3y06r37z6k");
      `,
      }}
    />,
  ]);
};
