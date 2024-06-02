import React from 'react';
import { Box, Container } from '@mui/system';
import './Cancel.css';   
import { CgDanger } from "react-icons/cg";
import Button from "@mui/material/Button";

const returnbutton ={
  backgroundColor: "#008000",
  marginTop: "3%",
}

function Success() {
  return (
    <div>
      <Container maxWidth="sm" className="centered-box-container">
        <Box className="centered-box">
          <CgDanger  className="success-icon" />
          <h1 className='cancel'>Payment Cancelled!</h1>
          <Button style={returnbutton} variant="contained" color="success" onClick={() => { window.location.href = "/";}}>
        Return To Shop
      </Button>
        </Box>
        
      </Container>
    </div>
  )
}

export default Success;
