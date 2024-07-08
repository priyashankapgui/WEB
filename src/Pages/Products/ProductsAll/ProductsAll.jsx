import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from "../../../Components/Layout/Layout";
import Body from "../../../Components/Body/Body";
import InputLabel from "../../../Components/InputLable/InputLable";
import Square from "../../../Components/Square/Square";
import ItemCard from "../../../Components/Card/Card";
import "./ProductsAll.css";
import MainSpiner from "../../../Components/Spiner/MainSpiner/MainSpiner";

export default function ProductsAll({ customerId: propCustomerId, selectedBranchId: propBranchId }) {

  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [customerId, setCustomerId] = useState(propCustomerId || null);
  const [selectedBranchId, setSelectedBranchId] = useState(propBranchId || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductPageItems = async () => {
      try {
        const branchName = localStorage.getItem('selectedBranch');

        const response = await axios.get(
          `http://localhost:8080/product-branch?branchName=${branchName}`
        );
        console.log("response", response);

        // Filter items with discounts greater than 0
        const itemsWithDiscounts = response.data.filter(item => item.discount > 0);

        setItems(itemsWithDiscounts); // Assuming the response data is an array of items
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProductPageItems();
  }, []);

  const handleAddToCart = async (item) => {
    console.log('Adding to cart:', item);
    // Add your logic to handle adding items to cart here
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <MainSpiner />
      </div>
    );
  }

  return (
    <Layout>
      <Body>
        <div className="productsAll">
          <div className="ProductsAll-title">
            <Square size={5} color="#62C96D" marginRight={2.5} />
            <InputLabel
              htmlFor="example"
              color="black"
              fontSize="1.4em"
              fontWeight={500}
              lineHeight="1.5"
            >
              Discounts
            </InputLabel>
          </div>

          <div className="CategoryPageProducts">
            {alertMessage && <p className="alert-message">{alertMessage}</p>}

            {Array.isArray(items) && items.length > 0 ? (
              items.map((item) => (
                <ItemCard
                  key={item.id} // Add a unique key for each item
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
              ))
            ) : (
              <p>No discounted products available.</p>
            )}
          </div>
        </div>
      </Body>
    </Layout>
  );
}
