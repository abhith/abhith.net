---
templateKey: blog-post
title: GitLab - Clone a repository when 2FA enabled
description: >-
  You need to use a personal access token to clone your repository from GitLab
  when Two Factor authentication is enabled. Which explained here.
author: Abhith Rajan
authorURL: 'http://twitter.com/abhithrajan'
date: '2018-12-19T00:00:00.000Z'
image: /img/gitlab-blog-cover.png
tags:
  - gitlab
  - git
---

I love services which provide extra security. One way to provide such a level security is by using Two Factor Authentication (2FA). GitLab provides 2FA, and I enabled it. After that, cloning a repository will not work in the usual mode,

```bash
    git clone https://gitlab.com/username/projectname.git
```

It will result

```bash
Cloning into 'projectname'...
remote: HTTP Basic: Access denied
remote: You must use a personal access token with 'api' scope for Git over HTTP.
remote: You can generate one at https://gitlab.com/profile/personal_access_tokens
fatal: Authentication failed for 'https://gitlab.com/username/projectname.git/'
```

As the response suggest, we need to create a personal access token.

### Creating a personal access token

1. Log in to your GitLab account.
2. Go to your Profile settings.
3. Go to Access tokens.
4. Choose a name and optionally an expiry date for the token.
5. Choose the desired scopes (api access).
6. Click on Create personal access token.
7. Save the personal access token somewhere safe. Once you leave or refresh the page, you won’t be able to access it again.

Once you have created your personal access token, try cloning by

```bash
    git clone https://oauth2:PERSONAL_ACCESS_TOKEN@gitlab.com/username/projectname.git
```

Replace 'PERSONAL_ACCESS_TOKEN' with the token you have generated.

#### Additional Resources

- [Personal access tokens | GitLab](https://docs.gitlab.com/ce/user/profile/personal_access_tokens.html)
