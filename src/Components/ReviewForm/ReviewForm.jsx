import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import InputLabel from '../InputLable/InputLable';

export default function ReviewForm({ productId, onReviewSubmitted }) {
  const [value, setValue] = useState(0);
  const [averageRating, setAverageRating] = useState(null);


  

  const handleSubmit = async (newValue) => {
    let requestBody;

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
      if (onReviewSubmitted) {
        onReviewSubmitted(newValue);
      }
  
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
        fontWeight={400}
        lineHeight="2"
        marginTop="2vh"
        marginBottom="20px"
      >
         review: {}
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
  onReviewSubmitted: PropTypes.func,
};
