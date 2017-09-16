# [Event tracking with Google Analytics](https://www.abhith.net/post/event-tracking-with-google-analytics/)
## Post Attributes
### Tags
Google-Analytics, JavaScript 
### Categories
Analytics
### Excerpt
When you want to get metrics related to user interactions on various parts of your website Google Analytics (ga)  event tracking can be helpful and is easy to integrate as well.
### Published Date
2017-08-17 10:27:36
## Content
When you want to get metrics related to user interactions on various parts of your website Google Analytics (ga)  event tracking can be helpful and is easy to integrate as well.

I hope you have already added google analytics tracking script in your master page. If not see the page source of this page and check at the bottom of the page, there you can see some script which is provided by google analytics when we add a website (property) to our account in Google analytics which will track the page views etc for the whole website.

To add event tracking, we need to trigger the following function,
```javascript
ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
```
In which, [eventCategory] and [eventAction] are required fields.

Example usage follows,
```javascript
<a href="tel:1800123456" onclick="ga('send', 'event', 'Phone Call', 'Click/Touch', 'Contact Page');">1800123456</a>
```
The above code will track user interaction with the phone number. As you can see, here the eventCategory is "Phone Call", and eventAction is "Click/Touch". We can use the eventLabel field to improve the metrics by like here is assigned with value "Contact Page" so that we knows how much triggered from that page itself. And for other pages, we can have different eventLabel.

 

## Image
### Post Image
![Post Image](igor-ovsyannykov-329196.jpg) 
### Post Header Image
![Post Header Image](ruthie-163318.jpg)

## Meta Tags
### Social Description
When you want to get metrics related to user interactions on various parts of your website Google Analytics (ga)  event tracking can be helpful and is easy to integrate as well.

