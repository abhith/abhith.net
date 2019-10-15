---
templateKey: blog-post
title: Redirect non-www urls to www urls
description: >-
  When considering SEO, either you have to stick with www versioned url or
  non-www URLs. Having both accessible for a domain is a bad practice.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2017-08-12T06:32:00.000Z
image: /img/web-config.png
tags:
  - iis
  - seo
  - web-config
  - rewrite-rule
  - aspnet
---

When considering SEO, either you have to stick with www prefixed url or non-www urls. Having both accessible for a domain is a bad practice.

After I setup my website, when I checked google for my site status, it was like below,

![google search](/img/blog_redirect-non-www-urls-to-www-urls_search.png)

If you wonder why I searched like site:mydomain on google, this will list all the search results under the domain we specified.

See the highlighted section. If we search again to see the omitted results. We will see search result like this,

![search](/img/blog_redirect-non-www-urls-to-www-urls_www-error.png)

As you can see, both the url get indexed and one is omitted since it isn't relevant.

So what next,

You have to choose which pattern you gonna stick to. I initially thought to go with non-www but then read the article SETTING UP UMBRACO TO ALWAYS USE WWW LINKS and decided to go with www. 

And to redirect non-www to www version, I added the rewrite rule as mentioned in the article. My Code look like this,

```xml
<system.webServer>
    <rewrite>
      <rules>
        <clear />
        <rule name="Redirect Non WWW" stopProcessing="true" xdt:Transform="Insert">
          <match url=".*" />
          <conditions>
            <add input="{HTTP_HOST}" pattern="^(?!www)(.*)$" />
          </conditions>
          <action type="Redirect" redirectType="Permanent" url="https://www.{C:1}/{R:0}" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
```

 Noticed the xdt:Transform="Insert" in the line,

```xml
<rule name="Redirect Non WWW" stopProcessing="true" xdt:Transform="Insert">
```

That is because I added this rule in my Web.Release.config, Which will add the rule to the Web.config automatically during publishing. The reason for which is explained in one of my article [INSERTING REWRITE RULE IN RELEASE CONFIG](/blog/inserting-rewrite-rule-in-release-config).