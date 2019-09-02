---
templateKey: blog-post
title: Fetch Row Count for All Tables in a SQL SERVER
description: >-
  Using a short query we can list all the tables in the database along with the
  number of records in each table.
author: Abhith Rajan
authorURL: "https://twitter.com/abhithrajan"
date: 2018-03-11T20:00:00.000Z
image: /img/logo-microsoft-sql-server-595x3350.jpg
tags:
  - sql-server
---

Just execute the below query in the database to see the list of tables and number of records in each table.

```sql
SELECT t.name, s.row_count
FROM sys.tables t
    JOIN sys.dm_db_partition_stats s
ON t.object_id = s.object_id
    AND t.type_desc = 'USER_TABLE'
    AND s.index_id IN (0,1)
```
