import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

const PreviewCompatibleImage = ({ imageInfo }) => {
  const imageStyle = {
    // borderRadius: "5px"
  };
  const { alt = "", childImageSharp, image, className } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        style={imageStyle}
        alt={alt}
        className="center-image" />
    );
  }

  if (!!childImageSharp) {
    return (
      <GatsbyImage
        image={childImageSharp.gatsbyImageData}
        style={imageStyle}
        alt={alt}
        className="center-image" />
    );
  }

  if (!!image && typeof image === "string")
    return (
      <img style={imageStyle} src={image} alt={alt} className={className} />
    );

  return null;
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    className: PropTypes.string,
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object
  }).isRequired
};

export default PreviewCompatibleImage;
