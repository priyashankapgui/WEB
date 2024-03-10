import React, { useState } from 'react';
import './Home.css';
import Layout from '../../Components/Layout/Layout';
import ItemCard from '../../Components/Card/Card';
import Body from '../../Components/Body/Body';
import InputLabel from '../../Components/InputLable/InputLable';
import Square from '../../Components/Square/Square';
import itemsData from '../../data/items.json';
import Buttons from '../../Components/Button/Buttons';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Carousel from '../../Components/Carousels/Slider';

export default function Home() {
  const { items, category } = itemsData; 
  const [categoryPosition, setCategoryPosition] = useState(0);
  const categoryLength = category.length;

  const handlePreviousCategory = () => {
    setCategoryPosition(prevPosition => (prevPosition - 1 + categoryLength) % categoryLength);
  };

  const handleNextCategory = () => {
    setCategoryPosition(prevPosition => (prevPosition + 1) % categoryLength);
  };

  return (
    <div className="home">
      <Layout>
        <Body>

          <Carousel/>
          
          <div className="title">
            <Square size={5} color="#62C96D" marginRight={2.5} />
            <InputLabel
              htmlFor="example"
              color="black"
              fontSize="1.4em"
              fontWeight={500}
              lineHeight="1.5">
              Today Sales
            </InputLabel>
          </div>

          <div className="productCards">
            {items.map(item => (
              <ItemCard
                key={item.id}
                LablePrice={item.price}
                LableProductName={item.productName}
                LabelProductWeight={item.weight}
                quarterLabel={item.discount}
                productLable={'Product :'}
                image={item.image}
                width="100vh"
                height="100vh"
                buttonProps={{
                  type: 'submit',
                  id: 'AddtoCartbtn',
                  btnHeight: '2.5em',
                  btnWidth: '10em',
                  alignSelf: 'center',
                  style: { backgroundColor: '#2EB072', color: '#EBEBEB' }
                }}
                buttonLabel="Add to Cart"
                cardStyles={{ width: '35vh', height: 'fit-content', backgroundColor: '#FFFFFF', paddingTop: '1.5vh' }}
              />
            ))}
          </div>

          <div className="title">
            <Square size={5} color="#62C96D" marginRight={2.5} />
            <InputLabel htmlFor="example" color="black" fontSize="1.4em" fontWeight={500} lineHeight="1.5">
              Categories
            </InputLabel>
          </div>

          <div className="arrowBtn">
            <Buttons type="button" btnWidth="6vh" btnHeight="6vh" btnRadius="10vh" onClick={handlePreviousCategory}>
              <MdOutlineKeyboardArrowLeft className="icons" />
            </Buttons>

            <Buttons type="button" btnWidth="6vh" btnHeight="6vh" btnRadius="10vh" onClick={handleNextCategory}>
              <MdOutlineKeyboardArrowRight className="icons" />
            </Buttons>
          </div>

          <div className="categoryCards">
            {category.slice(categoryPosition, categoryPosition + 5).map(category => (
              <ItemCard
                key={category.id}
                name={category.categoryName}
                image={category.image}
                cardStyles={{ width: '20vh', height: 'auto', backgroundColor: '#DDEFE0', padding: '2vh', fontSize: '3vh' }}
                width="40vh"
                height="auto"
                LableProductName={category.categoryName}
                showButton={false}
                showRating={false}
                showQuarter={false}
              />
            ))}
          </div>

        </Body>
      </Layout>
    </div>
  );
}
