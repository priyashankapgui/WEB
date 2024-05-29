import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ItemCard from "../Card/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

function PauseOnHover() {
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/product');
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get('http://localhost:8080/product-GRN');
        setPrice(response.data);
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      }
    };

    fetchPrice();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      const response = await axios.post('http://localhost:8080/cartProducts', {
        customerId: 1, // Replace with the actual customer ID
        productId: item.productId,
        quantity: 1, // Replace with the actual quantity if needed
      });
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  const settings = {
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings} style={{ paddingTop: "1%" }}>
        {items.map((item) => (
          <div style={{ margin: "0 9px" }} key={item.productId}>
            <ItemCard
              LablePrice={item.price}
              LableProductName={item.productName}
              // LabelProductWeight={item.weight}
              quarterLabel={item.discount}
              productLable={"Product :"}
              image={item.image}
              imageHeight="180vh"
              imageWidth="40vw"
              buttonProps={{
                type: "submit",
                id: "AddtoCartbtn",
                btnHeight: "2.0em",
                btnWidth: "10em",
                alignSelf: "center",
                style: { backgroundColor: "#2EB072", color: "#EBEBEB" },
              }}
              buttonLabel="Add to Cart"
              cardStyles={{
                width: "16vw",
                height: "55vh",
                backgroundColor: "#FFFFFF",
                paddingTop: "0.5vh",
                paddingBottom: "0.8vh",
              }}
              onAddToCart={() => handleAddToCart(item)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PauseOnHover;
