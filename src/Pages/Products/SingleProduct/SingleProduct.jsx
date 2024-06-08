import React from "react";
import Layout from "../../../Components/Layout/Layout";
import './SingleProduct.css';
import { Box } from '@mui/material';

export default function SingleProduct() {
  return (
    <Layout>
      <div className="products">
        <h1>Single Products</h1>
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      />
      </div>
    </Layout>
  );
}
