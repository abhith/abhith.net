---
title: Filtering, Paging and Sorting in SQL Server 2008
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
date: "2018-11-22T00:00:00.000Z"
templateKey: blog-post
image: /img/logo-microsoft-sql-server-595x3350.jpg
description: >-
  This article provide one solution to achieve server side paging, sorting and filtering in SQL Server 2008.
tags:
  - sql-server
---

**Stored procedure** to achieve paging, sorting and filtering in SQL Server 2008 is given below.

```sql
CREATE PROCEDURE [dbo].[uspTableNameOperationName] @Query      NVARCHAR(50) = NULL,
												   @Offset     INT          = 0,
												   @PageSize   INT          = 10,
												   @Sorting    NVARCHAR(20) = 'ID DESC',
												   @TotalCount INT OUTPUT
AS
	BEGIN
		SET NOCOUNT ON;
		SET @Query = LTRIM(RTRIM(@Query));
		SELECT @TotalCount = COUNT([Id])
		FROM [dbo].[TableName]
		WHERE IsDeleted = 0
			  AND (@Query IS NULL
				   OR [ColumnOne] LIKE '%' + @Query + '%'
				   OR [ColumnTwo] LIKE '%' + @Query + '%');
		WITH CTEResults
			 AS (SELECT Id,
						[ColumnOne],
						[ColumnTwo],
						[ColumnThree],
						ROW_NUMBER() OVER(
						ORDER BY CASE
									 WHEN(@Sorting = 'ID DESC')
									 THEN [Id]
								 END DESC,
								 CASE
									 WHEN(@Sorting = 'ID ASC')
									 THEN [Id]
								 END ASC,
								 CASE
									 WHEN(@Sorting = 'COLUMNONE ASC')
									 THEN [ColumnOne]
								 END ASC,
								 CASE
									 WHEN(@Sorting = 'COLUMNONE DESC')
									 THEN [ColumnOne]
								 END DESC,
								 CASE
									 WHEN(@Sorting = 'COLUMNTWO ASC')
									 THEN [ColumnTwo]
								 END ASC,
								 CASE
									 WHEN(@Sorting = 'COLUMNTWO DESC')
									 THEN [ColumnTwo]
								 END DESC) AS RowNum
				 FROM [dbo].[TableName]
				 WHERE IsDeleted = 0
						AND (@Query IS NULL
							OR [ColumnOne] LIKE '%' + @Query + '%'
							OR [ColumnTwo] LIKE '%' + @Query + '%');
		SELECT *
		FROM CTEResults
		WHERE RowNum BETWEEN @Offset + 1 AND(@Offset + @PageSize);
	END;
GO
```

In the above query, we are using **CASE** to do the conditional sorting. And with help of a **common table expression (CTE)**, we do the paging. For filtering (here only string comparison), we are using **LIKE**.

If you are using SQL Server 2012 or later, then you have other options to do paging like by using **OFFSET FETCH**.

### Story in short

During this post is written, I was working on an **Angular 6 + ASP.NET Core 2.1** web app. The DB provided was a **SQL Server 2008**. Used **Dapper** to do the repository level coding.

#### Additional Resources

- [CASE (Transact-SQL) | Microsoft Docs](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/case-transact-sql?view=sql-server-2017)
- [LIKE (Transact-SQL) | Microsoft Docs](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/like-transact-sql?view=sql-server-2017)
- [OFFSET FETCH Clause (SQL Server Compact)](<https://technet.microsoft.com/en-us/library/gg699618(v=sql.110).aspx>)
