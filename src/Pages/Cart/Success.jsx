  import React, { useState, useEffect } from 'react';
  import { Box, Container } from '@mui/system';
  import './Success.css';   
  import { FcOk } from "react-icons/fc";
  import Button from '@mui/material/Button';
  import { useNavigate } from 'react-router-dom'; 
  import axios from 'axios';
  import secureLocalStorage from "react-secure-storage";

  const billbutton = {
    backgroundColor: "rgb(24, 111, 101)",
    marginTop: "3%",
  };

  function Success() {
    const navigate = useNavigate();
    const [customerId, setCustomerId] = useState('');

    useEffect(() => {
      if (!customerId) {
        const user = secureLocalStorage.getItem("user");
        if (user && user.customerId) {
          setCustomerId(user.customerId);
        } else {
          alert("Customer ID not found. Please log in again.");
        }
      }
    }, [customerId]);

    const handleGetBill = async () => {
      try {
        const branchId = localStorage.getItem('selectedBranchId');
        if (!branchId || !customerId) {
          alert("Branch ID or Customer ID is missing. Please check your inputs.");
          return;
        }

        const createBillResponse = await axios.post('http://localhost:8080/onlineBills', {
          branchId,
          customerId,
          acceptedBy: 'someAcceptedBy', 
          status: 'New',
          hopeToPickup: new Date().toISOString()
        });

        if (createBillResponse.status === 201) {
          const onlineBillNo = createBillResponse.data.onlineBillNo;

          // Perform add products to bill
          const addProductsResponse = await axios.post('http://localhost:8080/addproductstobill', {
            onlineBillNo
          });

          if (addProductsResponse.status === 200) {
            navigate(`/bill/${onlineBillNo}`);
          } else {
            console.error('Failed to add products to the bill.');
          }
        } else {
          console.error('Failed to create the online bill.');
        }
      } catch (error) {
        console.error('An error occurred while creating the bill:', error);
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
