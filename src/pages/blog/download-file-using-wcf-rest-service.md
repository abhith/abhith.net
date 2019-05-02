---
templateKey: blog-post
title: Download file using WCF REST Service
description: Download file using WCF Service
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2018-03-07T08:55:00.000Z
image: /img/florian-klauer-489-unsplash.jpg
tags:
  - wcf
  - rest
  - dotnet
---
Recently, We deployed a web application in a load balanced environment. And one of the features in the app was to download some data as excel and it was working fine in DEV (as usual) but keep failing in the PROD. When I checked it on the individual servers, all worked fine but not under SLB (Software Load Balancing).

So I reviewed the code and found out that there are two requests being sent, one after another, one for generating the file in the server and another one for fetching the generated file. Pretty bad implementation, right?
When is under load balanced environment, the first request may be served from one server and the second from another server. And there was no shared storage space (we used OSS). No sticky session either. So file generated in one server and it is being requested in another server which leads to 404.

To solve, We had to combine both, i.e generate the file and serve it on the same request. To do that, our code look like this,

#### Service Contract Interface

<pre style="font-family:Fantasque Sans Mono;font-size:13;color:gainsboro;background:#1e1e1e;">[<span style="color:lightblue;">WebGet</span>(<span style="color:violet;">UriTemplate</span>&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;<span style="color:#d69d85;">&quot;{cultureName}/download/{someId}&quot;</span>)]
[<span style="color:lightblue;">OperationContract</span>]
<span style="color:lightblue;">Stream</span>&nbsp;<span style="color:cyan;">GetReportByDate</span>(<span style="color:#569cd6;">string</span>&nbsp;cultureName,&nbsp;<span style="color:#569cd6;">string</span>&nbsp;someId);</pre>
Of course it is a HTTP GET method. And the implementation looks like below,

<pre style="font-family:Fantasque Sans Mono;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:#569cd6;">public</span>&nbsp;<span style="color:lightblue;">Stream</span>&nbsp;<span style="color:cyan;">GetReportByDate</span>(<span style="color:#569cd6;">string</span>&nbsp;cultureName,&nbsp;<span style="color:#569cd6;">string</span>&nbsp;someId)
{
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">try</span>
&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#b4b4b4;">...</span>
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#57a64a;">//&nbsp;Generate&nbsp;file&nbsp;the&nbsp;usual&nbsp;way</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">var</span>&nbsp;filePath&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;<span style="color:#ff3333;">SomeWayGenerateFileAndReturnFilePath</span>();
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">if</span>&nbsp;(<span style="color:lightblue;">WebOperationContext</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">Current</span>&nbsp;<span style="color:#b4b4b4;">!=</span>&nbsp;<span style="color:#569cd6;">null</span>)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:lightblue;">WebOperationContext</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">Current</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">OutgoingResponse</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">Headers</span>[<span style="color:#d69d85;">&quot;Content-Disposition&quot;</span>]&nbsp;<span style="color:#b4b4b4;">=</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#d69d85;">&quot;attachment;&nbsp;filename=&quot;</span>&nbsp;<span style="color:#b4b4b4;">+</span>&nbsp;<span style="color:#ff3333;">fileNameWithExtension</span>;
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:lightblue;">WebOperationContext</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">Current</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">OutgoingResponse</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">ContentType</span>&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;<span style="color:#d69d85;">&quot;application/octet-stream&quot;</span>;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">return</span>&nbsp;<span style="color:lightblue;">File</span><span style="color:#b4b4b4;">.</span><span style="color:cyan;">OpenRead</span>(filePath);
&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">catch</span>&nbsp;(<span style="color:lightblue;">Exception</span>&nbsp;exception)
&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">throw</span>&nbsp;<span style="color:#569cd6;">new</span>&nbsp;<span style="color:lightblue;">WebProtocolException</span>(<span style="color:lightblue;">HttpStatusCode</span><span style="color:#b4b4b4;">.</span><span style="font-weight:bold;color:violet;">InternalServerError</span>,&nbsp;<span style="color:cyan;">$</span><span style="color:#d69d85;">&quot;ERROR:&nbsp;Operation&nbsp;faild.&nbsp;</span>{exception<span style="color:#b4b4b4;">.</span><span style="color:violet;">Message</span>}<span style="color:#d69d85;">&quot;</span>,&nbsp;exception<span style="color:#b4b4b4;">.</span><span style="color:violet;">InnerException</span>);
&nbsp;&nbsp;&nbsp;&nbsp;}
}
</pre>

Here **ContentType**  can be whatever it is, if you know it.  **application/octet-stream** is appropriate for entitites whose sole intended purpose is to be saved to disk.
If you only generates say PDF, then the content type part can be changed to,

<pre style="font-family:Fantasque Sans Mono;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:lightblue;">WebOperationContext</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">Current</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">OutgoingResponse</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">Headers</span>[<span style="color:#d69d85;">&quot;Content-Disposition&quot;</span>]&nbsp;<span style="color:#b4b4b4;">=</span>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#d69d85;">&quot;attachment;&nbsp;filename=MyFileName.pdf&quot;</span>;
<span style="color:lightblue;">WebOperationContext</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">Current</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">OutgoingResponse</span><span style="color:#b4b4b4;">.</span><span style="color:violet;">ContentType</span>&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;<span style="color:#d69d85;">&quot;application/pdf&quot;</span>;</pre> 

That's it.
