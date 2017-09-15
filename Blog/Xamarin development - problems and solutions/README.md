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
Following are the list of problems I am addressing here.

- #1: <strike>No resource found that matches the given name "Theme.AppCompat.Light" and similar 100+ errors during build.</strike>
- #2: <strike>Couldn't able to sign into my Xamarin account from visual studio 2017 preview.</strike>
- #3: Packaging error - “jarsigner.exe” exited with code 1

The striked items indicates that I have found solutions for them.

Solutions that worked for me explained below,

#### Solution for #1: No resource found that matches the given name "Theme.AppCompat.Light" and similar 100+ errors during build.
I read [this](https://forums.xamarin.com/discussion/59017/no-resource-found-that-matches-the-given-name-theme-appcompat-light) on Xamarin forms, and as AbdiRahman mentioned there, I deleted the Xamarin directory in this path C:\Users\username\AppData\Local\  and then opened the solution, rebuild and it worked.

#### Solution for #2: Couldn't able to sign into my Xamarin account from visual studio 2017 preview. 
I was trying login in VS 2017 Preview 15.4.0 and it wasn't working. After adding the Xamarin related feature pack to my 15.3.3 stable VS 2017, I tried the login in it and it worked. Then checked the login status in VS preview and that was also in the same state as in the stable.

##### Update 1:
I reported the problem #2 to VisualStudio developer community and here is the [link](https://developercommunity.visualstudio.com/content/problem/106582/unable-to-sign-in-to-xamarin-account-unhandled-act.html)

#### Solution for #3: Packaging error - “jarsigner.exe” exited with code 1
Working on it...

## Image
### Post Image
![Post Image](account-login-error.png) 
### Post Header Image
![Post Header Image](tommy-lisbin-316755.jpg)

## Meta Tags
### Social Description
Here I am listing the problems I faced during Xamarin development and the solutions that worked for me.
