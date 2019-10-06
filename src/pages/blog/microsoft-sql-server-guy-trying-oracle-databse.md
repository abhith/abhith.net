---
templateKey: blog-post
title: Microsoft SQL Server Guy Trying Oracle Database
description: >-
  This post contains my personal experiences trying Oracle Database.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2019-05-08T15:11:27.975Z
lastModificationTime: 2019-08-21T15:11:27.975Z
image: /img/logo-oracle-database.png
tags:
  - sql-server
  - oracle-database
  - cookbook
---

I have worked with **Microsoft SQL Server** for the past 7 years and still enjoying working with **SQL Server**. Now I got a chance to explore **Oracle Database** and here is my experience.

#### Table of Contents <!-- omit in toc -->

- [Noticed Differences](#noticed-differences)
- [Docs](#docs)
  - [Tablespaces](#tablespaces)
  - [VARCHAR vs VARCHAR2](#varchar-vs-varchar2)
- [Problems](#problems)
  - [Show Line Numbers in Oracle SQL Developer](#show-line-numbers-in-oracle-sql-developer)
  - [Create User](#create-user)
  - [VARCHAR to BLOB](#varchar-to-blob)
  - [Update BLOB via Query](#update-blob-via-query)
  - [Oracle localhost connection string for an ASP.NET CORE & Dapper project](#oracle-localhost-connection-string-for-an-aspnet-core--dapper-project)
  - [ORA-00933: SQL command not properly ended](#ora-00933-sql-command-not-properly-ended)
- [Conclusion](#conclusion)

## Noticed Differences

- There is **NO DATABASE NAME**, instead there is this `user` or `schema` wise separation.
- Preferred IDE is **Oracle SQL Developer**
- After executing query, you need to **commit** in order to retain the changes.
- `SELECT TOP N` is not that easy compared to SQL Server.

## Docs

### Tablespaces

An Oracle database consists of one or more logical storage units called tablespaces, which collectively store all of the database's data.

### VARCHAR vs VARCHAR2

`VARCHAR` is reserved by Oracle to support distinction between `NULL` and `empty string` in future, as ANSI standard prescribes.

`VARCHAR2` does not distinguish between a NULL and empty string, and never will.

If you rely on empty string and NULL being the same thing, you should use VARCHAR2.

## Problems

### Show Line Numbers in Oracle SQL Developer

This can be done easily by right clicking the line number section in the IDE, then `Toggle Line Numbers`.

### Create User

```sql
CREATE USER <UserName> IDENTIFIED BY <Password>;
GRANT CONNECT , RESOURCE, DBA TO <UserName>; 
```

### VARCHAR to BLOB

We can use the inbuilt function `utl_raw.cast_to_raw` which transforms a `varchar2` into a `BLOB` value,

```sql
utl_raw.cast_to_raw('SOME_STRING')
```

### Update BLOB via Query

```sql
Update TABLE_NAME SET COL_NAME = utl_raw.cast_to_raw('SOME_STRING');
```

### Oracle localhost connection string for an ASP.NET CORE & Dapper project

```cs
private readonly string ConnectionString = @"Data Source = (DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)))(CONNECT_DATA = (SERVER = DEDICATED)(SERVICE_NAME = XE))); user id = YOUR_USER_ID; Password= YOUR_USER_PASSWORD";

using (var dbConn = new OracleConnection(ConnectionString))
{
  ...
}
```

Replace **YOUR_USER_ID** and **YOUR_USER_PASSWORD** with appropriate values.

### ORA-00933: SQL command not properly ended

This is happened when my query contained **semicolon** ";" at the end. Removing the semicolon ";" from the end of the query solved the problem.

## Conclusion

I just started exploring **Oracle Database**, so this post can be considered as a draft for now, more coming.