# WWW.ABHITH.NET

[![Netlify Status](https://api.netlify.com/api/v1/badges/ceb3b988-acb1-4f96-9024-62ea791176bc/deploy-status)](https://app.netlify.com/sites/abhith/deploys)

This repo serves the source code for [www.abhith.net](https://www.abhith.net/), and is deployed via [Netlify CMS](https://www.netlifycms.org).

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment, and CDN distribution.

## Features ##

- A simple landing page with blog functionality built with Netlify CMS
- Editabe Pages: Landing, About, Blog-Collection
- Create Blog posts from Netlify CMS
- Tags: Separate page for posts under each tag
- Basic directory organization
- Uses [mundana-theme](https://github.com/wowthemesnet/mundana-theme-jekyll)
- Blazing fast loading times thanks to pre-rendered HTML and automatic chunk loading of JS files
- Uses `gatbsy-image` with Netlify-CMS preview support
- Separate components for everything
- Netlify deploy configuration
- Netlify function support, see `src/lambda` folder
- Perfect score on Lighthouse for SEO, Accessibility and Performance
- ..and more

## Prerequisites

- Node (I recommend using v8.2.0 or higher)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)

# CONTRIBUTING

Contributions are always welcome, no matter how large or small. Before contributing,
please read the [code of conduct](CODE_OF_CONDUCT.md).
