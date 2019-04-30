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

You can access the request headers or modify the response headers easily inside the controller in your **ASP.NET Core** applications.

##### Table of Contents <!-- omit in toc -->

- [Add custom hader to response](#add-custom-hader-to-response)
- [Read a request header](#read-a-request-header)

## Add custom hader to response

```cs
 Response.Headers.Add("your-custom-header-id", custom_header_value);
```

## Read a request header

```cs
 var yourHeader = Request.Headers["your-custom-header-id"].FirstOrDefault();
```