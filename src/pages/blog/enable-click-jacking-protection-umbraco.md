---
templateKey: blog-post
title: Enable Click-Jacking Protection - Umbraco
description: >-
  If your site is allowed to be IFRAMEd by another site and thus would be
  susceptible to click-jacking. This can be prevented by setting X-Frame-Options
  header or CSP. Setting X-Frame-Options explained in this article.
author: Abhith Rajan
authorURL: "https://twitter.com/abhithrajan"
date: 2018-04-07T07:21:00.000Z
image: /img/sandeep-swarnkar-235646-unsplash.jpg
tags:
  - umbraco
  - security
  - aspnet
---

Umbraco makes it easy to protect your site from clickjacking by providing an option to the user to turn on the protection in its backoffice. If you navigate to the **Developer** section of Umbraco backoffice, Where you can find **Health Check** tab, in which one of the section is "**Security**", Inside security, there is one section for **Click-Jacking Protection**. If you check the security group and you can see the warning related to **Click-Jacking**, and you can enable protection from there itself with the click of a button, which basically adds following to your **system.webServer** section in **web.config** ,

```xml
<httpProtocol>
  <customHeaders>
    <remove name="X-Powered-By" />
    <remove name="X-Frame-Options" />
    <add name="X-Frame-Options" value="sameorigin" />
  </customHeaders>
</httpProtocol>
```

Setting **X-Frame-Options** to **sameorigin** make the page can only be displayed in a frame on the **same origin** as the page itself. Also, we can set it to **DENY** if wanted but then we have to exclude umbraco path since umbraco backoffice have iframes.

Also, make sure you have updated web.config in your source code (version control) if you enabled clickjacking protection via backoffice. Otherwise on your next web deploy, the web.config on the host server will be overwritten with the source code version.

### Additional Resources

- [X-Frame-Options - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)
- [Clickjacking - OWASP](https://www.owasp.org/index.php/Clickjacking)
