---
templateKey: blog-post
title: Fetch Row Count for All Tables in a SQL SERVER
description: >-
  Using a short query we can list all the tables in the database along with the
  number of records in each table.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2018-03-11T20:00:00.000Z
image: /img/logo-microsoft-sql-server-595x3350.jpg
tags:
  - sql-server
---
Just execute the below query in the database to see the list of tables and number of records in each table.
<pre style="font-family:Fantasque Sans Mono;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:#569cd6;">SELECT</span>&nbsp;t<span style="color:#818181;">.</span><span style="color:#569cd6;">name</span><span style="color:#818181;">,</span>&nbsp;s<span style="color:#818181;">.</span>row_count&nbsp;
<span style="color:#569cd6;">FROM</span>&nbsp;<span style="color:#b9e873;">sys</span><span style="color:#818181;">.</span><span style="color:#b9e873;">tables</span>&nbsp;t
	<span style="color:#818181;">JOIN</span>&nbsp;<span style="color:#b9e873;">sys</span><span style="color:#818181;">.</span><span style="color:#b9e873;">dm_db_partition_stats</span>&nbsp;s
<span style="color:#569cd6;">ON</span>&nbsp;t<span style="color:#818181;">.</span><span style="color:#c975d5;">object_id</span>&nbsp;<span style="color:#818181;">=</span>&nbsp;s<span style="color:#818181;">.</span><span style="color:#c975d5;">object_id</span>
	<span style="color:#818181;">AND</span>&nbsp;t<span style="color:#818181;">.</span><span style="color:#569cd6;">type_desc</span>&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#cb4141;">&#39;USER_TABLE&#39;</span>
	<span style="color:#818181;">AND</span>&nbsp;s<span style="color:#818181;">.</span>index_id&nbsp;<span style="color:#818181;">IN</span><span style="color:#569cd6;">&nbsp;</span><span style="color:#818181;">(</span><span style="color:#b5cea8;">0</span><span style="color:#818181;">,</span><span style="color:#b5cea8;">1</span><span style="color:#818181;">)</span></pre>
