
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Buttons from '../Button/Buttons';
import InputLabel from '../InputLable/InputLable';
import CustomRating from '../CustomRating/CustomRating';

export default function ItemCard({  image, buttonProps,buttonLabel, cardStyles ,LablePrice,LableProductName,LabelProductWeight}) {
  
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ maxWidth: '30vh', maxHeight: 'fit-content',borderRadius: '8px',  boxShadow: '0 9px 10px rgba(0,0,0,0.5)',textAlign: 'center', ...cardStyles }}>
    
      <CardMedia
        component="img"
        height="50vh"
        width="10v"
        image={image}
        alt="Paella dish"
        sx={{paddingBottom:'5vh'}}
      />
   
      <InputLabel
    htmlFor="example"
    color="black"
    fontFamily="Poppins"
    fontSize="1em"
    fontWeight={700}
    lineHeight="1.5"
  >
  {LablePrice}</InputLabel>

      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingTop:'0vh' }}>
      <InputLabel
    htmlFor="example"
    color="black"
    fontFamily="Poppins"
    fontSize="0.8em"
    fontWeight={200}
    lineHeight="1.5"
    marginTop="10px"
    marginBottom="20px"
  >Product :
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
  >{LableProductName}
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
  >{LabelProductWeight}
    </InputLabel>

    <CustomRating
        value={value}
        onChange={handleChange}
        legend="reviews :"

        sx={{fontSize:'5px'}}
      />
         
     
        <Buttons {...buttonProps}>{buttonLabel}</Buttons>
      </CardContent>
    </Card>
  );
}


  

