import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import SchemaOrg from "./schema-org";
function SEO({
  description,
  lang,
  meta,
  title,
  image,
  isBlogPost,
  slug,
  dateModified,
  datePublished,
}) {
  const { site, posts, stories, videos, services } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author {
              name
            }
            image
            siteUrl
            social {
              twitter
            }
          }
        }
        videos: allVideosJson {
          totalCount
        }
        stories: allStoriesJson {
          totalCount
        }
        services: allServicesJson {
          totalCount
        }
        posts: allArticle(filter: { draft: { eq: false } }) {
          totalCount
        }
      }
    `
  );

  const sharingText = `Sharing ${posts.totalCount} posts, ${videos.totalCount} videos, ${stories.totalCount} developer stories and ${services.totalCount} tools and services with the world.`;

  const metaDescription =
    description || `${site.siteMetadata.description} ${sharingText}`;

  const ogType = isBlogPost ? `article` : `website`;

  const seoImage = image
    ? `${site.siteMetadata.siteUrl}${image}`
    : site.siteMetadata.image;

  const url = slug
    ? `${site.siteMetadata.siteUrl}${slug}`
    : site.siteMetadata.siteUrl;

  const defaultTitle = `Abhith Rajan - Coder, Blogger, Biker, Full Stack Developer`;

  title = title ? `${title} | ${site.siteMetadata.title}` : defaultTitle;

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
          {
            name: `image`,
            content: seoImage,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: ogType,
          },
          {
            property: `og:url`,
            content: url,
          },
          {
            property: `og:image`,
            content: seoImage,
          },
          {
            name: `twitter:card`,
            content: `summary_large_image`,
          },
          {
            name: `twitter:creator`,
            content: site.siteMetadata.social.twitter,
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
          {
            name: `twitter:image`,
            content: seoImage,
          },
          {
            name: "msapplication-TileImage",
            content: "/img/mstile-150x150.png",
          },
        ].concat(meta)}
        link={[
          {
            rel: "icon",
            type: "image/png",
            href: "/img/favicon-16x16.png",
            sizes: "16x16",
          },
          {
            rel: "icon",
            type: "image/png",
            href: "/img/favicon-32x32.png",
            sizes: "32x32",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "144x144",
            href: "/img/android-chrome-144x144.png",
          },
          {
            rel: "apple-touch-icon",
            type: "image/png",
            sizes: "180x180",
            href: "/img/apple-touch-icon.png",
          },
          {
            rel: "mask-icon",
            href: "/img/safari-pinned-tab.svg",
            color: "#ff4400",
          },
          {
            rel: "me",
            href: "https://twitter.com/abhithrajan",
          },
          {
            rel: "me",
            href: "https://github.com/Abhith",
          },
          {
            rel: "webmention",
            href: "https://webmention.io/www.abhith.net/webmention",
          },
          {
            rel: "pingback",
            href: "https://webmention.io/www.abhith.net/xmlrpc",
          },
        ]}
      />
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={url}
        title={title}
        image={seoImage}
        description={metaDescription}
        datePublished={datePublished}
        dateModified={dateModified}
        siteUrl={site.siteMetadata.siteUrl}
        author={site.siteMetadata.author}
      />
    </>
  );
}

SEO.defaultProps = {
  isBlogPost: false,
  lang: `en`,
  meta: [],
  description: ``,
  image: ``,
  slug: ``,
  datePublished: ``,
  dateModified: ``,
};

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  image: PropTypes.string,
  slug: PropTypes.string,
  datePublished: PropTypes.string,
  dateModified: PropTypes.string,
};

export default SEO;
