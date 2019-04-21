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

<pre style="font-family:Consolas;font-size:13px;color:gainsboro;background:#1e1e1e;"><span style="color:#569cd6;">CREATE</span>&nbsp;<span style="color:#569cd6;">PROCEDURE</span>&nbsp;[dbo]<span style="color:#818181;">.</span>[uspTableNameOperationName]&nbsp;@Query&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">NVARCHAR</span><span style="color:#818181;">(</span><span style="color:#b5cea8;">50</span><span style="color:#818181;">)</span>&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#818181;">NULL,</span>&nbsp;
												&nbsp;&nbsp;&nbsp;@Offset&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">INT</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#b5cea8;">0</span><span style="color:#818181;">,</span>&nbsp;
												&nbsp;&nbsp;&nbsp;@PageSize&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">INT</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#b5cea8;">10</span><span style="color:#818181;">,</span>&nbsp;
												&nbsp;&nbsp;&nbsp;@Sorting&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">NVARCHAR</span><span style="color:#818181;">(</span><span style="color:#b5cea8;">20</span><span style="color:#818181;">)</span>&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#cb4141;">&#39;ID&nbsp;DESC&#39;</span><span style="color:#818181;">,</span>&nbsp;
												&nbsp;&nbsp;&nbsp;@TotalCount&nbsp;<span style="color:#569cd6;">INT</span>&nbsp;<span style="color:#569cd6;">OUTPUT</span>
