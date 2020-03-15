import React from "react";
import Helmet from "react-helmet";

export default React.memo(
  ({
    author,
    siteUrl,
    datePublished,
    dateModified,
    description,
    image,
    isBlogPost,
    organization,
    title,
    url
  }) => {
    const baseSchema = [
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        "@id": "https://wwww.abhith.net#organization",
        name: "Abhith Rajan",
        url: "https://wwww.abhith.net",
        sameAs: ["https://twitter.com/abhithrajan"],
        legalName: "Abhith Rajan",
        logo: {
          "@type": "ImageObject",
          url: "https://wwww.abhith.net/img/android-chrome-144x144.png",
          width: 144,
          height: 144
        },
        founder: {
          "@type": "Person",
          name: "Abhith Rajan",
          image: {
            "@type": "ImageObject",
            url: "https://www.abhith.net/img/abhith.jpg",
            width: 300,
            height: 300
          }
        }
      },
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "@id": "https://wwww.abhith.net#website",
        url: "https://wwww.abhith.net",
        name: "Abhith Rajan",
        alternateName: "Full Stack Developer | Abhith Rajan",
        author: {
          "@id": "https://wwww.abhith.net#organization"
        }
      },
      {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "@id": url,
        url,
        headline: title,
        description,
        publisher: {
          "@id": "https://wwww.abhith.net#organization"
        },
        sourceOrganization: {
          "@id": "https://wwww.abhith.net#organization"
        }
      }
    ];

    const schema = isBlogPost
      ? [
          ...baseSchema,
          {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": url,
                  name: title,
                  image
                }
              }
            ]
          },
          {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            url,
            name: title,
            headline: title,
            image: {
              "@type": "ImageObject",
              url: image
            },
            description,
            author: {
              "@id": "https://wwww.abhith.net#organization"
            },
            publisher: {
              "@id": "https://wwww.abhith.net#organization"
            },
            mainEntityOfPage: {
              "@type": "WebSite",
              "@id": siteUrl
            },
            datePublished,
            dateModified: dateModified ? dateModified : datePublished
          }
        ]
      : baseSchema;

    return (
      <Helmet>
        {/* Schema.org tags */}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
    );
  }
);
