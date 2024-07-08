import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/system';
import './Success.css';
import { FcOk } from "react-icons/fc";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";
import { createOnlineBill } from '../../Api/OnlineBillApi/OnlineBillApi';
import { addProductsToBill } from '../../Api/OnlineBillProductsApi/OnlineBillProductsApi';
import MainSpiner from '../../Components/Spiner/MainSpiner/MainSpiner';

const billbutton = {
  backgroundColor: "rgb(24, 111, 101)",
  marginTop: "3%",
};

function Success() {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false); 

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
      setLoading(true);
      const branchId = localStorage.getItem('selectedBranchId');
      if (!branchId || !customerId) {
        alert("Branch ID or Customer ID is missing. Please check your inputs.");
        setLoading(false); 
        return;
      }

      const onlineBillData = {
        branchId,
        customerId,
        status: 'New',
        hopeToPickup: new Date().toISOString()
      };

      const createBillResponse = await createOnlineBill(onlineBillData);

      if (createBillResponse) {
        const onlineBillNo = createBillResponse.onlineBillNo;

        const addProductsResponse = await addProductsToBill(onlineBillNo);

        if (addProductsResponse) {
          setLoading(false); 
          navigate(`/bill/${onlineBillNo}`);
        } else {
          console.error('Failed to add products to the bill.');
          setLoading(false); 
        }
      } else {
        console.error('Failed to create the online bill.');
        setLoading(false); 
      }
    } catch (error) {
      console.error('An error occurred while creating the bill:', error);
      setLoading(false); 
    }
  };

  return (
    <div>
      {loading && <MainSpiner loading={loading} />} 
      {!loading && (
        <Container maxWidth="sm" className="centered-box-container">
          <Box className="centered-box">
            <FcOk className="success-icon" />
            <h1 className="success">Payment Successful!</h1>
            <Button style={billbutton} variant="contained" onClick={handleGetBill}>Get the bill</Button>
          </Box>
        </Container>
      )}
    </div>
  );
}

export default Success;
