# [Sitefinity - Caching issue for pages with NO CACHING profile](post url)
## Post Attributes
### Tags

### Categories
Sitefinity
### Excerpt

### Published Date

## Content
### Markdown
## ISSUE
We have a page "Application" for which we set view permission to allow only users having role "USERS". (i.e only USERS can access the page).

Once USERS logged in, we are redirecting them to the Application page, once they are logged out, we are redirecting them back to home page. 

The problem is after logout and they redirected to homepage, if they hit BACK button in the browser, the Application page is still accessible (from CACHE), and if we reload, then only it redirects to the login page.

The Application page caching is set to NO Caching in the Sitefinity but still this behavior.

The expecting behavior is once user logged out and if they hit back button, we need to redirect to the login page.
## Solution
You must go to the No Cache profile's parameters, to do that go to 
> Administration > Settings > Advanced > System > Output Cache Settings > Page Cache Profiles > No Caching > Parameters and click Create new.

On the page that loads enter:
> Key: setNoStore
> Value: True
Then Save changes

Now click on the No Caching Profile, scroll to the bottom of the page and click the "Enabled" checkbox, then Save changes.

Now Sitefinity must be restarted.

This should fix the issue you are having.
## Image
### Post Image
![Post Image](no-caching-settings.png) 
### Post Header Image
![Post Header Image]()

## Meta Tags
### Social Description