<span style="color:#569cd6;">AS</span>
	<span style="color:#569cd6;">BEGIN</span>
		<span style="color:#569cd6;">SET</span>&nbsp;<span style="color:#569cd6;">NOCOUNT</span>&nbsp;<span style="color:#569cd6;">ON</span><span style="color:#818181;">;</span>
		<span style="color:#569cd6;">SET</span>&nbsp;@Query&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#c975d5;">LTRIM</span><span style="color:#818181;">(</span><span style="color:#c975d5;">RTRIM</span><span style="color:#818181;">(</span>@Query<span style="color:#818181;">));</span>
		<span style="color:#569cd6;">SELECT</span>&nbsp;@TotalCount&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#c975d5;">COUNT</span><span style="color:#818181;">(</span>[Id]<span style="color:#818181;">)</span>
		<span style="color:#569cd6;">FROM</span>&nbsp;[dbo]<span style="color:#818181;">.</span>[TableName]
		<span style="color:#569cd6;">WHERE</span>&nbsp;IsDeleted&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#b5cea8;">0</span>
			&nbsp;&nbsp;<span style="color:#818181;">AND</span><span style="color:#569cd6;">&nbsp;</span><span style="color:#818181;">(</span>@Query&nbsp;<span style="color:#818181;">IS</span>&nbsp;<span style="color:#818181;">NULL</span>
				&nbsp;&nbsp;&nbsp;<span style="color:#818181;">OR</span>&nbsp;[ColumnOne]&nbsp;<span style="color:#818181;">LIKE</span>&nbsp;<span style="color:#cb4141;">&#39;%&#39;</span>&nbsp;<span style="color:#818181;">+</span>&nbsp;@Query&nbsp;<span style="color:#818181;">+</span>&nbsp;<span style="color:#cb4141;">&#39;%&#39;</span>
				&nbsp;&nbsp;&nbsp;<span style="color:#818181;">OR</span>&nbsp;[ColumnTwo]&nbsp;<span style="color:#818181;">LIKE</span>&nbsp;<span style="color:#cb4141;">&#39;%&#39;</span>&nbsp;<span style="color:#818181;">+</span>&nbsp;@Query&nbsp;<span style="color:#818181;">+</span>&nbsp;<span style="color:#cb4141;">&#39;%&#39;</span><span style="color:#818181;">);</span>
		<span style="color:#569cd6;">WITH</span>&nbsp;CTEResults
			&nbsp;<span style="color:#569cd6;">AS&nbsp;</span><span style="color:#818181;">(</span><span style="color:#569cd6;">SELECT</span>&nbsp;Id<span style="color:#818181;">,</span>&nbsp;
						[ColumnOne]<span style="color:#818181;">,</span>&nbsp;
						[ColumnTwo]<span style="color:#818181;">,</span>&nbsp;
						[ColumnThree]<span style="color:#818181;">,</span>&nbsp;
						<span style="color:#c975d5;">ROW_NUMBER</span><span style="color:#818181;">()</span>&nbsp;<span style="color:#569cd6;">OVER</span><span style="color:#818181;">(</span>
						<span style="color:#569cd6;">ORDER</span>&nbsp;<span style="color:#569cd6;">BY</span>&nbsp;<span style="color:#569cd6;">CASE</span>
									&nbsp;<span style="color:#569cd6;">WHEN</span><span style="color:#818181;">(</span>@Sorting&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#cb4141;">&#39;ID&nbsp;DESC&#39;</span><span style="color:#818181;">)</span>
									&nbsp;<span style="color:#569cd6;">THEN</span>&nbsp;[Id]
								&nbsp;<span style="color:#569cd6;">END</span>&nbsp;<span style="color:#569cd6;">DESC</span><span style="color:#818181;">,</span>
								&nbsp;<span style="color:#569cd6;">CASE</span>
									&nbsp;<span style="color:#569cd6;">WHEN</span><span style="color:#818181;">(</span>@Sorting&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#cb4141;">&#39;ID&nbsp;ASC&#39;</span><span style="color:#818181;">)</span>
									&nbsp;<span style="color:#569cd6;">THEN</span>&nbsp;[Id]
								&nbsp;<span style="color:#569cd6;">END</span>&nbsp;<span style="color:#569cd6;">ASC</span><span style="color:#818181;">,</span>
								&nbsp;<span style="color:#569cd6;">CASE</span>
									&nbsp;<span style="color:#569cd6;">WHEN</span><span style="color:#818181;">(</span>@Sorting&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#cb4141;">&#39;COLUMNONE&nbsp;ASC&#39;</span><span style="color:#818181;">)</span>
									&nbsp;<span style="color:#569cd6;">THEN</span>&nbsp;[ColumnOne]
								&nbsp;<span style="color:#569cd6;">END</span>&nbsp;<span style="color:#569cd6;">ASC</span><span style="color:#818181;">,</span>
								&nbsp;<span style="color:#569cd6;">CASE</span>
									&nbsp;<span style="color:#569cd6;">WHEN</span><span style="color:#818181;">(</span>@Sorting&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#cb4141;">&#39;COLUMNONE&nbsp;DESC&#39;</span><span style="color:#818181;">)</span>
									&nbsp;<span style="color:#569cd6;">THEN</span>&nbsp;[ColumnOne]
								&nbsp;<span style="color:#569cd6;">END</span>&nbsp;<span style="color:#569cd6;">DESC</span><span style="color:#818181;">,</span>
								&nbsp;<span style="color:#569cd6;">CASE</span>
									&nbsp;<span style="color:#569cd6;">WHEN</span><span style="color:#818181;">(</span>@Sorting&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#cb4141;">&#39;COLUMNTWO&nbsp;ASC&#39;</span><span style="color:#818181;">)</span>
									&nbsp;<span style="color:#569cd6;">THEN</span>&nbsp;[ColumnTwo]
								&nbsp;<span style="color:#569cd6;">END</span>&nbsp;<span style="color:#569cd6;">ASC</span><span style="color:#818181;">,</span>
								&nbsp;<span style="color:#569cd6;">CASE</span>
									&nbsp;<span style="color:#569cd6;">WHEN</span><span style="color:#818181;">(</span>@Sorting&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#cb4141;">&#39;COLUMNTWO&nbsp;DESC&#39;</span><span style="color:#818181;">)</span>
									&nbsp;<span style="color:#569cd6;">THEN</span>&nbsp;[ColumnTwo]
								&nbsp;<span style="color:#569cd6;">END</span>&nbsp;<span style="color:#569cd6;">DESC</span><span style="color:#818181;">)</span>&nbsp;<span style="color:#569cd6;">AS</span>&nbsp;RowNum
				&nbsp;<span style="color:#569cd6;">FROM</span>&nbsp;[dbo]<span style="color:#818181;">.</span>[TableName]
				&nbsp;<span style="color:#569cd6;">WHERE</span>&nbsp;IsDeleted&nbsp;<span style="color:#818181;">=</span>&nbsp;<span style="color:#b5cea8;">0</span>
						<span style="color:#818181;">AND</span><span style="color:#569cd6;">&nbsp;</span><span style="color:#818181;">(</span>@Query&nbsp;<span style="color:#818181;">IS</span>&nbsp;<span style="color:#818181;">NULL</span>
							<span style="color:#818181;">OR</span>&nbsp;[ColumnOne]&nbsp;<span style="color:#818181;">LIKE</span>&nbsp;<span style="color:#cb4141;">&#39;%&#39;</span>&nbsp;<span style="color:#818181;">+</span>&nbsp;@Query&nbsp;<span style="color:#818181;">+</span>&nbsp;<span style="color:#cb4141;">&#39;%&#39;</span>
							<span style="color:#818181;">OR</span>&nbsp;[ColumnTwo]&nbsp;<span style="color:#818181;">LIKE</span>&nbsp;<span style="color:#cb4141;">&#39;%&#39;</span>&nbsp;<span style="color:#818181;">+</span>&nbsp;@Query&nbsp;<span style="color:#818181;">+</span>&nbsp;<span style="color:#cb4141;">&#39;%&#39;</span><span style="color:#818181;">);</span>
		<span style="color:#569cd6;">SELECT</span>&nbsp;<span style="color:#818181;">*</span>
		<span style="color:#569cd6;">FROM</span>&nbsp;CTEResults
		<span style="color:#569cd6;">WHERE</span>&nbsp;RowNum&nbsp;<span style="color:#818181;">BETWEEN</span>&nbsp;@Offset&nbsp;<span style="color:#818181;">+</span>&nbsp;<span style="color:#b5cea8;">1</span>&nbsp;<span style="color:#818181;">AND(</span>@Offset&nbsp;<span style="color:#818181;">+</span>&nbsp;@PageSize<span style="color:#818181;">);</span>
	<span style="color:#569cd6;">END</span><span style="color:#818181;">;</span>
<span style="color:#569cd6;">GO</span></pre>

In the above query, we are using **CASE** to do the conditional sorting. And with help of a **common table expression (CTE)**, we do the paging. For filtering (here only string comparison), we are using **LIKE**.

If you are using SQL Server 2012 or later, then you have other options to do paging like by using **OFFSET FETCH**.

### Story in short

During this post is written, I was working on an **Angular 6 + ASP.NET Core 2.1** web app. The DB provided was a **SQL Server 2008**. Used **Dapper** to do the repository level coding.

#### Additional Resources

- [CASE (Transact-SQL) | Microsoft Docs](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/case-transact-sql?view=sql-server-2017)
- [LIKE (Transact-SQL) | Microsoft Docs](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/like-transact-sql?view=sql-server-2017)
- [OFFSET FETCH Clause (SQL Server Compact)](https://technet.microsoft.com/en-us/library/gg699618(v=sql.110).aspx)
