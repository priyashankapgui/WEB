import React, { useState } from 'react';
import itemsData from '../../data/items.json';


const HoverImage = ({ images }) => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const { image,hoverSlide  } = itemsData; 

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {images.map((image, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredImage(index)}
          onMouseLeave={() => setHoveredImage(null)}
          style={{ display: 'inline-block', margin: '10px' }}
        >
          <img
            src={hoveredImage === index ? image.hoverSrc : image.defaultSrc}
            alt={image.alt}
            style={{ width: '200px', height: '200px' }}
          />
        </div>
      ))}
    </div>
  );
};

export default HoverImage;
