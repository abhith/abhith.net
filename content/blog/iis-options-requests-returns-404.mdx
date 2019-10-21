---
templateKey: blog-post
title: IIS - OPTIONS Requests Returns 404
description: >-
  If OPTIONS preflight request getting 404 and URLScan enabled on your hosting
  machine, check out this article.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2018-04-19T19:29:00.000Z
image: /img/michael-mroczek-199379-unsplash.jpg
tags:
  - iis
  - aspnet
---
The best way to figure out what is happening is to check the IIS logs. That should be the first thing to do in a similar situation. If you notice something like "Rejected-By-UrlScan", you need to check the URLScan configurations located in 

> Windows drive (C: most probably) > Windows >  system32 > inetsrv > urlscan > UrlScan.ini

Open the above file in a text editor and look for **[AllowVerbs]**  section. If **OPTIONS** not specified in the **[AllowVerbs]** section along with others (GET, POST etc), add **OPTIONS**. To do that, you may need to open the file in a text editor with **administrative** privileges and save. That's it.

### Story Behind

Recently we installed URLScan on our front-end servers for one of SharePoint project in order to redirect 404 URL's to the relevant pages, to improve the SEO.  But after the deployment, another Web API project hosted in the same machines failed to serve OPTIONS request.

When checked the browser console errors, we thought of CORS issue and tried custom header appending etc in the web.config but nothing worked out, and later we find out the issue with URLScan. When we checked the URLScan configuration,  by default only GET, PUT and POST are included in the [AllowVerbs] section. So our OPTIONS request where not even reached our website and being rejected by the URLScan module. Once we added OPTIONS in the [AllowVerbs] section, everything resumes working fine.

#### Additional Resources

- [Rejected-By-UrlScan 404 Errors](http://www.pressthered.com/rejected-by-urlscan_404_errors/)
