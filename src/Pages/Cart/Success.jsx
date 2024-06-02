import React from 'react';
import { Box, Container } from '@mui/system';
import './Success.css';   
import { FcOk } from "react-icons/fc";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const billbutton = {
  backgroundColor: "rgb(24, 111, 101)",
  marginTop: "3%",
}

function Success() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetBill = () => {
    navigate('/bill'); // Navigate to the bill page
  };

  return (
    <div>
      <Container maxWidth="sm" className="centered-box-container">
        <Box className="centered-box">
          <FcOk className="success-icon" />
          <h1 className="success">Payment Successful!</h1>
          <Button style={billbutton} variant="contained" onClick={handleGetBill}>Get the bill</Button>
        </Box>
      </Container>
    </div>
  );
}

export default Success;
