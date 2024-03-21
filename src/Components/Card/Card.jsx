import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CustomRating from '../CustomRating/CustomRating';
import Buttons from '../Button/Buttons';
import InputLabel from '../InputLable/InputLable';
import styled from 'styled-components';

const HoverCard = styled(Card)`
  position: relative;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background-color: ${(props) => props.hoverColor || 'none'}; /* Change to desired hover color */
  }
`;

const QuarterCircle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px; 
  height: 50px; 
  background-color: ${(props) => props.bgColor || '#2fc763e8'}; 
  border-top-left-radius: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ItemCard({
  image,
  width,
  height,
  cardStyles,
  LablePrice,
  LableProductName,
  LabelProductWeight,
  productLable,
  quarterLabel,
  buttonLabel,
  buttonProps,
  showButton = true,
  showRating = true,
  showQuarter = true,
  quarterCircleProps,
  hoverColor // New prop for hover color
}) {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <HoverCard
      sx={{
        position: 'relative', 
        width: '35vh',
        height: 'fit-content',
        borderRadius: '8px',
        boxShadow: '0 9px 10px rgba(0,0,0,0.5)',
        textAlign: 'center',
        paddingBottom:'0',
        ...cardStyles
      }}
      hoverColor={hoverColor} // Pass hover color prop to HoverCard styled component
    >

      <CardMedia 
        component="img"
        image={image}
        alt="Product"
        width={width}  
        height={height}
      />
      
      {showQuarter && (
        <QuarterCircle {...quarterCircleProps}>
          <InputLabel
            htmlFor="example"
            color="#FFFFFF"
            fontFamily="Poppins"
            fontSize="0.9em"
            fontWeight={500}
            lineHeight="1.5"
          >
            {quarterLabel}
          </InputLabel>
        </QuarterCircle>
      )}

      <InputLabel
        htmlFor="example"
        color="black"
        fontFamily="Poppins"
        fontSize="1em"
        fontWeight={700}
        lineHeight="1.5"
      >
        {LablePrice}
      </InputLabel>

      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '0vh',
          paddingBottom:'0vh'
        }}
      >
        <InputLabel
          htmlFor="example"
          color="black"
          fontFamily="Poppins"
          fontSize="0.8em"
          fontWeight={200}
          lineHeight="1.5"
          marginTop="10px"
          marginBottom="20px"
        >
          {productLable}
        </InputLabel>

        <InputLabel
          htmlFor="example"
          color="black"
          fontFamily="Poppins"
          fontSize="0.8em"
          fontWeight={200}
          lineHeight="1.5"
          marginTop="10px"
          marginBottom="20px"
        >
          {LableProductName}
        </InputLabel>

        <InputLabel
          htmlFor="example"
          color="black"
          fontFamily="Poppins"
          fontSize="0.8em"
          fontWeight={200}
          lineHeight="1.5"
          marginTop="10px"
          marginBottom="20px"
        >
          {LabelProductWeight}
        </InputLabel>

        {showRating && <CustomRating value={value} onChange={handleChange} legend="reviews :" sx={{ fontSize: '5px' ,paddingBottom:'2vh'}} />}

        {showButton && <Buttons  {...buttonProps}>{buttonLabel}</Buttons>}
      </CardContent>
    </HoverCard>
  );
}
