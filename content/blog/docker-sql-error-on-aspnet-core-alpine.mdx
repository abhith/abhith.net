---
templateKey: blog-post
title: Docker - SQL Error on ASP.NET Core Alpine
description: >-
  Having trouble to connect to a remote SQL server from an ASP.NET Core app running on top of Alpine dotnet on a linux container?
author: Abhith Rajan
authorURL: "https://twitter.com/abhithrajan"
date: 2019-05-07T09:26:00.000Z
image: /img/large.png
tags:
  - aspnet-core
  - docker
  - sql-server
---

My ASP.NET Core app was running fine on `mcr.microsoft.com/dotnet/core/runtime:2.2-stretch-slim` on my linux container. And the build image size was 195MB. In order to reduce the file size, I switched to `mcr.microsoft.com/dotnet/core/sdk:2.2.203-alpine3.9` and the new image size was 98.6MB. **WOW !!!**

But then there came this problem,

> System.InvalidOperationException: Internal connection fatal error

The SQL client was having trouble in this build. After the regular research, find out that in the **alpine** image

> The `microsoft/dotnet` Alpine images are purposefully configured to use the **.NET Core 2.0 Globalization Invariant Mode**. This is done to reduce the size of the image substantially. It seems as though the SqlClient does not support running with the Globalization Invariant Mode.

If you are thinking what is **.NET Core 2.0 Globalization Invariant Mode**,

> .NET Core 2.0 Globalization Invariant Mode enables you to remove application dependencies on globalization data and globalization behavior. This mode is an opt-in feature that provides more flexibility if you care more about reducing dependencies and the size of distribution than globalization functionality or globalization-correctness.

But there is a small catch,

> The drawback of running in the invariant mode is applications will get poor globalization support.

So solution for this was to add the following in Dockerfile just before the **ENTRYPOINT**,

```yml
RUN apk add --no-cache icu-libs
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
```

In the first step, we are adding the `icu-libs` [Alpine linux package](https://pkgs.alpinelinux.org/package/edge/main/x86/icu-libs), which is the international components for unicode library (libraries) and in the next step, we are setting **DOTNET_SYSTEM_GLOBALIZATION_INVARIANT** to `false` to enable the globalization support.

#### Additional Resources

- [.NET Core 2.0 Globalization Invariant Mode](https://github.com/dotnet/corefx/blob/master/Documentation/architecture/globalization-invariant-mode.md)
