---
templateKey: blog-post
title: Determine Total Number of Open/Active Connections in MS SQL Server
description: >-
  This article contains a SQL query which can be used to determine the total
  number of open/active connections in MS SQL Server. Also explains, how to
  solve the error "Timeout expired. The timeout period elapsed prior to
  obtaining a connection from the pool. This may have occurred because all
  pooled connections were in use and max pool size was reached."
author: Abhith Rajan
authorURL: 'http://twitter.com/abhithrajan'
date: '2017-09-16T00:00:00.000Z'
image: /img/logo-microsoft-sql-server-595x3350.jpg
tags:
  - entity-framework
  - sql-server
---

This article contains a SQL query which can be used to determine the total number of open/active connections in MS SQL Server.
Also explains, how to solve the error "Timeout expired. The timeout period elapsed prior to obtaining a connection from the pool. This may have occurred because all pooled connections were in use and max pool size was reached."

<!--truncate-->

Recently we migrated one of our application from one VPS server to another. Initially, everything was fine. After a day or so here comes a strange error.

> Timeout expired. The timeout period elapsed prior to obtaining a connection from
> the pool. This may have occurred because all pooled connections were in use
> and max pool size was reached.

The connection string doesn't have any custom value set for **Max Pool Size**. So the maximum pool size for the application was the default, i.e 100. To check whether the DB have this much open connection, we run the following query in the SQL Management Studio,

<pre style="font-family:Fantasque Sans Mono;font-size:13;color:#dadada;background:#1e1e1e;"><span style="color:#569cd6;">SELECT</span>&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#c975d5;">DB_NAME</span><span style="color:#818181;">(</span><span style="color:#569cd6;">dbid</span><span style="color:#818181;">)</span>&nbsp;<span style="color:#569cd6;">as</span>&nbsp;<span style="color:gainsboro;">DBName</span><span style="color:#818181;">,</span>&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#c975d5;">COUNT</span><span style="color:#818181;">(</span><span style="color:#569cd6;">dbid</span><span style="color:#818181;">)</span>&nbsp;<span style="color:#569cd6;">as</span>&nbsp;<span style="color:gainsboro;">NumberOfConnections</span><span style="color:#818181;">,</span>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:gainsboro;">loginame</span>&nbsp;<span style="color:#569cd6;">as</span>&nbsp;<span style="color:gainsboro;">LoginName</span>
<span style="color:#569cd6;">FROM</span>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#b9e873;">sys</span><span style="color:#818181;">.</span><span style="color:#b9e873;">sysprocesses</span>
<span style="color:#569cd6;">WHERE</span>&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">dbid</span>&nbsp;<span style="color:#818181;">&gt;</span>&nbsp;<span style="color:#b5cea8;">0</span>
<span style="color:#569cd6;">GROUP</span>&nbsp;<span style="color:#569cd6;">BY</span>&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">dbid</span><span style="color:#818181;">,</span>&nbsp;<span style="color:gainsboro;">loginame</span></pre>

This will list all the DB's and its number of open connections grouped by login name. For us, the number of open connection for the DB was ~100 that's why the error. So we updated the connection string to have **Max Pool Size=200**. And the application worked fine. Sample connection string with **Max Pool Size** given below,

<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:gray;">&lt;</span><span style="color:#569cd6;">add</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">connectionString</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">Server=YOUR_SERVER;Database=YOUR_DB_NAME;User&nbsp;Id=YOUR_DB_USER_ID;Password=YOUR_DB_USER_PASSWORD;Max&nbsp;Pool&nbsp;Size=200;</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">name</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">Default</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">providerName</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">System.Data.SqlClient</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;/&gt;</span>
</pre>

Few things to remember in this kind of situations are,

- In your code, make sure all the connections are closed when finished usage.
- Don't set Max Pool Size to a very large value unless it is necessary.
