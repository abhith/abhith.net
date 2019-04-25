---
templateKey: blog-post
title: 'Fix: Web deploy - could not verify the server’s certificate'
description: >-
  Fix for "Web deployment task failed. (Connected to the remote computer ("xxx")
  using the specified process ("Web Management Service"), but could not verify
  the server’s certificate. If you trust the server, connect again and allow
  untrusted certificates.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2018-04-06T07:49:00.000Z
image: /img/daniel-hansen-258110-unsplash.jpg
tags:
  - visual-studio
  - ide
---
Today when I tried to deploy my new **ASP.NET CORE 2** app to [SmarterASP.NET][1], the deployment failed with a message

> Web deployment task failed. (Connected to the remote computer ("xxxxxxxxx") using the specified process ("Web Management Service"), but could not verify the server’s certificate. If you trust the server, connect again and allow untrusted certificates. 

I got the publish profile from the [SmarterASP.NET][1] control panel and when I opened the PublishSettings using VS Code, it had **AllowUntrustedCertificate="True"** which I imported to the project but when I checked the Publish Profile under my project  ( Project > Properties > xxx.pubxml), there was no entry of **AllowUntrustedCertificate**. 

So, in order to fix the issue, inside PropertyGroup just added 
<pre style="font-family:Fantasque Sans Mono;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:gray;">&nbsp;&lt;</span><span style="color:#569cd6;">AllowUntrustedCertificate</span><span style="color:gray;">&gt;</span><span style="color:#c8c8c8;">True</span><span style="color:gray;">&lt;/</span><span style="color:#569cd6;">AllowUntrustedCertificate</span><span style="color:gray;">&gt;</span>
</pre>
That solved the issue with web deploy.


  [1]: http://www.SmarterASP.NET/index?r=100571651
