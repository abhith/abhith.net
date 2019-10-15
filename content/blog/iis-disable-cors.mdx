---
templateKey: blog-post
title: IIS - Disable CORS
description: >-
  Disable CORS for IIS 10 website by allowing all origins in two simple steps.
author: Abhith Rajan
authorURL: "https://twitter.com/abhithrajan"
date: 2019-08-14T16:54:00.000Z
image: /img/blog/iis-disable-cors.png
tags:
  - iis
  - web-config
---

For any reason you wish to disable CORS for any website hosted on IIS, one way you can do this by allowing all origins.
To do that,

1. Make sure you installed [IIS CORS Module](https://www.iis.net/downloads/microsoft/iis-cors-module) on the server.
2. Update the **Web.Config** of the website to have the **cors** section as given below,

Note: _code tested on IIS 10_

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <cors enabled="true" failUnlistedOrigins="true">
          <add origin="*">
            <allowHeaders allowAllRequestedHeaders="true" />
          </add>
        </cors>
    </system.webServer>
</configuration>
```

As you can see, we are allowing all origin's by specifying `*` as the origin.

After just allowing all origins alone, if you encounter error like,

> Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.

To solve that, we are setting `allowAllRequestedHeaders="true"` in the `allowHeaders` for all the origins.

> Remember: CORS is a security feature. Disable only if the resource is totally public.

#### Additional Resources

- [CORS Module Configuration Reference | Microsoft Docs](https://docs.microsoft.com/en-us/iis/extensions/cors-module/cors-module-configuration-reference#cors-configuration)
