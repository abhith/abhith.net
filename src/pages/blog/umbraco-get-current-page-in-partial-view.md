---
templateKey: blog-post
title: Umbraco Get Current Page in Partial View
description: >-
  This article describes how to get the CurrentPage of Umbraco in a partial
  view.
author: Abhith Rajan
authorURL: "https://twitter.com/abhithrajan"
date: 2017-08-18T10:02:00.000Z
image: /img/umbraco.png
tags:
  - umbraco
  - cms
---

In my website, the header section is a partial view which basically contains the header menus. The menus initially were same for all the pages across my site but I thought to hide some menu in case the current page is not the homepage.

To do that, I needed to get the current page and check whether the current page is the homepage or not, in the header partial.

To get the current page in partial view,

```cs
@inherits UmbracoTemplatePage

@{
    var currentPage = Umbraco.Content(umbraco.NodeFactory.Node.GetCurrent().Id);
}
```

And to check whether it is home page or not, I decided to compare against DocumentTypeAlias as shown below,

```cs
@if (currentPage.DocumentTypeAlias == "home")
{
     // some code
```

And it works.
