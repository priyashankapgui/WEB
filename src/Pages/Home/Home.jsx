import React, { useState } from 'react';
import './Home.css';
import Layout from '../../Components/Layout/Layout';
import Body from '../../Components/Body/Body';
import InputLabel from '../../Components/InputLable/InputLable';
import Square from '../../Components/Square/Square';
import itemsData from '../../data/items.json';
import Carousel from '../../Components/Carousels/Slider';
import Slick from '../../Components/Slick/Slick';
import PauseOnHover from '../../Components/productCards/productCards';

export default function Home() {
  const { items, category } = itemsData; 
  const [categoryPosition, setCategoryPosition] = useState(0);
  const categoryLength = category.length;
  

  const handlePreviousCategory = () => {
    setCategoryPosition(prevPosition => (prevPosition - 1 + categoryLength) % categoryLength);
  };

  const handleNextCategory = () => {
    setCategoryPosition(prevPosition => (prevPosition + 1) % categoryLength);
    console.log("2");
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

        

           <div className='itemsCards' >
              <PauseOnHover/>

        
          </div>  

          <div className="title">
            <Square size={5} color="#62C96D" marginRight={2.5} />
            <InputLabel htmlFor="example" color="black" fontSize="1.4em" fontWeight={500} lineHeight="1.5">
              Categories
            </InputLabel>
          </div>


          <div className=''>
          <Slick 
          
                        handlePrevious={handlePreviousCategory}
                        handleNext={handleNextCategory}
                   />

          </div>

        </Body>
      </Layout>
    </div>
  );
}
