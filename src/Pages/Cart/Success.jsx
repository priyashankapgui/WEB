import React, { useState } from 'react';
import { Box, Container } from '@mui/system';
import './Success.css';   
import { FcOk } from "react-icons/fc";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const billbutton = {
  backgroundColor: "rgb(24, 111, 101)",
  marginTop: "3%",
}

function Success() {
  const navigate = useNavigate();
  const [onlineBillNo, setOnlineBillNo] = useState('GAL-B24000001'); // Set your actual bill number here

  const handleGetBill = async () => {
    try {
      const response = await axios.post('http://localhost:8080/addproductstobill', { onlineBillNo });
      if (response.status === 200) {
        console.log(response.data);
        navigate('/bill'); 
      } else {
        console.error('Failed to get the bill.');
      }
    } catch (error) {
      console.error('An error occurred while getting the bill:', error);
    }
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
