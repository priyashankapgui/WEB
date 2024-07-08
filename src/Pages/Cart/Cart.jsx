import React, { useEffect, useState } from "react";
import "./Cart.css";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TiDelete } from "react-icons/ti";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Layout from '../../Components/Layout/Layout';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import secureLocalStorage from 'react-secure-storage';
import TermsConditions from "../../Components/Terms&Conditions/Terms&Conditions";
import { getCartItemsByCartId, updateCartItem, deleteCartItem } from '../../Api/CartApi/CartApi'

const style = { color: "red", fontSize: "1.8em", cursor: "pointer" };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Poppins',
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const buttonStyle = {
  padding: '1px 6px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: 'gray',
  color: 'white',
  cursor: 'pointer',
  marginRight: '4px',
};

const qty = {
  padding: '8px 12px',
};

const returnButton = {
  marginLeft: "4%",
  marginTop: "1%",
  fontFamily: "Poppins",
  fontSize: "16px",
  color: "black",
  borderRadius: "10px",
  borderColor: "black",
};

const checkoutButtonEnabled = {
  backgroundColor: "#2FAA3C",
  color: "#fafafa",
  fontSize: "16px",
  fontFamily: "Poppins",
  marginTop: "5%",
  marginRight: "0%",
  marginLeft: "25%",
  cursor: "pointer",
};

