import React from "react";
import { graphql, StaticQuery } from "gatsby";

const TopicImage = ({ slug }) => (
  <StaticQuery
    query={graphql`
      query {
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

      if (topicImageName === "" || topicImageName === null) {
        topicImageName = noImageName;
      }
      const imageAlt = tagNode ? tagNode.node.title : "No Image";

      const pathToImage = `/img/topics/${topicImageName}`;
      return (
        <figure className="image">
          <img src={pathToImage} alt={imageAlt}></img>
        </figure>
      );
    }}
  />
);
export default TopicImage;
