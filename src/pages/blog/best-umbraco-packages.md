---
templateKey: blog-post
title: Best Umbraco Packages
description: My personal favorite list of packages I use when I build a Umbraco website.
author: Abhith Rajan
authorURL: "http://twitter.com/abhithrajan"
date: "2017-08-24T22:23:43.000Z"
image: /img/installed-packages.png
tags:
  - umbraco
  - awesome-list
  - cms
---

There are so many free/paid packages available for Umbraco. Following are few of them which really suits our needs.

- Diplo Trace Log Viewer
- Url Tracker
- Articulate
- Robots.txt Editor
- Analytics
- Diplo Audit Log Viewer
- RankOne - SEO Toolkit

#### Diplo Trace Log Viewer

![diplo trace log viewer](/img/trace-logs-w.png)

Whenever you have issues with Umbraco websites, you first check its logs. To get logs, you need access to the hosting server and you open the log file in some editor and Ctrl+F for "Error". We too did the same before we found Diplo Trace Log Viewer.

After installing Diplo Trace Log Viewer, viewing logs is so easy. You sign in to Umbraco, there in the developer tree like in the picture you get a new menu "Trace Logs". There you can find all the logs, and the filters are so easy so that no more Ctrl+F.

Find the package and read about its features [here](https://our.umbraco.org/projects/developer-tools/diplo-trace-log-viewer/)

#### Url Tracker

![url tracker](/img/url-tracker.png)

Url Tracker is so helpful to manage the URLs in your Umbraco website. Before we aware of the Url Tracker, we used to write redirect rules in the IIS and it is not easy and it sometimes leads to "too many redirects".

Once we add Url Tracker package, we can add redirect rules from Umbraco interface, also the module keeps tracks of 404 requests, later you can add redirect rules based on these records as well.

The 404 module is so helpful when you are migrating an old website to Umbraco hence the routing definitions changed, so old website links end up in 404. Which you are tracking and later you can map it to the new link in the site using the URL tracker.

Find the package and read about its features [here](https://our.umbraco.org/projects/developer-tools/301-url-tracker/)

#### Articulate

![articulate](/img/articulate.png)

One of the best blog engine you can attach to your Umbraco website. Install it and modify any of the included themes to your taste and that's it. Features include categories, tags, markdown support etc.

You can modify every part of it according to your needs, just like I did for this website. Now it available as a NuGet package.

Find the package and read about its features [here](https://our.umbraco.org/projects/starter-kits/articulate/).

#### Robots.txt Editor

![robots-txt](/img/robots-txt.png)

Another Developer tree module which enables you to edit your robots.txt inside from your Umbraco section.It adds a basic robots.txt file during installation if your site doesn't have any.

Find the package and read about its features [here](https://our.umbraco.org/projects/developer-tools/robotstxt-editor)

#### Analytics

![analytics](/img/analytics.png)

If you want to keep track of your google analytics inside from your Umbraco site, this is the package you are looking for. It retrieves your site analytics data from Google analytics.

Installing the package will add a new section in your Umbraco. Make sure to check user permissions if you don't see the new section. The section contains a menu tree with various analytics data including some charts and so on.

Find the package and read about its features [here](https://our.umbraco.org/projects/backoffice-extensions/analytics/)

#### Diplo Audit Log Viewer

![audit log viewer](/img/audit-log-viewer-2.png)

If your Umbraco site has multiple users, to see whats going on, this is the best option. It will list the activities of the CMS users so that you can oversee.

You will find the audit logs menu under the developer section once you install the package.

Find the package and read about its features [here](https://our.umbraco.org/projects/developer-tools/diplo-audit-log-viewer/)

#### RankOne - SEO Toolkit

![rankone](/img/Rankone.png)

This package has a collection of SEO tools. It contains a doc type composition contains the title, meta description, and meta keywords. Adding that composition to any of the existing document types adds a new SEO tab for the document type. It also includes a partial view where you can see the code to get the meta data for the content.

What I did was, after installed, added the composition to my home and about pages. And added the code from the partial view to my master page. And it working fine.

The package also adds a dashboard section in the content home. Where you can evaluate the existing pages SEO metrics and it will list improvement points.

Find the package and read about its features [here](https://our.umbraco.org/projects/backoffice-extensions/rankone-seo-toolkit/https://our.umbraco.org/projects/backoffice-extensions/rankone-seo-toolkit/).

I will continue updating this list and this is the first post in my [Awesome Lists](/topics/awesome-list) topic.
