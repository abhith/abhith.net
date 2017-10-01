# [Get/Set hidden field value using jQuery](https://www.abhith.net/post/getset-hidden-field-value-using-jquery/)
## Post Attributes
### Tags
jQuery, SharePoint
### Categories
JavaScript
### Excerpt
This article explains how to set and get hidden field value using jQuery.
### Published Date
2017-10-01 08:17:29
## Content
### Markdown
When we can achieve the same thing using many ways, with different frameworks, we tend to forget one or two such ways. Same thing happened to me. The task is simple, to set and get hidden field value in client side in a SharePoint project.

Like I mentioned, it can be done easily using jQuery, 
### SET 

<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:cyan;">$</span>(<span style="color:#d69d85;">&#39;#</span><span style="color:lightskyblue;">hiddenFieldControlId</span><span style="color:#d69d85;">&#39;</span>).<span style="color:cyan;">val</span>(<span style="color:violet;">valueToBeAssigned</span>);
</pre>


### GET
<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:#569cd6;">var</span>&nbsp;<span style="color:violet;">hiddenFieldValue</span>&nbsp;<span style="color:#b4b4b4;">=</span>&nbsp;<span style="color:cyan;">$</span>(<span style="color:#d69d85;">&#39;#</span><span style="color:lightskyblue;">hiddenFieldControlId</span><span style="color:#d69d85;">&#39;</span>).<span style="color:cyan;">val</span>();
</pre>

That's it. Replace the **hiddenFieldControlId** with the **id** attribute value of your hidden field and make sure **jQuery** referenced in the page.
## Image
### Post Image
![Post Image](greg-rakozy-129733.jpg) 
### Post Header Image
![Post Header Image]()

## Meta Tags
### Social Description
This article explains how to set and get hidden field value using jQuery.
