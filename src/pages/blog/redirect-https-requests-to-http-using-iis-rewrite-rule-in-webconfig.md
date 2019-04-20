---
title: Redirect HTTPS requests to HTTP using IIS Rewrite rule in Web.Config
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2017-09-28T00:00:00.000Z"
templateKey: blog-post
image: /img/web-config.png
description: Use the provided rewrite rule to redirect HTTPS requests to HTTP.
---

The below-given rewrite rule which redirects all the HTTPS request to its HTTP URL. Redirecting HTTPS to HTTP isn't recommended considering many factors. If you don't have SSL purchased for your website, there are some cool options, like **Cloudflare**, it has a free package where it adds security to your site as well as provides free SSL, will write about it in a separate post.

<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:gray;">&lt;</span><span style="color:#569cd6;">rewrite</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">rules</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">rule</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">name</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">Redirect&nbsp;to&nbsp;HTTP</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">stopProcessing</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">true</span><span style="color:gray;">&quot;</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">match</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">url</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">(.*)</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;/&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">conditions</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">add</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">input</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">{HTTPS}</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">pattern</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">^ON$</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;/&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span><span style="color:#569cd6;">conditions</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">action</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">type</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">Redirect</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">url</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">http://{HTTP_HOST}/{R:1}</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">redirectType</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">Permanent</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;/&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span><span style="color:#569cd6;">rule</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span><span style="color:#569cd6;">rules</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span><span style="color:#569cd6;">rewrite</span><span style="color:gray;">&gt;</span></pre>
