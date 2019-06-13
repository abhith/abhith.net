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

Recently we migrated one of our application from one VPS server to another. Initially, everything was fine. After a day or so here comes a strange error.

> Timeout expired. The timeout period elapsed prior to obtaining a connection from
> the pool. This may have occurred because all pooled connections were in use
> and max pool size was reached.

The connection string doesn't have any custom value set for **Max Pool Size**. So the maximum pool size for the application was the default, i.e 100. To check whether the DB have this much open connection, we run the following query in the SQL Management Studio,

```sql
SELECT
    DB_NAME(dbid) as DBName,
    COUNT(dbid) as NumberOfConnections,
    loginame as LoginName
FROM
    sys.sysprocesses
WHERE
    dbid > 0
GROUP BY
    dbid, loginame
```

This will list all the DB's and its number of open connections grouped by login name. For us, the number of open connection for the DB was ~100 that's why the error. So we updated the connection string to have **Max Pool Size=200**. And the application worked fine. Sample connection string with **Max Pool Size** given below,

```xml
<add connectionString="Server=YOUR_SERVER;Database=YOUR_DB_NAME;User Id=YOUR_DB_USER_ID;Password=YOUR_DB_USER_PASSWORD;Max Pool Size=200;" name="Default" providerName="System.Data.SqlClient" />
```

Few things to remember in this kind of situations are,

- In your code, make sure all the connections are closed when finished usage.
- Don't set Max Pool Size to a very large value unless it is necessary.
