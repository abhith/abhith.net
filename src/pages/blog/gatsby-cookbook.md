---
templateKey: blog-post
title: Gatsby - Cookbook
description: >-
  This cookbook contains recipes that demonstrate how to solve common problems
  while working with Gatsby. 
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2019-04-26T20:00:00.000Z
lastModificationTime: 2019-05-03T15:00:00.000Z
image: /img/logo-gatsby.jpeg
tags:
  - gatsby
  - cookbook
  - react
---

I <3 Gatsby. This article contains some recipes which will be useful if you are into Gatsby for your next static site. Recipes are,

- [Using Google fonts in Gatsby](#using-google-fonts-in-gatsby)
- [Using icons like Font Awesome in Gatsby](#using-icons-like-font-awesome-in-gatsby)
- [Disqus integration in a Gatsby website](#disqus-integration-in-a-gatsby-website)

#### Using Google fonts in Gatsby

Import the font css on your site main css file.

Using [gatsby-plugin-prefetch-google-fonts](https://www.gatsbyjs.org/packages/gatsby-plugin-prefetch-google-fonts/).

- Install the plugin `gatsby-plugin-prefetch-google-fonts`

```bash
yarn add gatsby-plugin-prefetch-google-fonts
```

- Modify `gatsby-config.js`.  Inside the plugins array, add

```js
{
  resolve: `gatsby-plugin-prefetch-google-fonts`,
  options: {
    fonts: [
      {
        family: `Oswald`,
        subsets: [`latin`],
      },
      {
        family: `Open Sans`,
        variants: [`400`, `700`]
      },
    ],
  },
}
```

You can change the font family and variants or number of fonts in the above configuration according to your website needs.

#### Using icons like Font Awesome in Gatsby

Using [react-icons](https://github.com/react-icons/react-icons).

Add it to your packages.

```bash
npm install react-icons --save
```

And in your react component

```jsx
import { FaBeer } from 'react-icons/fa';

class Question extends React.Component {
  render() {
    return <h3> Lets go for a <FaBeer />? </h3>
  }
}
```

#### Disqus integration in a Gatsby website

Since **Gatsby** is built on top of **React**, we can use the React package for **Disqus**.

```bash
yarn add disqus-react
```

And in your post component

```js
import { DiscussionEmbed } from 'disqus-react'
```

Define the **Disqus** configuration like

```js
const disqusConfig = {
 shortname: `yourDisqusShortName`,
 config: { identifier: slug, title },
}
```

Here `identifier` is the unique id for your post, it can be anything.

And now you can render the Disqus section by adding

```jsx
<DiscussionEmbed {...disqusConfig} />
```

More recipes will be added as I explore **Gatsby**.
