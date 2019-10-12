import Layout from "@components/Layout";
import MDXRenderer from "@components/MDX";
import SEO from "@components/seo/SEO";

import { graphql } from "gatsby";
import React from "react";
import { IArticle } from "@types";
// import { YouTube, Twitter, TomatoBox } from "./ui";

// const shortcodes = { YouTube, Twitter, TomatoBox };

export default ({ pageContext }) => {
  console.log(pageContext);

  const { article }: { article: IArticle } = pageContext;
  // const commentId =
  //   post.frontmatter.commentId === null
  //     ? post.fields.slug
  //     : post.frontmatter.commentId;

  return (
    <Layout>
      <div className="blog-post-wrapper">
        <SEO
          title={article.title}
          description={article.excerpt}
          image={article.hero.full.src}
          isBlogPost={true}
          slug={article.slug}
          dateModified={article.dateModifiedSeoFormat}
          datePublished={article.datePublishedSeoFormat}
        />
        <h1>{article.title}</h1>
        <MDXRenderer content={article.body}>
          <h2>TEST</h2>
        </MDXRenderer>
      </div>
    </Layout>
  );
};

// export const pageQuery = graphql`
//   query BlogPostQuery($id: String) {
//     mdx(id: { eq: $id }) {
//       id
//       body
//       fields {
//         slug
//         readingTime {
//           text
//         }
//       }
//       frontmatter {
//         date
//         dateString: date(formatString: "MMMM DD, YYYY")
//         datePublishedSeoFormat: date(formatString: "YYYY-MM-DD")
//         title
//         description
//         tags
//         lastModificationTime
//         lastModificationTimeString: lastModificationTime(
//           formatString: "MMMM DD, YYYY"
//         )
//         dateModifiedSeoFormat: lastModificationTime(formatString: "YYYY-MM-DD")
//         image {
//           childImageSharp {
//             fluid(maxWidth: 2048, quality: 100) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//         commentId
//       }
//     }
//   }
// `;

// import React from "react";
// import { graphql } from "gatsby";
// import { MDXRenderer } from "gatsby-plugin-mdx";
// export default function PageTemplate({ data: { mdx } }) {
//   return (
//     <div>
//       <h1>{mdx.frontmatter.title}</h1>
//       <MDXRenderer>{mdx.body}</MDXRenderer>
//     </div>
//   );
// }
// export const pageQuery = graphql`
//   query BlogPostQuery($id: String) {
//     mdx(id: { eq: $id }) {
//       id
//       body
//       frontmatter {
//         title
//       }
//     }
//   }
// `;
