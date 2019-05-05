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

<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:gray;">&lt;</span><span style="color:#569cd6;">rewrite</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">rules</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">rule</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">name</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">Redirect&nbsp;to&nbsp;non-www</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">stopProcessing</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">true</span><span style="color:gray;">&quot;</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">match</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">url</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">(.*)</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">negate</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">false</span><span style="color:gray;">&quot;</span><span style="color:gray;">&gt;&lt;/</span><span style="color:#569cd6;">match</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">action</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">type</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">Redirect</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">url</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">https://yourdomain.com/{R:1}</span><span style="color:gray;">&quot;</span><span style="color:gray;">&gt;&lt;/</span><span style="color:#569cd6;">action</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">conditions</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">add</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">input</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">{HTTP_HOST}</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">pattern</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">^yourdomain\.com$</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">negate</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">true</span><span style="color:gray;">&quot;</span><span style="color:gray;">&gt;&lt;/</span><span style="color:#569cd6;">add</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span><span style="color:#569cd6;">conditions</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span><span style="color:#569cd6;">rule</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span><span style="color:#569cd6;">rules</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span><span style="color:#569cd6;">rewrite</span><span style="color:gray;">&gt;</span></pre>

Replace the "yourdomain" with your domain name and add it under the **system.webServer** section in the **Web.Config**, and that's it.

Some people prefer www domain and some non-www. I personally prefer www URLs. One important point to remember is never to allow both accessible at the same time. Read my article [REDIRECT NON-WWW URLS TO WWW URLS](https://www.abhith.net/post/redirect-non-www-urls-to-www-urls/) to know why. It will be better if you add the rule on the **Web.Release.config** with a slight modification. Read more about it on my article [INSERTING REWRITE RULE IN RELEASE CONFIG](https://www.abhith.net/post/inserting-rewrite-rule-in-release-config/).
