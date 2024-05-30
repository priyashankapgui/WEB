import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ItemCard from "../Card/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

function PauseOnHover() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const productResponse = await axios.get('http://localhost:8080/productweb');
        const productData = productResponse.data;

        const priceResponse = await axios.get('http://localhost:8080/api/productGRNweb');
        const priceData = priceResponse.data;

        const combinedData = productData.map(item => {
          const price = priceData.find(priceItem => priceItem.productId === item.productId);
          return {
            ...item,
            sellingPrice: price ? price.sellingPrice : null
          };
        });

        setItems(combinedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(cartItem => cartItem.productId === item.productId);

    if (itemIndex > -1) {
      cartItems[itemIndex].quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
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
              LablePrice={item.sellingPrice ? formatPrice(item.sellingPrice) : "N/A"}
              LableProductName={item.productName}
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
              onAddToCart={() => handleAddToCart(item)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PauseOnHover;
