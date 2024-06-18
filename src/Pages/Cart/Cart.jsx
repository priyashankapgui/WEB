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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const checkoutButton = {
  backgroundColor: "#2FAA3C",
  color: "#fafafa",
  fontSize: "16px",
  fontFamily: "Poppins",
  marginTop:"5%",
  marginRight:"0%",
  marginLeft:"25%",
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const DatePickerInput = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="inputFieldContainer">
      <input
        type="text"
        value={selectedDate ? selectedDate.toLocaleDateString() : ''}
        placeholder="Select a date"
        readOnly
        className="dateInput"
      />
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        customInput={<button className="calendarButton">📅</button>}
        className="datePicker"
      />
    </div>
  );
};

export default function Cart() {
  const [rows, setRows] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, discount: 0, total: 0 });

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setRows(cartItems);
  }, []);

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
    localStorage.setItem('cartItems', JSON.stringify(updatedRows));

    // Update backend
    const productId = updatedRows[index].productId;
    try {
      await axios.put(`http://localhost:8080/cart/${productId}`, {
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
      localStorage.setItem('cartItems', JSON.stringify(updatedRows));

      // Update backend
      const productId = updatedRows[index].productId;
      try {
        await axios.put(`http://localhost:8080/cart/${productId}`, {
          quantity: updatedRows[index].quantity,
        });
      } catch (error) {
        console.error('Error updating cart item quantity:', error);
      }
    }
  };

  const handleDelete = async (index) => {
    const productId = rows[index].productId; 

    try {
      await axios.delete(`http://localhost:8080/cart/${productId}`);
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
      localStorage.setItem('cartItems', JSON.stringify(updatedRows));
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/create-checkout-session', {
        items: rows,
      });
      

      const { sessionId } = response.data;
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <Layout>
      <div className="CartContainer">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700, '& .MuiTableCell-sizeMedium': { padding: '20px 16px' } }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>{}</StyledTableCell>
                <StyledTableCell>Product</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Subtotal</StyledTableCell>
                <StyledTableCell align="right">Discount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={row.productId}>
                  <StyledTableCell>
                    <TiDelete style={style} onClick={() => handleDelete(index)} />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">{row.productName}</StyledTableCell>
                  <StyledTableCell align="right">{row.sellingPrice ? 'Rs.' + row.sellingPrice.toFixed(2) : 'N/A'}</StyledTableCell>
                  <StyledTableCell align="right">
                    <button style={buttonStyle} onClick={() => handleDecrement(index)}>-</button>
                    <label style={qty} htmlFor="qty">{row.quantity}</label>
                    <button style={buttonStyle} onClick={() => handleIncrement(index)}>+</button>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.sellingPrice ? (row.sellingPrice * row.quantity).toFixed(2) : 'N/A'}</StyledTableCell>
                  <StyledTableCell align="right">{row.discount + '%'}</StyledTableCell>
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
        <Box height={350} width={470} p={2} sx={{ border: "2px solid grey" }}>
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
            <div className="PickupDatePicker">
              <h4 className="PickupDate">Select a date you hope to pick up your order </h4>
              <DatePickerInput />
            </div>
            
          </div>
          <Button
            style={checkoutButton}
            variant="contained"
            onClick={handleCheckout}
          >
            Proceed to checkout
          </Button>
          <h3 className="CancelNotification">Please note that once an online order is placed, it cannot be canceled.</h3>
        </Box>
      </div>
    </Layout>
  );
}
