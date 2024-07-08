// ProductCards.jsx
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ItemCard from "../Card/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import ConnectionWarning from '../Alerts/ConnectionWarning';
import secureLocalStorage from 'react-secure-storage';
import ReviewForm from "../ReviewForm/ReviewForm";
import { padding, textAlign } from "@mui/system";

const ProductCards = ({ items, customerId: propCustomerId, selectedBranchId: propBranchId }) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [customerId, setCustomerId] = useState(propCustomerId || null);
  const [selectedBranchId, setSelectedBranchId] = useState(propBranchId || null);

  useEffect(() => {
    if (!customerId) {
      const user = secureLocalStorage.getItem("user");

      if (user && user.customerId) {
        setCustomerId(user.customerId);
        console.log("userid", customerId);
      } else {
        setAlertMessage("Customer ID not found. Please log in again.");
      }
    }

    if (!selectedBranchId) {
      const branchId = localStorage.getItem('selectedBranchId');
      if (branchId) {
        setSelectedBranchId(branchId);
      } else {
        setAlertMessage("Selected branch ID not found. Please select a branch.");
      }
    }
  }, [customerId, selectedBranchId]);

  const handleAddToCart = async (item) => {
    if (!customerId) {
      setAlertMessage("Customer ID not found. Please log in again.");
      return;
    }

    if (!selectedBranchId) {
      setAlertMessage("Selected branch ID not found. Please select a branch.");
      return;
    }

    try {
      // Save item in backend
      const response = await axios.post('http://localhost:8080/cart-items/add', {
        customerId,
        productId: item.productId,
        productName: item.productName,
        batchNo: item.batchNo,
        branchId: selectedBranchId,
        sellingPrice: item.sellingPrice,
        quantity: 1,
        discount: item.discount,
        customerId: customerId
      });

      // Show alert on success
      setAlertMessage('Item added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
        setAlertMessage(`Failed to add item to cart: ${error.response.data.message}`);
      } else {
        setAlertMessage('Failed to add item to cart.');
      }
    }
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
      <ConnectionWarning message={alertMessage} />
      <Slider {...settings} style={{ paddingTop: "1%" }}>
        {items.map((item) => (
          <ItemCard
            key={item.productId}
            LablePrice={item.sellingPrice ? formatPrice(item.sellingPrice) : "LKR 000.00"}
            LableProductName={item.productName}
            quarterLabel={item.discount ? `${item.discount}%` : "0%"}
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
            productId={item.productId}
            viewItemLink={`single-product/${item.productId}`}
            lableViewItem={'View Item...'}
          />
        ))}
      </Slider>
    </div>
  );
}

export default ProductCards;
