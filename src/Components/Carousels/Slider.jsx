import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slider.css";
import items from "../../data/items.json";

export default function Slider() {
  return (
    <div>
      <Carousel
        className="mainSlide"
        autoPlay={true}
        interval={3000}
        showArrows={false}
        showThumbs={false}
        infiniteLoop={true}
      >
        {items.slide.map((item) => (
          <div key={item.id}>
            <img
              src={item.imageUrl}
              height="650px"
              width="500px"
              alt={`img${item.id}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
