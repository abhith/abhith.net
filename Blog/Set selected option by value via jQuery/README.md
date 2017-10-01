# [Set selected option by value via jQuery](https://www.abhith.net/post/set-selected-option-by-value-via-jquery/)
## Post Attributes
### Tags
Razor, MVC, jQuery
### Categories
JavaScript
### Excerpt
This article describes how to set the selected option in a select by its value via jQuery.
### Published Date
2017-08-19 12:27:24
## Content
In one of my projects, there is a search page which has few filters including linked selects, i.e the options displayed in a child select is dependent upon the option selected in another (parent). (like when we choose a country (parent), we have to show the states under the selected country in the child.)

After selecting both select, when we submit the search, it loads search result page with same filters above. The problem is that the child select value is not retained. Since when we assign the parent select selected value, it will trigger an ajax call and its response is bound to the child select.

To retain the filters as users selected, we had to set the selected value in the child select also. My child select is (Razor)
```
@Html.DropDownList("childSelectName", items, new { @name = "someName" })
```
And inside my ajax call on parent select on change, after binding all the available option to the child select,
```javascript
 if (selectedChildItemId) {
    $("#childSelectName").val(selectedChildItemId);
 }
 ```
In short,
```javascript
$("#Controls_ID").val(value);
```
Replace the Controls_ID with your select tag Id and value with the selected item value.

## Image
### Post Image
![Post Image](greg-rakozy-129733.jpg) 
### Post Header Image
![Post Header Image]()

## Meta Tags
### Social Description
This article describes how to set the selected option in a select by its value via jQuery.

