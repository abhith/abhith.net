import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

const PreviewCompatibleImage = ({ imageInfo }) => {
  const imageStyle = {
    // borderRadius: "5px"
  };
  const { alt = "", childImageSharp, image, className } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <Img
        style={imageStyle}
        fluid={image.childImageSharp.fluid}
        alt={alt}
        className="center-image"
      />
    );
  }

  if (!!childImageSharp) {
    return (
      <Img
        style={imageStyle}
        fluid={childImageSharp.fluid}
        alt={alt}
        className="center-image"
      />
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
