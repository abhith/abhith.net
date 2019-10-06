---
templateKey: blog-post
title: Dapper - Execute Multiple Stored Procedures
description: >-
  Dapper provides extension methods to execute multiple queries within the same command. The same can be used to execute multiple stored procedures.
author: Abhith Rajan
authorURL: "https://twitter.com/abhithrajan"
date: 2019-09-05T12:59:27.975Z
image: /img/blog/dapper-execute-multiple-stored-procedures.png
tags:
  - dapper
  - sql-server
---

Dapper is my preferred ORM for performance constraint applications. It is one of the best solution in case of a database first approach as well as when there is already a database in place. Dapper also works with SQL Server as well as so many other DB's, I have tried Oracle DB apart from SQL Server and the overall experience was good.

Now to our topic, Dapper have so many features/extension methods, the docs of all the features can be accessed [here](https://dapper-tutorial.net).

To execute multiple stored procedures, see the sample code below,

```cs
using Dapper;
...

public async Task<SomeClass> GetAsync(Guid someId, Guid anotherId)
{
    using (var connection = new SqlConnection(_settings.ConnectionString()))
    {
        connection.Open();

        const string sql = @"exec uspTableOneAction @someId;
                             exec uspTableTwoAnotherAction @anotherId;";

        using (var multi = connection.QueryMultipleAsync(sql, new { someId, anotherId }).Result)
        {
            var firstTableItem = multi.Read<TableOneItem>().First();
            var secondTableItem = multi.Read<TableTwoItem>().FirstOrDefault();
           ...
        }

        ...
    }
}
```

In the above code, my stored procedure are,

- uspTableOneAction
- uspTableTwoAnotherAction

The naming convention which we follows for stored procedures are,

> usp{TableName}{Action}

eg: uspUserInsert, uspUserUpdate

And in the above example, first stored procedure expects a parameter `@someId`.
And the second stored procedure expects `@anotherId`. We passed these args by

```cs
new { someId, anotherId }
```

The same can be written as,

```cs
new { someId = someId, anotherId = anotherId }
```

Why we omitted the right hand side part in the example is because of the arguments name matching the parameter.

Just in case if both stored procedures expecting same parameter, say `@someId`. Then our args will look like,

```cs
new { someId }
```

That's it. You have the result of the two queries.

### Additional Resources

- [Dapper Tutorial](https://dapper-tutorial.net)
- [Dapper Async | Dapper Tutorial and Documentation](https://dapper-tutorial.net/async#querymultipleasync)
- [Dapper QueryMultiple | Dapper Tutorial and Documentation](https://dapper-tutorial.net/querymultiple)
