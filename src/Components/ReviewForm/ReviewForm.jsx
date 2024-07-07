import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import InputLabel from "../InputLable/InputLable";

export default function ReviewForm({ productId, onReviewSubmitted }) {
  const [value, setValue] = useState(0);

  const handleSubmit = async (newValue) => {
    let requestBody;

    switch (newValue) {
      case 1:
        requestBody = {
          productId: productId,
          oneStar: 1,
        };
        break;
      case 2:
        requestBody = {
          productId: productId,
          twoStars: 1,
        };
        break;
      case 3:
        requestBody = {
          productId: productId,
          threeStars: 1,
        };
        break;
      case 4:
        requestBody = {
          productId: productId,
          fourStars: 1,
        };
        break;
      case 5:
        requestBody = {
          productId: productId,
          fiveStars: 1,
        };
        break;
      default:
        requestBody = {
          productId: productId,
          rating: newValue,
        };
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
                // key={}
                // htmlFor={``}
                color="black"
                fontFamily="Poppins"
                fontSize="0.8em"
                fontWeight={300}
                lineHeight="2"
                marginTop="2vh"
                marginBottom="20px"
              >
                reviews : {}
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
