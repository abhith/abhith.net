---
title: Sitefinity Development - Problems and Solutions
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2018-01-19T00:00:00.000Z"
templateKey: blog-post
image: /img/rob-schreckhise-40905-unsplash.jpg
description: During my first Sitefinity project, I encountered few problems, in which some of them are explained here.
---

* [#1: <strike>Child pages not showing in navigation menu</strike>](#1)
* [#2: <strike>Caching issue for pages with NO CACHING profile</strike>](#2)
* [#3: <strike>Localization not reflecting in when resource files are updated</strike>](#localization-not-reflecting-in-when-resource-files-are-updated)
* [#4 <strike>Forgot password email not triggered</strike>](#forgot-password-email-not-triggered)

The strikethrough indicates that I have found solutions for them.
Solutions that worked for me explained below,

#### <a name="1"></a>Child pages not showing in navigation menu

We were customized the navigation template to match up with our design, and our menu layout had up to 2 levels. The problem was, only first level menu's being displayed. It was actually a simple configuration which we missed, on the navigation widget settings, make sure to check the level to display. In our case, it was 1. So no child items are shown. After setting it to 2, the child items shown fine. Simple thing but wasted an hour on this.

#### <a name="2"></a>Caching issue for pages with NO CACHING profile

I wrote another article just for this. Check it out [here](https://www.abhith.net/post/sitefinity-caching-issue-for-pages-with-no-caching-profile/)

#### <a name="localization-not-reflecting-in-when-resource-files-are-updated"></a> Localization not reflecting in when resource files are updated

Restart the website or recycle the app pool associated with the website in the IIS in order to see the localization updates.

#### <a name="forgot-password-email-not-triggered"></a> Forgot password email not triggered

Go through the KB article with directions on what needs to be configured and an example screencast ( http://www.screencast.com/t/EF0N2LSiwV ) . Also, the KB describes how to configure smtp4dev so you can test the set-up. 

https://knowledgebase.progress.com/articles/Article/How-to-use-smtp4dev-to-test-Sitefinity-emails

Note that this is an example for forms notifications, so in your case, you do not need to follow 3. Enable Forms notifications.

However, please make sure that Password Recovery is configured correctly. EnablePasswordReset needs to be set to true and enablePasswordRetrieval should be set to false. Please, check this documentation:

https://docs.sitefinity.com/administration-configure-the-password-recovery-link

Also, note that restart of the application is required.