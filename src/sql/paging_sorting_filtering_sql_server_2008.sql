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