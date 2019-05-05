---
title: Sitefinity - Read localized resource labels in MVC widget
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2017-12-07T00:52:55.000Z"
templateKey: blog-post
image: /img/create-label-sitefinity.png
description: >-
    Explains how to get localized labels in Sitefinity MVC widgets.
tags:
  - sitefinity
  - cms
  - localization
---

In your Razor View,

<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:black;background:#ffffb3;">@</span><span style="color:violet;">Html</span><span style="color:#b4b4b4;">.</span><span style="color:cyan;">Resource</span>(<span style="color:#d69d85;">&quot;ResourceLabel&quot;</span>,&nbsp;<span style="color:#d69d85;">&quot;ResourceName&quot;</span>)
</pre>

In the above code, replace **ResourceLabel** with the **key** and **ResourceName** with the **type**, you used to create the label in the **Sitefinity** CMS. Make sure **Telerik.Sitefinity.Frontend.Mvc.Helpers** namespace is imported in the view. i.e

<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:black;background:#ffffb3;">@</span><span style="color:#569cd6;">using</span>&nbsp;<span style="color:lightblue;">Telerik</span><span style="color:#b4b4b4;">.</span><span style="color:lightblue;">Sitefinity</span><span style="color:#b4b4b4;">.</span><span style="color:lightblue;">Frontend</span><span style="color:#b4b4b4;">.</span><span style="color:lightblue;">Mvc</span><span style="color:#b4b4b4;">.</span><span style="color:lightblue;">Helpers</span>;
</pre>

#### Sample usage

<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:gray;">&lt;</span><span style="color:#569cd6;">li</span><span style="color:gray;">&gt;</span>&nbsp;<span style="color:gray;">&lt;</span><span style="color:#569cd6;">a</span>&nbsp;<span style="color:#9cdcfe;">href</span><span style="color:#b4b4b4;">=</span><span style="color:#c8c8c8;">&quot;/&quot;</span><span style="color:gray;">&gt;</span><span style="color:black;background:#ffffb3;">@</span><span style="color:violet;">Html</span><span style="color:#b4b4b4;">.</span><span style="color:cyan;">Resource</span>(<span style="color:#d69d85;">&quot;Home&quot;</span>,&nbsp;<span style="color:#d69d85;">&quot;PageResources&quot;</span>)<span style="color:gray;">&lt;/</span><span style="color:#569cd6;">a</span><span style="color:gray;">&gt;&lt;/</span><span style="color:#569cd6;">li</span><span style="color:gray;">&gt;</span>
</pre>