const checkoutButtonDisabled = {
  backgroundColor: "gray",
  color: "#fafafa",
  fontSize: "16px",
  fontFamily: "Poppins",
  marginTop: "5%",
  marginRight: "0%",
  marginLeft: "25%",
  cursor: "not-allowed",
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function Cart() {
  const [rows, setRows] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, discount: 0, total: 0 });
  const [alertMessage, setAlertMessage] = useState("");
  const [customerId, setCustomerId] = useState('');
  const [cartId, setCartId] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!customerId) {
      const user = secureLocalStorage.getItem("user");
      console.log("customerId", customerId);
      if (user && user.customerId) {
        setCustomerId(user.customerId);
        setCartId(user.cartId);
      } else {
        setAlertMessage("Customer ID not found. Please log in again.");
      }
    }
  }, [customerId]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!customerId || !cartId) {
        return;
      }

      try {
        const response = await getCartItemsByCartId(cartId);

        if (response.data && response.data.length > 0) {
          setRows(response.data);
        } else {
          setAlertMessage("No items found in the cart.");
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
        setAlertMessage('Failed to fetch cart items.');
      }
    };

    fetchCartItems();
  }, [customerId, cartId]);

  useEffect(() => {
    const calculateTotals = () => {
      let subtotal = 0;
      let totalDiscount = 0;

      rows.forEach(row => {
        const price = row.sellingPrice || 0;
        const rowSubtotal = price * row.quantity;
        subtotal += rowSubtotal;
        totalDiscount += (rowSubtotal * (row.discount / 100));
      });

      const total = subtotal - totalDiscount;

      setTotals({ subtotal, discount: totalDiscount, total });
    };

    calculateTotals();
  }, [rows]);

  const handleIncrement = async (index) => {
    const updatedRows = [...rows];
    updatedRows[index].quantity += 1;
    setRows(updatedRows);

    const cartId = updatedRows[index].cartId;
    const productId = updatedRows[index].productId;

    try {
      await updateCartItem(cartId, productId, {
        quantity: updatedRows[index].quantity,
      });
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const handleDecrement = async (index) => {
    const updatedRows = [...rows];
    if (updatedRows[index].quantity > 1) {
      updatedRows[index].quantity -= 1;
      setRows(updatedRows);

      const cartId = updatedRows[index].cartId;
      const productId = updatedRows[index].productId;

      try {
        await updateCartItem(cartId, productId, {
          quantity: updatedRows[index].quantity,
        });
      } catch (error) {
        console.error('Error updating cart item quantity:', error);
      }
    }
  };

  const handleDelete = async (index) => {
    const cartId = rows[index].cartId;
    const productId = rows[index].productId;

    try {
      await deleteCartItem(cartId, productId);
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  // const handleCheckout = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:8080/create-checkout-session', {
  //       items: rows
  //     });

  //     const { sessionId } = response.data;
  //     const stripe = await stripePromise;
  //     await stripe.redirectToCheckout({ sessionId });
  //   } catch (error) {
  //     console.error('Error during checkout:', error);
  //   }
  // };
  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/create-checkout-session', {
        items: rows.map(row => ({
          product: {
            productName: row.product.productName
          },
          sellingPrice: row.sellingPrice,
          discount: row.discount,
          quantity: row.quantity
        }))
      });

      const { sessionId } = response.data;
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const handleTermsChange = () => {
    setIsTermsAccepted(!isTermsAccepted);
  };
  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Layout>
        <div className="CartContainer">
          {alertMessage && <div className="alert">{alertMessage}</div>}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, '& .MuiTableCell-sizeMedium': { padding: '20px 16px' } }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>{ }</StyledTableCell>
                  <StyledTableCell>Product</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="right">Quantity</StyledTableCell>
                  <StyledTableCell align="right">Subtotal</StyledTableCell>
                  <StyledTableCell align="right">Discount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((item, index) => (
                  <StyledTableRow key={item.productId}>
                    <StyledTableCell>
                      <TiDelete style={style} onClick={() => handleDelete(index)} />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">{item.product.productName}</StyledTableCell>
                    <StyledTableCell align="right">{'Rs.' + item.sellingPrice.toFixed(2)}</StyledTableCell>
                    <StyledTableCell align="right">
                      <button style={buttonStyle} onClick={() => handleDecrement(index)}>-</button>
                      <label style={qty} htmlFor="qty">{item.quantity}</label>
                      <button style={buttonStyle} onClick={() => handleIncrement(index)}>+</button>
                    </StyledTableCell>
                    <StyledTableCell align="right">{'Rs.' + (item.sellingPrice * item.quantity).toFixed(2)}</StyledTableCell>
                    <StyledTableCell align="right">{item.discount + '%'}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Button
          style={returnButton}
          onClick={() => {
            window.location.href = "/";
          }}
          variant="outlined"
        >
          Return To Shop
        </Button>
        <div className="checkoutContainer">
          <Box height={300} width={470} p={2} sx={{ border: "2px solid grey" }}>
            <h2>Cart Total</h2>
            <div>
              <Table sx={{ minWidth: 400 }} aria-label="custom pagination table">
                <TableBody>
                  <TableRow>
                    <TableCell className="checkoutTable" component="th" scope="row">Subtotal:</TableCell>
                    <TableCell className="checkoutTable">{'Rs.' + totals.subtotal.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="checkoutTable" component="th" scope="row">Discount:</TableCell>
                    <TableCell className="checkoutTable">{'Rs.' + totals.discount.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="checkoutTable" component="th" scope="row">Total:</TableCell>
                    <TableCell className="checkoutTable">{'Rs.' + totals.total.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            {/* Checkbox */}
            <div className="termscheckboxcontainer">
              <input
                type="checkbox"
                id="terms"
                checked={isTermsAccepted}
                onChange={handleTermsChange}
              />
              <span style={{ marginLeft: '5px' }}>I agree to the <a style={{ fontWeight: '500', textDecoration: 'underline', color: 'red' }} href="/" onClick={handleTermsClick}>terms and conditions</a></span>
            </div>
            <Button
              style={isTermsAccepted ? checkoutButtonEnabled : checkoutButtonDisabled}
              onClick={handleCheckout}
              disabled={!isTermsAccepted}
            >
              Proceed to checkout
            </Button>
          </Box>
        </div>
      </Layout>
      {showPopup && <TermsConditions onClose={handleClosePopup} />}
    </>
  );
}
