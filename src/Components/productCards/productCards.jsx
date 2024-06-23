import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ItemCard from "../Card/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import ConnectionWarning from '../Alerts/ConnectionWarning';
import secureLocalStorage from 'react-secure-storage';

const ProductCards = ({ items, customerId: propCustomerId, selectedBranchId: propBranchId }) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [customerId, setCustomerId] = useState(propCustomerId || null);
  const [selectedBranchId, setSelectedBranchId] = useState(propBranchId || null);

  useEffect(() => {
    if (!customerId) {
      const user = secureLocalStorage.getItem("user");
      if (user && user.customerId) {
        setCustomerId(user.customerId);
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
      // Retrieve cart items from localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const itemIndex = cartItems.findIndex(cartItem => cartItem.productId === item.productId);

      if (itemIndex === -1) {
        // Add new item to cart with quantity 1
        cartItems.push({ ...item, quantity: 1 });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Save item in backend
        const response = await axios.post('http://localhost:8080/cart-items/add', {
          customerId, // Using the customerId from state
          productId: item.productId,
          productName: item.productName,
          batchNo: item.batchNo,
          branchId: selectedBranchId,  // Send branchId from state
          sellingPrice: item.sellingPrice,
          quantity: 1,
          discount: item.discount
        });

        // Show alert on success
        setAlertMessage('Item added to cart!');
      } else {
        // Show alert that item is already in cart
        setAlertMessage('Item is already in the cart!');
      }
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
          <div style={{ margin: "0 9px" }} key={item.productId}>
            <ItemCard
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
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductCards;
