import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemCard from "../Card/Card";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getAllCategory } from "../../Api/CategoryApi/CategoryApi";
import { Link } from "react-router-dom";


export default function Slick({ handlePrevious, handleNext }) {
  const sliderRef = useRef(null);
  const [categories, setCategories] = useState([]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategory();
        setCategories(data.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
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

  const handleClickPrevious = () => {
    sliderRef.current.slickPrev();
    handlePrevious();
  };

  const handleClickNext = () => {
    sliderRef.current.slickNext();
    handleNext();
  };

  return (
    <div>
      <div className="arrowBtn">
        <button
          type="button"
          onClick={handleClickPrevious}
          style={{ marginBottom: "6vh", background: "none", border: "none" }}
        >
          <IoIosArrowBack className="icons" style={{ fontSize: "7vh" }} />
        </button>
        <button
          type="button"
          onClick={handleClickNext}
          style={{ marginBottom: "6vh", background: "none", border: "none" }}
        >
          <IoIosArrowForward className="icons" style={{ fontSize: "7vh" }} />
        </button>
      </div>
      <Slider {...settings} ref={sliderRef}>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.categoryId} style={{ margin: "0 20px" }}>
              <Link to={`/category/${category.categoryId}`} style={{ margin: "0 9px" }} key={category.categoryId}>
              <ItemCard
                name={category.categoryName}
                image={category.image}
                cardStyles={{
                  width: "50%",
                  height: "auto",
                  backgroundColor: "#DDEFE0",
                  padding: "2px",
                  fontSize: "3vh",
                }}
                LableProductName={category.categoryName}
                showButton={false}
                showRating={false}
                showQuarter={false}
                hoverColor="#67DE7B"
               
              />
              </Link>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </Slider>
    </div>
  );
}
