# [Umbraco Get Current Page in Partial View](https://www.abhith.net/post/umbraco-get-current-page-in-partial-view/)
## Post Attributes
### Tags
Umbraco
### Categories
Umbraco, My-Daily-Google
### Excerpt
This article describes how to get the CurrentPage of Umbraco in a partial view.
### Published Date
2017-08-18 18:39:22
## Content
In my website, the header section is a partial view which basically contains the header menus. The menus initially were same for all the pages across my site but I thought to hide some menu in case the current page is not the homepage.

To do that, I needed to get the current page and check whether the current page is the homepage or not, in the header partial.

To get the current page in partial view,
```razor
@inherits UmbracoTemplatePage
 
@{
    var currentPage = Umbraco.Content(umbraco.NodeFactory.Node.GetCurrent().Id);
}
```
And to check whether it is home page or not, I decided to compare against DocumentTypeAlias as shown below,
```razor
@if (currentPage.DocumentTypeAlias == "home")
{
     // some code
```
And it works.

## Image
### Post Image
![Post Image]() 
### Post Header Image
![Post Header Image]()

## Meta Tags
### Social Description
This article describes how to get the CurrentPage of Umbraco in a partial view.

