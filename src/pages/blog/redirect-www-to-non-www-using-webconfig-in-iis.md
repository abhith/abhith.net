---
title: Redirect WWW to Non-WWW using Web.Config in IIS
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2017-09-19T00:00:00.000Z"
templateKey: blog-post
image: /img/web-config.png
description: >-
  Use IIS rewrite rule to redirect (301) all www requests to non-www.
tags:
  - iis
  - seo
  - web-config
  - rewrite-rule
  - aspnet
---

Code first, talks later.

```xml
<rewrite>
  <rules>
    <rule name="Redirect to non-www" stopProcessing="true">
      <match url="(.*)" negate="false"></match>
      <action type="Redirect" url="https://yourdomain.com/{R:1}"></action>
      <conditions>
        <add input="{HTTP_HOST}" pattern="^yourdomain\.com$" negate="true"></add>
      </conditions>
    </rule>
  </rules>
</rewrite>
```

Replace the "yourdomain" with your domain name and add it under the **system.webServer** section in the **Web.Config**, and that's it.

Some people prefer www domain and some non-www. I personally prefer www URLs. One important point to remember is never to allow both accessible at the same time. Read my article [REDIRECT NON-WWW URLS TO WWW URLS](https://www.abhith.net/post/redirect-non-www-urls-to-www-urls/) to know why. It will be better if you add the rule on the **Web.Release.config** with a slight modification. Read more about it on my article [INSERTING REWRITE RULE IN RELEASE CONFIG](https://www.abhith.net/post/inserting-rewrite-rule-in-release-config/).
