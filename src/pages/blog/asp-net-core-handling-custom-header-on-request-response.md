---
templateKey: blog-post
title: ASP.NET Core - Handling Custom Header on Request/Response
description: >-
  There may be situations where you want to add a custom header in your ASP.NET
  Core API response or you need to read a header from the request.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2019-04-25T12:11:27.975Z
image: /img/jungwoo-hong-100345-unsplash.jpg
tags:
  - aspnet-core
---
## Add Custom Header to Response

```cs
 Response.Headers.Add("your-custom-header-id", custom_header_value);
```

## Read a Request Header

```cs
 var yourHeader = Request.Headers["your-custom-header-id"].FirstOrDefault();
```

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@oowgnuj?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Jungwoo Hong"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Jungwoo Hong</span></a>
