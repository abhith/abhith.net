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

      const noImageName = "no_image_available.svg";

      let topicImageName = tagNode ? tagNode.node.image : noImageName;
      // empty string check
      if (topicImageName === "" || topicImageName === null) {
        topicImageName = noImageName;
      }
      const imageAlt = tagNode ? tagNode.node.title : "No Image";

      // console.log(`${slug} - ${topicImageName}`);

      var ext = topicImageName.substr(topicImageName.lastIndexOf(".") + 1);

      if (ext === "svg") {
        const pathToImage = `/img/topics/${topicImageName}`;
        return (
          <figure className="image">
            <img src={pathToImage} alt={imageAlt}></img>
          </figure>
        );
      }

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
