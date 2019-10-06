---
templateKey: blog-post
title: C# - Get Last N characters from a string
description: >-
  A simple C# extension method which use Substring to get the last N characters in a string.
author: Abhith Rajan
authorURL: "https://twitter.com/abhithrajan"
date: 2019-09-22T19:26:00.000Z
image: /img/blog/c-sharp-get-last-n-characters-from-a-string.png
tags:
  - c-sharp
---

In C#, **Substring** method is used to retrieve (as the name suggests) substring from a string. The same we can use to get the last 'N' characters of a string.

### String.Substring Method

As described in [String.Substring Method (System) | Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/api/system.string.substring?view=netframework-4.8), Substring method has two overloads,

| Overload                | Description                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Substring(Int32)        | Retrieves a substring from this instance. The substring starts at a specified character position and continues to the end of the string. |
| Substring(Int32, Int32) | Retrieves a substring from this instance. The substring starts at a specified character position and has a specified length.             |

With the starting position only overload, we can do.

```cs
mystring.Substring(mystring.Length - N);
```

But the above code will fail in case `mystring` length is lower than the 'N'. So considering that case, lets have an extension method,

```cs
public static string GetLast(this string source, int numberOfChars)
{
    if(numberOfChars >= source.Length)
      return source;
    return source.Substring(source.Length - numberOfChars);
}
```

And you can use the above like,

```cs
mystring.GetLast(5)
```

This extension method is now part of the [Code.Library](https://code-library.abhith.net) Nuget package.
