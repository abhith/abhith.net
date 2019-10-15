---
templateKey: blog-post
title: C# - Get Web.Config Connection String in a Class Library
description: >-
  If you can, pass the connection string as a parameter to the class library. Second option is System.Configuration.ConfigurationManager
author: Abhith Rajan
authorURL: "https://twitter.com/abhithrajan"
date: 2019-09-15T19:26:00.000Z
image: /img/blog/c-sharp-get-web-config-connection-string-in-a-class-library.png
tags:
  - aspnet
  - c-sharp
  - web-config
---

This is relatively old topic but looks like still relevant. You need to know why?

### Story

Recently one of our vendor deployed an app in one of our environment and when tested, found that the some of the entries going to wrong DB. Checked the connection strings in Web.Config, everything was fine. Due to the lack of proper logging in the application, we planned to hook up **Microsoft Azure Application Insights**, and we did discovered something, thanks to AI.

https://twitter.com/AbhithRajan/status/1172902535331495936

Hard coding something like Connection String is a **BAD PRACTICE**, things like that **should come as a parameter to the class library methods**. Since we are not in a position to rewrite everything, what we did was, we replaced the hard coded connection string with the actual connection string value from the web.config.

```cs
using  System.Configuration;
...

public static string ConnectionString
{
  get { return ConfigurationManager.ConnectionStrings["Default"].ConnectionString; }
}
```

In the above code, `Default` is the connection string name in the **web.config**.
