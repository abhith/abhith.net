# [Check if string is Arabic - C#](https://www.abhith.net/post/check-if-string-is-arabic-c/)
## Post Attributes
### Tags
Localization, Arabic, C-Sharp, Regex
### Categories
C-Sharp
### Excerpt
In one simple line of code, we can check whether the given string is Arabic or not, in C#.
### Published Date
2017-09-06 11:50:41
## Content
### Markdown
I have pretty good experience in bilingual web app development, especially in English & Arabic languages. The challenge with switching website page from English to Arabic is not just the content translation, the whole layout need to be changed and the text direction for all need to be RTL where as for English it need to be LTR.

We developed this one app [socialboard](https://socialboard.io) which aggregates content from social medias and displays in a single place. Initially, we focused only on English content so everything in LTR even though some aggregated content was in Arabic. But then we got some clients whose primary language is Arabic. i.e most of the content of their social media was in Arabic.

So we had to do some changes, UX team prepared the RTL layout for displaying content. The development team had to classify content (i.e to flag them isRTL or not) during creation and use proper layout based on isRTL field value of the content.

To classify, or to check whether the given content language is Arabic or not, we used the following extension method,
<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:#608b4e;">///</span><span style="color:#608b4e;">&nbsp;</span><span style="color:#608b4e;">&lt;</span><span style="color:#608b4e;">summary</span><span style="color:#608b4e;">&gt;</span>
<span style="color:#608b4e;">///</span><span style="color:#608b4e;">&nbsp;To&nbsp;check&nbsp;whether&nbsp;the&nbsp;given&nbsp;string&nbsp;is&nbsp;Arabic.</span>
<span style="color:#608b4e;">///</span><span style="color:#608b4e;">&nbsp;</span><span style="color:#608b4e;">&lt;/</span><span style="color:#608b4e;">summary</span><span style="color:#608b4e;">&gt;</span>
<span style="color:#608b4e;">///</span><span style="color:#608b4e;">&nbsp;</span><span style="color:#608b4e;">&lt;</span><span style="color:#608b4e;">param</span><span style="color:#c8c8c8;">&nbsp;name</span><span style="color:#608b4e;">=</span><span style="color:#c8c8c8;">&quot;</span>input<span style="color:#c8c8c8;">&quot;</span><span style="color:#608b4e;">&gt;&lt;/</span><span style="color:#608b4e;">param</span><span style="color:#608b4e;">&gt;</span>
<span style="color:#608b4e;">///</span><span style="color:#608b4e;">&nbsp;</span><span style="color:#608b4e;">&lt;</span><span style="color:#608b4e;">returns</span><span style="color:#608b4e;">&gt;</span><span style="color:#608b4e;">Returns&nbsp;True&nbsp;if&nbsp;Arabic</span><span style="color:#608b4e;">&lt;/</span><span style="color:#608b4e;">returns</span><span style="color:#608b4e;">&gt;</span>
<span style="color:#569cd6;">public</span>&nbsp;<span style="color:#569cd6;">static</span>&nbsp;<span style="color:#569cd6;">bool</span>&nbsp;<span style="color:cyan;">IsRtl</span>(<span style="color:#569cd6;">this</span>&nbsp;<span style="color:#569cd6;">string</span>&nbsp;input)
{
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#569cd6;">return</span>&nbsp;<span style="color:lightblue;">Regex</span><span style="color:#b4b4b4;">.</span><span style="color:cyan;">IsMatch</span>(input,&nbsp;<span style="color:#d69d85;">@&quot;</span><span style="color:#62ccff;">\p{IsArabic}</span><span style="color:#d69d85;">&quot;</span>);
}</pre>

And it is now part of my [Code.Library](https://github.com/Abhith/Code.Library) package ValidationHelper module.

If you know any better way to check if the string is Arabic in C#, let me know in the comments.

## Image
### Post Image
![Post Image]() 
### Post Header Image
![Post Header Image]()

## Meta Tags
### Social Description
In one simple line of code, we can check whether the given string is Arabic or not, in C#.

