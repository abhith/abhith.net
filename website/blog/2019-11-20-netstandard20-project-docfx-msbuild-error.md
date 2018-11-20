---
title: .netstandard2.0 Project - DocFX MSBuild Error 
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
# authorFBID: 661277173
---

If you are facing issues when trying to generate documentation for your .netstandard2.0 project. Try the solution mentioned in this post.

<!--truncate-->

I tried to generate documentation for a [.netstandard2.0](https://github.com/Abhith/Code.Library) project using DocFX. 

- Installed DocFX using chocolatey package.
- Created a sample project using command line.

```bash
docfx init
```

- Updated the docfx.json w.r.t the folder structure.
- Build the website using command line.

```bash
docfx --serve
```

The DocFX site builded but project specific documentation not generated. And there were some warnings like

> Warning:No metadata is generated for ProjectName

> SDK "Microsoft.NET.Sdk" not found

### Solution

Set environment variable **MSBuildSDKsPath** pointing right to the SDK path. In my case,

>  C:\Program Files\dotnet\sdk\2.1.500\Sdks

After setting the environment variable, closed the command line (VS Code) and re opened. Tried building the DocFX again and it worked.

#### Additional Resources

- [DocFX implementation on .netstandard2.0 project Code.Library - Refer the "docs" folder](https://github.com/Abhith/Code.Library)