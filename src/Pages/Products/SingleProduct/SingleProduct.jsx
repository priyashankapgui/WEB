import React, { useEffect, useState } from 'react';
import Layout from "../../../Components/Layout/Layout";
import './SingleProduct.css';
import { Box } from '@mui/material';
import ItemCard from "../../../Components/Card/Card";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { size } from 'lodash';
import { fontSize, style, width } from '@mui/system';

const boxStyle = {
  width: '1180px',
  height: '530px',
  borderRadius: '10px',
  bgcolor: '#FFFFFF',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
  border: '1px solid rgba(0, 0, 0, 0.1)', 
  display: 'flex',
  flexDirection: 'row',
  marginTop:'11.25em'
};

const innerBoxStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRight: '1px solid rgba(0, 0, 0, 0.1)',
  height: '530px',
};

const innerBoxStyleLast = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
};

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`);
        const { data } = response.data; 
        console.log("p1",response);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async (item) => {
    try {
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  if (!product) {
    return null;
  }

  return (
    <Layout>
      <div className='singleproducts'>
        <Box style={boxStyle}>
          <div style={innerBoxStyle}>
            <img src={product.image} alt={product.productName} style={{ width: '80%', height: 'auto' }} />
          </div>
          <div style={innerBoxStyleLast}>
            <ItemCard
            className="singleproductCard"
             LablePrice={product.sellingPrice ? formatPrice(product.sellingPrice) : 'LKR 000.00'}
              LableProductName={product.productName}
              quarterLabel={product.discount ? `${product.discount}%` : 'No Discount'}
              showButton={true}
              showRating={true}
              showQuarter={true}
              productId={productId}
              buttonProps={{
                type: 'submit',
                id: 'AddtoCartbtn',
                btnHeight: '2.0em',
                btnWidth: '10em',
                alignSelf: 'center',
                style: { backgroundColor: '#2EB072', color: '#EBEBEB' },
                
              }}
              buttonLabel='Add to Cart'
              onAddToCart={() => handleAddToCart(product)}
              cardStyles={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                fontSize: '1.5em',

                
              }}

              quarterCircleProps={{
                

                
              
               } }
              showImage={false}
            />
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default SingleProduct;