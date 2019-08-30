import React from "react";
import Img from "gatsby-image";
import { graphql, StaticQuery } from "gatsby";

const TopicImage = ({ slug }) => (
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
        allTopicsJson {
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
      const tagNode = data.allTopicsJson.edges.find(
        edge => edge.node.slug === slug
      );

      const noImageName = "no-topic-image.png";

      let topicImageName = tagNode ? tagNode.node.image : noImageName;
      // empty string check
      if (topicImageName === "" || topicImageName === null) {
        topicImageName = noImageName;
      }
      const imageAlt = tagNode ? tagNode.node.title : "No Image";

      // console.log(`${slug} - ${topicImageName}`);

      const image = data.allImageSharp.edges.find(
        edge => edge.node.fluid.originalName === topicImageName
      );

      if (!image) {
        return null;
      }

      return (
        <figure className="image">
          <Img fluid={image.node.fluid} alt={imageAlt} />
        </figure>
      );
    }}
  />
);
export default TopicImage;
