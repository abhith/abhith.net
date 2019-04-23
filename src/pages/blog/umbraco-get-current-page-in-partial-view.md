---
templateKey: blog-post
title: Umbraco Get Current Page in Partial View
description: >-
  This article describes how to get the CurrentPage of Umbraco in a partial
  view.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2017-08-18T10:02:00.000Z
image: /img/umbraco.png
tags:
  - umbraco
  - cms
---
In my website, the header section is a partial view which basically contains the header menus. The menus initially were same for all the pages across my site but I thought to hide some menu in case the current page is not the homepage.

To do that, I needed to get the current page and check whether the current page is the homepage or not, in the header partial.

To get the current page in partial view,

<pre style="font-family: Fantasque Sans Mono; font-size: 13; color: gainsboro; background: #1e1e1e;"><span style="color: black; background: #ffffb3;">@inherits </span><span style="color: lightblue;">UmbracoTemplatePage</span>
 
<span style="color: black; background: #ffffb3;">@{</span>
    <span style="color: #569cd6;">var</span> currentPage <span style="color: #b4b4b4;">=</span> <span style="color: violet;">Umbraco</span><span style="color: #b4b4b4;">.</span><span style="color: cyan;">Content</span>(<span style="color: lightblue;">umbraco</span><span style="color: #b4b4b4;">.</span><span style="color: lightblue;">NodeFactory</span><span style="color: #b4b4b4;">.</span><span style="color: lightblue;">Node</span><span style="color: #b4b4b4;">.</span><span style="color: cyan;">GetCurrent</span>()<span style="color: #b4b4b4;">.</span><span style="color: violet;">Id</span>);
<span style="color: black; background: #ffffb3;">}</span></pre>

And to check whether it is home page or not, I decided to compare against DocumentTypeAlias as shown below,

<pre style="font-family: Fantasque Sans Mono; font-size: 13; color: gainsboro; background: #1e1e1e;"><span style="color: black; background: #ffffb3;">@</span><span style="color: #569cd6;">if</span> (currentPage<span style="color: #b4b4b4;">.</span><span style="color: lightgray;">DocumentTypeAlias</span> <span style="color: lightgray;">==</span> <span style="color: #d69d85;">"home"</span>)
{<br />     <span style="color: #57a64a;">// some code</span></pre>

And it works.
