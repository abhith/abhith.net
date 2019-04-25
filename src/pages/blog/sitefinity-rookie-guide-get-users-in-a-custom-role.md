---
templateKey: blog-post
title: 'Sitefinity Rookie Guide : Get Users in a Custom Role'
description: >-
  To get users in a custom role, make sure to use the Role manager with Default
  Provider in Sitefinity.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2017-10-21T08:58:00.000Z
image: /img/create-label-sitefinity.png
tags:
  - sitefinity-rookie-guide
  - sitefinity
  - cms
---
I am pretty new to **Sitefinity** and started learning since one of the upcoming projects is need to be done in the Sitefinity.

Now spent few days in a POC, in which one requirement is to list users in a custom role that we created. And it can be achieved easily using below code,

<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:#569cd6;">var</span>&nbsp;roleMngr&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;<span style="color:lightblue;">RoleManager</span><span style="color:#b4b4b4;">.</span><span style="color:cyan;">GetManager</span>(<span style="color:#d69d85;">&quot;Default&quot;</span>);
<span style="color:#569cd6;">var</span>&nbsp;usersInCustomRole&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;roleMngr<span style="color:#b4b4b4;">.</span><span style="color:cyan;">GetUsersInRole</span>(<span style="color:#d69d85;">&quot;CustomRole&quot;</span>);
<span style="color:#569cd6;">foreach</span>&nbsp;(<span style="color:#569cd6;">var</span>&nbsp;user&nbsp;<span style="color:#569cd6;">in</span>&nbsp;usersInCustomRole)
{
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">var</span>&nbsp;userProfileManager&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;<span style="color:lightblue;">UserProfileManager</span><span style="color:#b4b4b4;">.</span><span style="color:cyan;">GetManager</span>();
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">var</span>&nbsp;sitefinityProfile&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;userProfileManager<span style="color:#b4b4b4;">.</span><span style="color:cyan;">GetUserProfile</span>&lt;<span style="color:lightblue;">SitefinityProfile</span>&gt;(user);
 
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#b4b4b4;">...</span>
}</pre>

Replace the **CustomRole** with the role name which you have created, in my case, it was **Reviewer**. Since we want users in a custom role (i.e role which we created), we need to use the **Default** provider.

> The custom roles you created are part of the Default Provider.

In case of built-in roles, use **AppRoles** as the provider name to get the role manager.
