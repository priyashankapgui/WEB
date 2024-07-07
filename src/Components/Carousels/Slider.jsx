import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slider.css";
// import items from "../../data/items.json";


export default function Slider() {

  const items = [0,1,2,3,4];
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
        {items.map((item) => (
          <div key={item.id}>
            <img
              src={`https://flexflowstorage01.blob.core.windows.net/webimage/carosel(${item}).png`}
              height="650px"
              width="100%"
              alt={`img${item.id}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
