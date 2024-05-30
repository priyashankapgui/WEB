import React, { useState, useEffect } from "react";
import "./Home.css";
import Layout from "../../Components/Layout/Layout";
import Body from "../../Components/Body/Body";
import InputLabel from "../../Components/InputLable/InputLable";
import Square from "../../Components/Square/Square";
import itemsData from "../../data/items.json";
import Carousel from "../../Components/Carousels/Slider";
import Slick from "../../Components/Slick/Slick";
import PauseOnHover from "../../Components/productCards/productCards";
import MainSpiner from "../../Components/Spiner/MainSpiner/MainSpiner";

export default function Home() {
  const { category } = itemsData;
  // eslint-disable-next-line
  const [categoryPosition, setCategoryPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const categoryLength = category.length;

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  // Function to handle previous category navigation
  const handlePreviousCategory = () => {
    setCategoryPosition(
      (prevPosition) => (prevPosition - 1 + categoryLength) % categoryLength
    );
  };

  // Function to handle next category navigation
  const handleNextCategory = () => {
    setCategoryPosition((prevPosition) => (prevPosition + 1) % categoryLength);
    console.log("2");
  };

  return (
    <div className="home">
      {loading ? (
        <MainSpiner />
      ) : (
        <Layout>
          <Body>
            <div>
              <Carousel />
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
                Today Sales
              </InputLabel>
            </div>

            <div className="itemsCards">
              <PauseOnHover />
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
                <div key={index}>
                  <img src={endImg.image1} alt="Background" className="end1" />
                  <img src={endImg.image2} alt="Overlay" className="end2" />
                </div>
              ))}
            </div>
          </Body>
        </Layout>
      )}
    </div>
  );
}
