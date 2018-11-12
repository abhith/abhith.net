---
title: SITEFINITY DEVELOPMENT - PROBLEMS AND SOLUTIONS
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
# authorFBID: 661277173
---

DURING MY FIRST SITEFINITY PROJECT, I ENCOUNTERED FEW PROBLEMS, IN WHICH SOME OF THEM ARE EXPLAINED HERE.

<!--truncate-->

During my first Sitefinity project, I encountered few problems, in which some of them are,

* [#1: <strike>Child pages not showing in navigation menu</strike>](#1)
* [#2: <strike>Caching issue for pages with NO CACHING profile</strike>](#2)
* [#3: <strike>Localization not reflecting in when resource files are updated</strike>](#localization-not-reflecting-in-when-resource-files-are-updated)

The strikethrough indicates that I have found solutions for them.
Solutions that worked for me explained below,

#### <a name="1"></a>Child pages not showing in navigation menu

We were customized the navigation template to match up with our design, and our menu layout had up to 2 levels. The problem was, only first level menu's being displayed. It was actually a simple configuration which we missed, on the navigation widget settings, make sure to check the level to display. In our case, it was 1. So no child items are shown. After setting it to 2, the child items shown fine. Simple thing but wasted an hour on this.

#### <a name="2"></a>Caching issue for pages with NO CACHING profile

I wrote another article just for this. Check it out [here](https://www.abhith.net/post/sitefinity-caching-issue-for-pages-with-no-caching-profile/)

#### <a name="localization-not-reflecting-in-when-resource-files-are-updated"></a> Localization not reflecting in when resource files are updated

Restart the website or recycle the app pool associated with the website in the IIS in order to see the localization updates.