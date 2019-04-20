---
title: Remove specific class from all elements - jQuery
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2017-10-23T10:16:21.000Z"
templateKey: blog-post
image: /img/greg-rakozy-129733.jpg
description: This a short article about how can we remove a specific class from all elements that do have the class easily using jQuery.
---

Code first, talks later

<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:cyan;">$</span>(<span style="color:#d69d85;">&quot;.</span><span style="color:plum;">class-name</span><span style="color:#d69d85;">&quot;</span>).<span style="color:cyan;">removeClass</span>(<span style="color:#d69d85;">&quot;class-name&quot;</span>);
</pre>
In the above code, we are finding all the elements that do have the class and removing it.

### Story behind this post
Today my colleague asked me whether they can remove some specific class from whole elements who do have the class. Not just that, this has to be done only on mobile devices (post about **Determine if the user is on the mobile device** is coming next). This post is to make his day a little easier.

#### Update: 
The post [Determine if the user is on the mobile device](https://www.abhith.net/post/javascript-determine-if-user-is-on-mobile-device/) is live now.