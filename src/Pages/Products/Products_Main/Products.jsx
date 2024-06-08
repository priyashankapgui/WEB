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
  const [discountedProducts, setDiscountedProducts] = useState([]);

  // Fetch products with discounts
  const fetchProductsPageDiscuntItems = async () => {
    try {
      setLoading(true);

      const [productResponse, priceResponse, discountResponse] = await Promise.all([
        axios.get('http://localhost:8080/products'),
        axios.get('http://localhost:8080/product-batch-sum'),
        axios.get('http://localhost:8080/product-batch-sum'),
      ]);

      const productData = productResponse.data.data;
      const priceData = priceResponse.data;
      const discountData = discountResponse.data;

      const combinedData = productData.map(item => {
        const price = priceData.find(priceItem => priceItem.productId === item.productId);
        const discount = discountData.find(discountItem => discountItem.productId === item.productId);
        return {
          ...item,
          sellingPrice: price ? price.sellingPrice : null,
          discount: discount ? discount.discount : null
        };
      });

      const discountedProducts = combinedData.filter(item => item.discount !== null);

      setDiscountedProducts(discountedProducts);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsPageDiscuntItems();
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
            <ProductCards items={discountedProducts} />
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
            <Link to="/productsall" className="products_ViewAll">View All..</Link>
          </div>
          <div className="itemsCardsProducts">
            <ProductCards items={discountedProducts} />
          </div>
        </div>
      </Body>
    </Layout>
  );
}
