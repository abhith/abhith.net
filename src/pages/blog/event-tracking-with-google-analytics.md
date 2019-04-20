---
title: Event tracking with Google Analytics
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: 2017-08-17T00:00:00.000Z
templateKey: blog-post
image: /img/2017-08-17-event-tracking-with-google-analytics-hero.jpg
description: When you want to get metrics related to user interactions on various parts of your website Google Analytics (ga)  event tracking can be helpful and is easy to integrate as well.
---

I hope you have already added google analytics tracking script in your master page. If not see the page source of this page and check at the bottom of the page, there you can see some script which is provided by google analytics when we add a website (property) to our account in Google analytics which will track the page views etc for the whole website.

To add event tracking, we need to trigger the following function,

<pre style="font-family: Fantasque Sans Mono; font-size: 13; color: gainsboro; background: #1e1e1e;"><span style="color: lightgray;">ga</span>(<span style="color: #d69d85;">'send'</span>, <span style="color: #d69d85;">'event'</span>, [<span style="color: lightgray;">eventCategory</span>], [<span style="color: lightgray;">eventAction</span>], [<span style="color: lightgray;">eventLabel</span>], [<span style="color: lightgray;">eventValue</span>], [<span style="color: lightgray;">fieldsObject</span>]);
</pre>

In which,**[eventCategory]** and **[eventAction]** are required fields.

Example usage follows,

<pre style="font-family: Fantasque Sans Mono; font-size: 13; color: gainsboro; background: #1e1e1e;"><span style="color: gray;">&lt;</span><span style="color: #569cd6;">a</span> <span style="color: #9cdcfe;">href</span><span style="color: #b4b4b4;">=</span><span style="color: #c8c8c8;">"tel:1800123456"</span> <span style="color: #9cdcfe;">onclick</span><span style="color: #b4b4b4;">=</span><span style="color: #c8c8c8;">"</span><span style="color: lightgray;">ga</span>(<span style="color: #d69d85;">'send'</span>, <span style="color: #d69d85;">'event'</span>, <span style="color: #d69d85;">'Phone Call'</span>, <span style="color: #d69d85;">'Click/Touch'</span>, <span style="color: #d69d85;">'Contact Page'</span>);<span style="color: #c8c8c8;">"</span><span style="color: gray;">&gt;</span>1800123456<span style="color: gray;">&lt;/</span><span style="color: #569cd6;">a</span><span style="color: gray;">&gt;</span>
</pre>

The above code will track user interaction with the phone number. As you can see, here the **eventCategory** is "Phone Call", and **eventAction** is "Click/Touch". We can use the **eventLabel** field to improve the metrics by like here is assigned with value "Contact Page" so that we knows how much triggered from that page itself. And for other pages, we can have different eventLabel.
