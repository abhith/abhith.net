# [Sitefinity : Read localized resource labels in MVC widget](https://www.abhith.net/post/sitefinity-read-localized-resource-labels-in-mvc-widget/)
## Post Attributes
### Tags
MVC, Razor, Sitefinity-Rookie-Guide 
### Categories
Sitefinity 
### Excerpt
Explains how to get localized labels in Sitefinity MVC widgets.
### Published Date
2017-12-07 00:52:55
## Content
### Markdown
In your Razor View,
<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:black;background:#ffffb3;">@</span><span style="color:violet;">Html</span><span style="color:#b4b4b4;">.</span><span style="color:cyan;">Resource</span>(<span style="color:#d69d85;">&quot;ResourceLabel&quot;</span>,&nbsp;<span style="color:#d69d85;">&quot;ResourceName&quot;</span>)
</pre>

In the above code, replace **ResourceLabel** with the **key** and **ResourceName** with the **type**, you used to create the label in the **Sitefinity** CMS. Make sure **Telerik.Sitefinity.Frontend.Mvc.Helpers** namespace is imported in the view. i.e

<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:black;background:#ffffb3;">@</span><span style="color:#569cd6;">using</span>&nbsp;<span style="color:lightblue;">Telerik</span><span style="color:#b4b4b4;">.</span><span style="color:lightblue;">Sitefinity</span><span style="color:#b4b4b4;">.</span><span style="color:lightblue;">Frontend</span><span style="color:#b4b4b4;">.</span><span style="color:lightblue;">Mvc</span><span style="color:#b4b4b4;">.</span><span style="color:lightblue;">Helpers</span>;
</pre>

#### Sample usage 
<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:gray;">&lt;</span><span style="color:#569cd6;">li</span><span style="color:gray;">&gt;</span>&nbsp;<span style="color:gray;">&lt;</span><span style="color:#569cd6;">a</span>&nbsp;<span style="color:#9cdcfe;">href</span><span style="color:#b4b4b4;">=</span><span style="color:#c8c8c8;">&quot;/&quot;</span><span style="color:gray;">&gt;</span><span style="color:black;background:#ffffb3;">@</span><span style="color:violet;">Html</span><span style="color:#b4b4b4;">.</span><span style="color:cyan;">Resource</span>(<span style="color:#d69d85;">&quot;Home&quot;</span>,&nbsp;<span style="color:#d69d85;">&quot;PageResources&quot;</span>)<span style="color:gray;">&lt;/</span><span style="color:#569cd6;">a</span><span style="color:gray;">&gt;&lt;/</span><span style="color:#569cd6;">li</span><span style="color:gray;">&gt;</span>
</pre>


## Image
### Post Image
![Post Image](create-label-sitefinity.png) 
### Post Header Image
![Post Header Image]()

## Meta Tags
### Social Description
Explains how to get localized labels in Sitefinity MVC widgets.
