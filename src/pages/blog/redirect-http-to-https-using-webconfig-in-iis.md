---
title: Redirect HTTP to HTTPS using Web.Config in IIS
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2017-09-25T00:00:00.000Z"
templateKey: blog-post
image: /img/web-config.png
description: >-
  Use IIS Rewrite rule to redirect all HTTP request to HTTPS.
tags:
  - iis
  - seo
  - web-config
  - rewrite-rule
  - aspnet
---

No Stories, just add the below rewrite rule in your **Web.Config** under **system.webServer** section so that **IIS** will take care the redirection of HTTP requests to HTTPS.
Since we are about to add a rewrite rule in the IIS,

> Before adding the rewrite rule, make sure that you installed the **URL Rewrite** module in the IIS.

```xml
<rewrite>
  <rules>
    <rule name="httpsredirect" stopProcessing="true">
      <match url="(.*)" />
      <conditions>
        <add input="{HTTPS}" pattern="off" ignoreCase="true" />
      </conditions>
      <action type="Redirect" redirectType="Permanent" url="https://yourdomain.com/{R:1}" />
    </rule>
  </rules>
</rewrite>
```

Replace the **yourdomain.com** with the actual domain name and you are good to go.
