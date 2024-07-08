import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Layout from "../../Components/Layout/Layout";
import Body from "../../Components/Body/Body";
import InputLabel from "../../Components/InputLable/InputLable";
import Square from "../../Components/Square/Square";
import itemsData from "../../data/items.json";
import Carousel from "../../Components/Carousels/Slider";
import Slick from "../../Components/Slick/Slick";
import ProductCards from "../../Components/productCards/productCards";
import MainSpiner from "../../Components/Spiner/MainSpiner/MainSpiner";

export default function Home() {
  const { category } = itemsData;
  const [categoryPosition, setCategoryPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const categoryLength = category.length;

  useEffect(() => {
    const fetchHomePageItems = async () => {
      try {
        const branchName = localStorage.getItem('selectedBranch');
      
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/product-branch?branchName=${branchName}`
        );
        console.log("response", response);
        setItems(response.data); // Assuming the response data is an array of items
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchHomePageItems();

  }, []);

  const handlePreviousCategory = () => {
    setCategoryPosition(
      (prevPosition) => (prevPosition - 1 + categoryLength) % categoryLength
    );
  };

  const handleNextCategory = () => {
    setCategoryPosition((prevPosition) => (prevPosition + 1) % categoryLength);
  };

  return (
    <div className="home">
      {loading ? (
        <MainSpiner />
      ) : (
        <Layout>

          <div>
              <Carousel />
            </div>
          <Body>
           

            <div className="title">
              <Square size={5} color="#62C96D" marginRight={2.5} />
              <InputLabel
                htmlFor="example"
                color="black"
                fontSize="1.4em"
                fontWeight={500}
                lineHeight="1.5"
              >
                Today Sales
              </InputLabel>
            </div>

            <div className="itemsCards">
              <ProductCards items={items} />
            </div>

            <div className="title">
              <Square size={5} color="#62C96D" marginRight={2.5} />
              <InputLabel
                htmlFor="example"
                color="black"
                fontSize="1.4em"
                fontWeight={500}
                lineHeight="1.5"
              >
                Categories
              </InputLabel>
            </div>

            <div>
              <Slick
                handlePrevious={handlePreviousCategory}
                handleNext={handleNextCategory}
              />
            </div>

            <div className="endImage">
              {itemsData.endImage.map((endImg, index) => (
                <div key={index} className="endImage">
                  <img
                    src={`https://flexflowstorage01.blob.core.windows.net/webimage/endimage(${0}).png`}
                    alt="Background"
                    className="end1"
                  />
                  <img
                    src={`https://flexflowstorage01.blob.core.windows.net/webimage/endimage(${1}).png`}
                    alt="Overlay"
                    className="end2"
                  />
                </div>
              ))}
            </div>
          </Body>
        </Layout>
      )}
    </div>
  );
}
