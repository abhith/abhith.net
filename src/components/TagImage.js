import React from "react";
import Img from "gatsby-image";
import { graphql, StaticQuery } from "gatsby";

const TagImage = ({ tagSlug }) => (
  <StaticQuery
    query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp
                originalName
              }
            }
          }
        }
        allTagsJson {
          edges {
            node {
              slug
              image
              title
            }
          }
        }
      }
    `}
    render={data => {
      const tagNode = data.allTagsJson.edges.find(
        edge => edge.node.slug === tagSlug
      );

      const tagImageName = tagNode ? tagNode.node.image : "no-tag-image.png";
      const imageAlt = tagNode ? tagNode.node.title : "No Image";

      const image = data.allImageSharp.edges.find(
        edge => edge.node.fluid.originalName === tagImageName
      );

      if (!image) {
        return null;
      }

      return <Img fluid={image.node.fluid} alt={imageAlt} />;
    }}
  />
);
export default TagImage;
