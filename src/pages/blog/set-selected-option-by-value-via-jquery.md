---
title: Set selected option by value via jQuery
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2017-08-19T00:00:00.000Z"
templateKey: blog-post
image: /img/js-jquery-html-css.jpg
description: >-
  This article describes how to set the selected option in a select by its value via jQuery.
commentId: "1737badb-b0ea-4079-a6b2-72d2299e65c2"
tags:
  - javascript
  - jquery
---

In one of my projects, there is a search page which has few filters including linked selects, i.e the options displayed in a child select is dependent upon the option selected in another (parent). (like when we choose a country (parent), we have to show the states under the selected country in the child.)

After selecting both select, when we submit the search, it loads search result page with same filters above. The problem is that the child select value is not retained. Since when we assign the parent select selected value, it will trigger an ajax call and its response is bound to the child select.

To retain the filters as users selected, we had to set the selected value in the child select also. My child select is (Razor)

```cs
@Html.DropDownList("childSelectName", items, new { @name = "someName" })
```

And inside my ajax call on parent select on change, after binding all the available option to the child select,

```js
if (selectedChildItemId) {
  $("#childSelectName").val(selectedChildItemId);
}
```

In short,

```js
$("#Controls_ID").val(value);
```

Replace the <em>Controls_ID</em> with your select tag Id and <em>value</em> with the selected item value.
