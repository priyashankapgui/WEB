import React from "react";
import "./Products.css";
import axios from "axios";
import { BrowserRouter as Route, Link } from 'react-router-dom';
import InputLabel from "../../../Components/InputLable/InputLable";
import Square from "../../../Components/Square/Square";
import Layout from "../../../Components/Layout/Layout";
import Body from "../../../Components/Body/Body";
import ProductCards from "../../../Components/productCards/productCards";


//Discount Fetch Data 
const fetchProductsPageDiscuntItems = async () => {
  const [productResponse, priceResponse, discountResponse] = await Promise.all([
    axios.get('http://localhost:8080/products'),
    axios.get('http://localhost:8080/productGRNweb'),
    axios.get('http://localhost:8080/productdiscount'),
  ]);

  const productData = productResponse.data.data;
  const priceData = priceResponse.data.data;
  const discountData = discountResponse.data.data;

  const combinedData = productData.map(item => {
    const price = priceData.find(priceItem => priceItem.productId === item.productId);
    const discount = discountData.find(discountItem => discountItem.productId === item.productId);
    return {
      ...item,
      sellingPrice: price ? price.sellingPrice : null,
      discount: discount ? discount.discount : null
    };
  });

  return combinedData;
};




export default function Products() {
  

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
           

            <Link to="/productsall" className="products_ViewAll">View All..</Link>
          </div>
          <div className="itemsCardsProducts">
              {/* Pass fetchHomePageItems as a prop to ProductCards */}
              <ProductCards fetchItems={fetchProductsPageDiscuntItems} />
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
             New Arival
            </InputLabel>
           

            <Link to="/productsall" className="products_ViewAll">View All..</Link>
          </div>
          <div className="itemsCardsProducts">
              {/* Pass fetchHomePageItems as a prop to ProductCards */}
              <ProductCards fetchItems={fetchProductsPageDiscuntItems} />
            </div>
        </div>
      </Body>
    </Layout>
  );
}
