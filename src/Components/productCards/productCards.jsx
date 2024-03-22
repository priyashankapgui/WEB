
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import itemsData from '../../data/items.json';
import ItemCard from "../Card/Card";
import React, { Component } from "react";
import Slider from "react-slick";
import { Row } from "react-bootstrap";

function PauseOnHover() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const { items } = itemsData; 
  return (
    <div className="slider-container">
      <Slider {...settings}>
      
            {items.map(item => (
              <div  style={{ margin: '0 9px'}}>
              <ItemCard
                key={item.id}
                LablePrice={item.price}
                LableProductName={item.productName}
                LabelProductWeight={item.weight}
                quarterLabel={item.discount}
                productLable={'Product :'}
                image={item.image}
                width="100vh"
                height="100vh"
                buttonProps={{
                  type: 'submit',
                  id: 'AddtoCartbtn',
                  btnHeight: '2.5em',
                  btnWidth: '10em',
                  alignSelf: 'center',
                  style: { backgroundColor: '#2EB072', color: '#EBEBEB' }
                }}
                buttonLabel="Add to Cart"
                cardStyles={{ width: '30vh', height: '50vh', backgroundColor: '#FFFFFF', paddingTop: '1.5vh' }}
              />
              </div>
            ))}
         
         
      </Slider>
    </div>
  );
}

export default PauseOnHover;
