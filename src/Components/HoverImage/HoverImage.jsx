import React, { useState } from "react";
import itemsData from "../../data/items.json";

const HoverImage = ({ images }) => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const { image, hoverSlide } = itemsData;

  // Define the styles with transition
  const imageStyle = {
    width: "200px",
    height: "200px",
    transition: "transform 0.8s ease-in-out",
  };

  const hoveredImageStyle = {
    ...imageStyle,
    transform: "scale(1.1)", // Example: scale the image when hovered
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {images.map((image, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredImage(index)}
          onMouseLeave={() => setHoveredImage(null)}
          style={{ display: "inline-block", margin: "10px" }}
        >
          <img
            src={hoveredImage === index ? image.hoverSrc : image.defaultSrc}
            alt={image.alt}
            style={hoveredImage === index ? hoveredImageStyle : imageStyle}
          />
        </div>
      ))}
    </div>
  );
};

export default HoverImage;
