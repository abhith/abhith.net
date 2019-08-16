---
templateKey: blog-post
title: Azure Web App - Web Deploy to a Sub-folder 
description: >-
  Follow this tutorial to configure web deploy from Visual Studio to a sub-folder in your azure web app (App Service).
author: Abhith Rajan
authorURL: "https://twitter.com/abhithrajan"
date: 2019-07-30T15:11:27.975Z
image: /img/azure-web-app-web-deploy-to-a-sub-folder.png
tags:
  - azure
---

I always recommends Microsoft Azure. Recently, We needed to deploy an ASP.NET Core app to a sub-folder inside Azure Web App (App Service).

By default Azure provides publish profiles for the Web App (To put files to the root of the domain). In our case, We wanted to deploy inside a sub-folder.

Suppose our web app name was `demo-site` and we want to web deploy the app under `demo-site\folder\sub-folder`. To do that,

- Download the publish profile
- Import in Visual Studio
- Edit the web-deploy profile(Normally the publish profile will have Web Deploy as well as FTP profile)
  - Change Site Name from `demo-site` to `demo-site\folder\sub-folder`
  - Change the Destination URL from `http://demo-site.azurewebsites.net` to `http://demo-site.azurewebsites.net/folder/sub-folder`
- Publish

But the publish failed with error,

> System.TypeLoadException: Method 'get_Settings' in type 'Microsoft.Web.LibraryManager.Build.HostInteraction' from assembly 'Microsoft.Web.LibraryManager.Build

This is specific to our application and may not have anything to do with your app, so can skip this part.

After referring a similar issue posted in GitHub [aspnet/LibraryManager](https://github.com/aspnet/LibraryManager/issues/481), We resolved the issue by updating **Microsoft.Web.LibraryManager.Build** Nuget package in my project.

Now next error,

> Error - Web Deployment failed ERROR_NOT_SUPPORTED

More details about web deployment error can be found from [here](https://docs.microsoft.com/en-us/iis/publish/troubleshooting-web-deploy/web-deploy-error-codes#ERROR_NOT_SUPPORTED). In order to solve that,

> Go to portal > demo-site App Service > Configuration > Path Mappings > Virtual applications and directories. And add the following,

| Virtual path       | Physical Path                  | Type        |
| ------------------ | ------------------------------ | ----------- |
| /folder            | site\wwwroot\folder            | Folder      |
| /folder/sub-folder | site\wwwroot\folder\sub-folder | Application |

Now publish from Visual Studio. If you only need to publish to a first level folder, i.e to `demo-site\folder`, then all you have to do is, change the **Type** to `Application` in the Path mappings for `/folder`, and skip the sub-folder entry since you don't need it. And correct the **Site Name** and **Destination URL** in the publish profile accordingly.
