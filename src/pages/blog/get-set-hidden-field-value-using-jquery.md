---
title: Get/Set hidden field value using jQuery
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2017-10-01T00:00:00.000Z"
templateKey: blog-post
image: /img/js-jquery-html-css.jpg
description: >-
  This article explains how to set and get hidden field value using jQuery.
commentId: "1354e7e4-bbca-481c-ac69-2fab4ff2bbd8"
tags:
  - javascript
  - jquery
  - aspnet-web-forms
---

When we can achieve the same thing using many ways, with different frameworks, we tend to forget one or two such ways. Same thing happened to me. The task is simple, to set and get hidden field value in client side in a SharePoint project.

Like I mentioned, it can be done easily using jQuery,

### SET

```js
$("#hiddenFieldControlId").val(valueToBeAssigned);
```

### GET

```js
var hiddenFieldValue = $("#hiddenFieldControlId").val();
```

That's it. Replace the **hiddenFieldControlId** with the **id** attribute value of your hidden field and make sure **jQuery** referenced in the page.
