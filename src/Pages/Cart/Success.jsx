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
};

function Success() {
  const navigate = useNavigate();
  const [onlineBillNo, setOnlineBillNo] = useState('');

  const handleGetBill = async () => {
    try {
      // First create the online bill
      const createBillResponse = await axios.post('http://localhost:8080/onlineBills', {
        branchId: 'yourBranchId',
        customerId: 'yourCustomerId',
        acceptedBy: 'yourAcceptedBy',
        status: 'yourStatus',
        hopeToPickup: 'yourHopeToPickupDate' // Optional: replace with actual hope to pick up date if needed
      });

      if (createBillResponse.status === 201) {
        const createdBill = createBillResponse.data;
        const { onlineBillNo } = createdBill;

        setOnlineBillNo(onlineBillNo);

        // Now add products to the bill
        const addProductsResponse = await axios.post('http://localhost:8080/addproductstobill', { onlineBillNo });

        if (addProductsResponse.status === 200) {
          console.log(addProductsResponse.data);
          navigate('/bill');
        } else {
          console.error('Failed to add products to the bill.');
        }
      } else {
        console.error('Failed to create the online bill.');
      }
    } catch (error) {
      console.error('An error occurred while creating the bill or adding products:', error);
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
