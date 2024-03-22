import React, { useRef } from 'react';
import Slider from 'react-slick';
import itemsData from '../../data/items.json';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemCard from "../Card/Card";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

export default function Slick({ handlePrevious, handleNext }) {
    const sliderRef = useRef(null); 

    const { category } = itemsData;
    var settings = {
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
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
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
                <button type="button" onClick={handleClickPrevious} style={{borderRadius: '50%',border:'none',width:'8vh',height:'8vh',boxShadow:'0 5px 7px rgba(0,0,0,0.5)',marginBottom:'6vh'}}>
                    <MdOutlineKeyboardArrowLeft className="icons" style={{fontSize:'8vh'}}/>
                </button>
                <button type="button" onClick={handleClickNext} style={{borderRadius: '50%',border:'none',width:'8vh',height:'8vh',boxShadow:'0 5px 7px rgba(0,0,0,0.5)',marginBottom:'6vh'}}>
                    <MdOutlineKeyboardArrowRight className="icons" style={{fontSize:'8vh'}} />
                </button>
            </div>
            <Slider {...settings} ref={sliderRef} >
                {category.map(category => (
                    <div key={category.id} style={{ margin: '0 20px' }}>
                        <ItemCard
                            name={category.categoryName}
                            image={category.image}
                            cardStyles={{ width: '50%', height: 'auto', backgroundColor: '#DDEFE0', padding: '2px', fontSize: '3vh' }}
                            LableProductName={category.categoryName}
                            showButton={false}
                            showRating={false}
                            showQuarter={false}
                            hoverColor='#67DE7B'
                        />
                    </div>
                ))}
            </Slider>
            
        </div>
    );
}
