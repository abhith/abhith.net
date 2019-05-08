---
templateKey: blog-post
title: Microsoft SQL Server Guy Trying Oracle Database
description: >-
  This post contains my personal experiences trying Oracle Database.
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2019-05-08T15:11:27.975Z
image: /img/logo-oracle-database.png
tags:
  - sql-server
  - oracle-database
---

I have worked with **Microsoft SQL Server** for the past 7 years and still enjoying working with **SQL Server**. Now I got a chance to explore **Oracle Database** and here is my experience.

## Some Points

- There is **NO DATABASE NAME**, instead there is this `user` or `schema` wise separation.
- Preferred IDE is **Oracle SQL Developer**

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

## Conclusion

I just started exploring **Oracle Database**, so this post can be considered as a draft for now, more coming.