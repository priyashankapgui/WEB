import React, { useState, useEffect } from "react";
import "./Products.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import InputLabel from "../../../Components/InputLable/InputLable";
import Square from "../../../Components/Square/Square";
import Layout from "../../../Components/Layout/Layout";
import Body from "../../../Components/Body/Body";
import ProductCards from "../../../Components/productCards/productCards";


export default function Products() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  // Fetch products with discounts
  useEffect(() => {
    const fetchProductPageItems = async () => {
      try {
        const branchName = localStorage.getItem('selectedBranch');
      
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/product-branch?branchName=${branchName}`
        );
        console.log("response", response);
        
        // Filter items with discounts greater than 0
        const itemsWithDiscounts = response.data.filter(item => item.discount > 0);
        
        setItems(itemsWithDiscounts); // Assuming the response data is an array of items
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    

    fetchProductPageItems();

  }, []);



  return (
    <Layout>
      <Body>
        <div className="products">
          <div className="Products-title">
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
            <Link to="/all-product" className="products_ViewAll">View All..</Link>
          </div>
          <div className="itemsCardsProducts">
          <ProductCards items={items} />
          </div>

          <div className="Products-title">
            <Square size={5} color="#62C96D" marginRight={2.5} />
            <InputLabel
              htmlFor="example"
              color="black"
              fontSize="1.4em"
              fontWeight={500}
              lineHeight="1.5"
            >
              New Arrival
            </InputLabel>
            <Link to="/new-products" className="products_ViewAll">View All..</Link>
          </div>
          <ProductCards items={items} />
        </div>
      </Body>
    </Layout>
  );
}
