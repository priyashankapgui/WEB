import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import InputLabel from '../InputLable/InputLable';
import Body from '../Body/Body';

export default function ReviewForm({ productId }) {
  const [value, setValue] = useState(0);
  const [averageRating, setAverageRating] = useState(null);

  const fetchAverageRating = async () => {

    try {
      const response = await axios.post(`http://localhost:8080/review/product`,{productId : productId});
      console.log("This",response);
      setAverageRating(response.data[0].averageRating);
    } catch (error) {
      console.error('Failed to fetch average rating:', error);
    }
  };


  useEffect(() => {
    console.log("pd",productId);
   

    fetchAverageRating();
  }, [productId]);
  

  const handleSubmit = async (newValue) => {
    let requestBody;
    console.log(newValue);
    switch (newValue) {
      case 1:
        requestBody = { productId, oneStar: 1 };
        break;
      case 2:
        requestBody = { productId, twoStars: 1 };
        break;
      case 3:
        requestBody = { productId, threeStars: 1 };
        break;
      case 4:
        requestBody = { productId, fourStars: 1 };
        break;
      case 5:
        requestBody = { productId, fiveStars: 1 };
        break;
      default:
        requestBody = { productId, rating: newValue };
    }

    try {
      await axios.put(`http://localhost:8080/review/add`, requestBody);

      fetchAverageRating();
      
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <InputLabel
        color="black"
        fontFamily="Poppins"
        fontSize="2vh"
        fontWeight={300}
        lineHeight="2"
        marginTop="2vh"
        marginBottom="20px"
      >
        review : {averageRating !== null ? averageRating.toFixed(1) : 'Loading...'}
      </InputLabel>
      <Rating
        name="custom-rating"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleSubmit(newValue);
        }}
      />
    </Box>
  );
}

ReviewForm.propTypes = {
  productId: PropTypes.string.isRequired,

};
