---
title: JavaScript - Determine if user is on mobile device
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2017-10-25T00:00:00.000Z"
templateKey: blog-post
image: /img/js-jquery-html-css.jpg
description: >-
  You can use navigator.userAgent value to determine if the user is on a mobile device.
tags:
  - javascript
---

In the responsive design era, you may want to do some extra operations if the user is on mobile, like something I mentioned in my last [post][1] where my colleague wanted to remove some specific classes if the user is on mobile.

To do that, you can check the **navigator.userAgent** value. And with the help of **regex** you can do,

```js
var isMobile = /android.+mobile|ip(hone|[oa]d)/i.test(navigator.userAgent);
```

As you can see, we are matching against few of the major mobile user agents. But keep in mind that there are too many devices variants so user agents too, so if you need a more accurate result
may be [this][2] answer on **SO** will be helpful.

[1]: https://www.abhith.net/post/remove-specific-class-from-all-elements-jquery/
[2]: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
