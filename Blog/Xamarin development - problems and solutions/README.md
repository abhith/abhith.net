# [Xamarin development - problems and solutions](https://www.abhith.net/post/xamarin-development-problems-and-solutions/)
## Post Attributes
### Tags
Visual-Studio, Xamarin-Forms, C-Sharp 
### Categories
Xamarin
### Excerpt
Here I am listing the problems that I faced during mobile app development using Xamarin (Now focused on Xamarin Forms) and the solutions that worked for me.
### Published Date

## Content
### Markdown
Following are the list of problems I am addressing here.

- #1: <strike>No resource found that matches the given name "Theme.AppCompat.Light" and similar 100+ errors during build.</strike>
- #2: <strike>Couldn't able to sign into my Xamarin account from visual studio 2017 preview.</strike>
- #3: <strike>Packaging error - “jarsigner.exe” exited with code 1</strike>
- #4: <strike>Project not selected to build for this solution configuration</strike>
- #5: <strike>GoogleServicesJson BuildAction missing</strike>
- #6: <strike>App runs in debug mode, crashes in release mode</strike>

The strikethrough text indicates that I have found solutions for them.

Solutions that worked for me explained below,

#### Solution for #1: No resource found that matches the given name "Theme.AppCompat.Light" and similar 100+ errors during build.
I read [this](https://forums.xamarin.com/discussion/59017/no-resource-found-that-matches-the-given-name-theme-appcompat-light) on Xamarin forms, and as AbdiRahman mentioned there, I deleted the Xamarin directory in this path C:\Users\username\AppData\Local\  and then opened the solution, rebuild and it worked.

#### Solution for #2: Couldn't able to sign into my Xamarin account from visual studio 2017 preview. 
I was trying login in VS 2017 Preview 15.4.0 and it wasn't working. After adding the Xamarin related feature pack to my 15.3.3 stable VS 2017, I tried the login in it and it worked. Then checked the login status in VS preview and that was also in the same state as in the stable.

##### Update 1:
I reported the problem #2 to VisualStudio developer community and here is the [link](https://developercommunity.visualstudio.com/content/problem/106582/unable-to-sign-in-to-xamarin-account-unhandled-act.html)

#### Solution for #3: Packaging error - “jarsigner.exe” exited with code 1
Updated Xamarin.Forms from 2.3.4.247 to 2.3.4.270. Restarted visual studio. Changed configuration to Release. Tried to deploy and it worked. Switched back to Debug configuration and rerun. And it too worked.

#### Solution for #4: Project not selected to build for this solution configuration
Found the solution from this forum [post](https://forums.xamarin.com/discussion/67216/skipped-deploy-configuration-debug-any-cpu-project-not-selected-to-build-for-this-solution-conf). Check your configuration manager and make sure that the "Deploy" box is checked for your target platform. The configuration manager can be found by selecting it from the drop-down arrow next to "Debug".

#### Solution for #5: GoogleServicesJson BuildAction missing
This is the second time I came across this problem. When adding Firebase crash reporting component to our Xamarin forms app, we need to add the **google-services.json** file to the project as well needs to set its build action to "**GoogleServicesJson**". But after adding the file, when checked the available build actions for the file, there is no "**GoogleServicesJson**". In that case, unload the project and then edit the "**.csproj**" file and add the following.
<pre style="font-family:Consolas;font-size:13;color:gainsboro;background:#1e1e1e;"><span style="color:gray;">&lt;</span><span style="color:#569cd6;">ItemGroup</span><span style="color:gray;">&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span><span style="color:#569cd6;">GoogleServicesJson</span><span style="color:gray;">&nbsp;</span><span style="color:#92caf4;">Include</span><span style="color:gray;">=</span><span style="color:gray;">&quot;</span><span style="color:#c8c8c8;">google-services.json</span><span style="color:gray;">&quot;</span><span style="color:gray;">&nbsp;/&gt;</span>
<span style="color:gray;">&nbsp;&nbsp;&lt;/</span><span style="color:#569cd6;">ItemGroup</span><span style="color:gray;">&gt;</span></pre>
Then reload the project. That's it. Check the build action for the file and you can see that it is set to **GoogleServicesJson**.

#### Solution for #6: App runs in debug mode, crashes in release mode
When this issue occurred to me, I thought it is because of any configuration mistakes in my Release configuration but the issue solved by a simple process which is  **Clean** the solution and rebuild.

##### Additional Resources

- [App runs in debug mode, crashes in release mode](https://forums.xamarin.com/discussion/55666/app-runs-in-debug-mode-crashes-in-release-mode)
## Image
### Post Image
![Post Image](account-login-error.png) 
### Post Header Image
![Post Header Image](tommy-lisbin-316755.jpg)

## Meta Tags
### Social Description
Here I am listing the problems that I faced during mobile app development using Xamarin (Now focused on Xamarin Forms) and the solutions that worked for me.
