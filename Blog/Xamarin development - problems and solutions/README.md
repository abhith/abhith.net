# [Xamarin development - problems and solutions](https://www.abhith.net/post/xamarin-development-problems-and-solutions/)
## Post Attributes
### Tags
Xamarin, Visual-Studio
### Categories
Xamarin
### Excerpt
Here I am listing the problems I faced during Xamarin development and the solutions that worked for me.
### Published Date

## Content
### Markdown
I have a side project, [piggyvault](http://piggyvault.in) aka piggy, which is basically my personal finance management app. Have a web application for the same as well as a mobile app built using Ionic, specifically Ionic 3.

First did it on Ionic 1, then upgraded to 2 and now it is running on Ionic 3. People have a tendency to get bored, so when I get bored I tried to build an app for my piggy using Xamarin.

Initially tried Xamarin.Android, it was tough though. I didn't have any previous experience in XAML. Once I completed a CRUD module in Xamarin.Android, found the evolve app built using Xamarin.Forms and I were pretty impressed.

So, stopped Xamarin.Android and cloned evolve app and did implement few of my app features in the Xamarin.Form version and it runs smooth.

But recently I switched my dev machine. And now facing two problems related to Xamarin development.

- #1: <strike>First one, the already working solution not building on the new machine, No resource found that matches the given name "Theme.AppCompat.Light" and similar 100+ errors during build.</strike>
- #2:<strike>Secondly, Couldn't able to sign into my Xamarin account from visual studio 17 preview.</strike>

And am stuck.

Hoping to find solutions for both.

Hoping is a bad idea.

Trying...

#### Update 1:
I reported the problem to VisualStudio developer community and here is the [link](https://developercommunity.visualstudio.com/content/problem/106582/unable-to-sign-in-to-xamarin-account-unhandled-act.html)

#### Update 2: 
**Solution for #2**: I was trying login in VS 2017 Preview 15.4.0 and it wasn't working. After adding the Xamarin related feature pack to my 15.3.3 stable VS 2017, I tried the login in it and it worked. Then checked the login status in VS preview and that was also in the same state as in the stable.

#### Update 3:
**Solution for #1**: I read [this](https://forums.xamarin.com/discussion/59017/no-resource-found-that-matches-the-given-name-theme-appcompat-light) on Xamarin forms, and as AbdiRahman mentioned there, I deleted the Xamarin directory in this path C:\Users\username\AppData\Local\  and then opened the solution, rebuild and it worked.

## Image
### Post Image
![Post Image](account-login-error.png) 
### Post Header Image
![Post Header Image](tommy-lisbin-316755.jpg)

## Meta Tags
### Social Description
Here I am listing the problems I faced during Xamarin development and the solutions that worked for me.
