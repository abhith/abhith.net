---
templateKey: blog-post
title: IP Security - Configure IP address restrictions in Web.Config on IIS
description: Restrict access to your website using IIS IP security
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2018-01-09T09:22:00.000Z
image: /img/jon-moore-399469.jpg
tags:
  - iis
  - security
  - aspnet
---
When your website is using some kind of proxy/firewall just like **Sucuri** to increase the security, you need to make sure that only the allowed ones are accessing the site directly, so that all the requests to the site is going through the firewall.

To ensure this, we use the **IP security** feature in IIS, in which we can configure which IP's are allowed.
<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:gray;">&lt;</span><span style="color:#569cd6;">system.webServer</span><span style="color:gray;">&gt;</span>
<span style="color:#c8c8c8;">&nbsp;&nbsp;&nbsp;...</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">security</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">ipSecurity</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">allowUnlisted</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">false</span><span style="color:gray;">&quot;</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">clear</span><span style="color:gray;">&nbsp;/&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">add</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">ipAddress</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">-.-.-.-</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">subnetMask</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">-.-.-.-</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">allowed</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">true</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;/&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">add</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">ipAddress</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">-.-.-.-</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">subnetMask</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">-.-.-.-</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">allowed</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">true</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;/&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">add</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">ipAddress</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">-.-.-.-</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">subnetMask</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">-.-.-.-</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">allowed</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">true</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;/&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">add</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">ipAddress</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">-.-.-.-</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">subnetMask</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">-.-.-.-</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">allowed</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">true</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;/&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span><span style="color:#569cd6;">ipSecurity</span><span style="color:gray;">&gt;</span>
<span style="color:#c8c8c8;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span><span style="color:#569cd6;">security</span><span style="color:gray;">&gt;&nbsp;</span>
<span style="color:gray;">&nbsp;&nbsp;&lt;/</span><span style="color:#569cd6;">system.webServer</span><span style="color:gray;">&gt;</span></pre>

In the above code, we set allowUnlisted attribute to false to prevent access to all IP address unless they are listed. And then we add the allowed IP addresses one by one.
eg.
<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:gray;">&lt;</span><span style="color:#569cd6;">add</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">ipAddress</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">192.168.134.0</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">subnetMask</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">255.255.254.0</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">allowed</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">true</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;/&gt;</span>
</pre>

### Additional Resource
- [IP Security <ipSecurity>](https://docs.microsoft.com/en-us/iis/configuration/system.webserver/security/ipsecurity)
