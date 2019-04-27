---
templateKey: blog-post
title: Gatsby - Cookbook
description: >-
  This cookbook contains recipes that demonstrate how to solve common problems
  while working with Gatsby. 
author: Abhith Rajan
authorURL: 'https://twitter.com/abhithrajan'
date: 2019-04-26T20:00:00.000Z
image: /img/logo-gatsby.jpeg
tags:
  - gatsby
  - cookbook
---
Following recipes included in this article,

- [Using Google fonts in Gatsby](#using-google-fonts-in-gatsby)
- [Using icons like Font Awesome in Gatsby](#using-icons-like-font-awesome-in-gatsby)

#### Using Google fonts in Gatsby

Import it on your style. i.e in your css file

```css
@import url("https://fonts.googleapis.com/css?family=Lora:400,400i,700");
```

#### Using icons like Font Awesome in Gatsby

Using `react-icons`. Add it to your packages. 

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

