import React from 'react';
import styled from 'styled-components';

// Define a styled component for the square
const SquareDiv = styled.div`
  width: ${props => props.size}vh;
  height: ${props => props.size}vh;
  background-color: ${props => props.color || 'green'};
  margin-right: ${props => props.marginRight || '0'}vh;

`;

// Square component
const Square = ({ size, color,marginRight }) => {
  return <SquareDiv size={size} color={color} marginRight={marginRight}></SquareDiv>;
};

export default Square;
