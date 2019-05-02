---
title: Markdown - Link within document
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2017-11-06T09:39:53.000Z"
lastModificationTime: "2019-05-02T09:39:53.000Z"
templateKey: blog-post
image: /img/john-barkiple-539580-unsplash.jpg
description: >-
    This is a short article on how to link within the document in a markdown (.md) file.
tags:
  - markdown
  - gatsby
---

I use markdown as the writing language for my blog posts on this website. It is clean and minimal so I prefer it over HTML.

Today I updated some content in one of my blog posts, [Xamarin development - problems and solutions](https://www.abhith.net/post/xamarin-development-problems-and-solutions/) and in which, there is a summary of issues listed on the top and the solutions for  each of them explained below one by one and there wasn't any link between the list items and the explanations.

So for better usability, I had to link them, I know how to do it in **HTML** and now I learned how to do it on **Markdown**.

To create the link,

<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:#569cd6;">[</span><span style="color:#569cd6;">Link&nbsp;text</span><span style="color:#569cd6;">](#some-id)</span>
</pre>

And anchor point the target area by,
<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="font-weight:bold;">#&nbsp;</span><span style="color:maroon;">&lt;a&nbsp;name=&quot;some-id&quot;&gt;&lt;/a&gt;</span><span style="font-weight:bold;">&nbsp;DETAIL&nbsp;SECTION</span>
</pre>

Notice the usage of "some-id" in both. You can replace "some-id" with any proper text.

### Update 1 - 2nd May 2019

If you are using some kind of markdown transformer, there might be an option to make the header links automatically. Since I switched my website to **Gatsby**. It has a plugin called `gatsby-remark-autolink-headers` which does this.

If nothing worked out, the solution mentioned in this article is still valid.