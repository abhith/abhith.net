---
title: JavaScript - Determine if user is on mobile device
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2017-10-25T00:00:00.000Z"
templateKey: blog-post
image: /img/js-jquery-html-css.jpg
description: >-
    You can use navigator.userAgent value to determine if the user is on a mobile device.
---

In the responsive design era, you may want to do some extra operations if the user is on mobile, like something I mentioned in my last [post][1] where my colleague wanted to remove some specific classes if the user is on mobile.

To do that, you can check the **navigator.userAgent** value. And with the help of **regex** you can do,

<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:#569cd6;">var</span>&nbsp;<span style="color:cyan;">isMobile</span>&nbsp;<span style="color:#b4b4b4;">=</span><span style="color:#d69d85;">&nbsp;</span><span style="color:#80ff80;">/</span><span style="color:#d69d85;">android</span><span style="color:#62ccff;">.+</span><span style="color:#d69d85;">mobile</span><span style="color:#62ccff;">|</span><span style="color:#d69d85;">ip</span><span style="color:#6ff000;">(</span><span style="color:#d69d85;">hone</span><span style="color:#62ccff;">|</span><span style="color:#ffe75b;">[</span><span style="color:#d69d85;">oa</span><span style="color:#ffe75b;">]</span><span style="color:#d69d85;">d</span><span style="color:#6ff000;">)</span><span style="color:#80ff80;">/</span><span style="color:#80ff80;">i</span>.<span style="color:cyan;">test</span>(<span style="color:violet;">navigator</span>.<span style="color:violet;">userAgent</span>);
</pre>

As you can see, we are matching against few of the major mobile user agents. But keep in mind that there are too many devices variants so user agents too, so if you need a more accurate result
may be [this][2] answer on **SO** will be helpfull.

[1]: https://www.abhith.net/post/remove-specific-class-from-all-elements-jquery/
[2]: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
