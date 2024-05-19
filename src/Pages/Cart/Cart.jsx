import React, { useState, useEffect } from "react";
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
import Layout from '../../Components/Layout/Layout'
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';

const style = { color: "red", fontSize: "1.8em" }

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Poppins',
    fontSize: 20
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function createData(name, price, quantity, discount) {
    return { name, price, quantity, discount };
}

const initialRows = [
    createData('Frozen yoghurt', 159.00, 1, 3),
    createData('Ice cream sandwich', 237.00, 1, 1),
    createData('Eclair', 262.00, 1, 1),
    createData('Cupcake', 305.00, 1, 1),
    createData('Gingerbread', 356.00, 1, 1),
];

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
    margin: "15%",
    marginLeft: "30%",
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY); // Replace with your Stripe publishable key

export default function Cart() {
    const [rows, setRows] = useState(initialRows);
    const [totals, setTotals] = useState({ subtotal: 0, discount: 0, total: 0 });

    useEffect(() => {
        const calculateTotals = () => {
            let subtotal = 0;
            let totalDiscount = 0;

            rows.forEach(row => {
                const rowSubtotal = row.price * row.quantity;
                subtotal += rowSubtotal;
                totalDiscount += (rowSubtotal * (row.discount / 100));
            });

            const total = subtotal - totalDiscount;

            setTotals({ subtotal, discount: totalDiscount, total });
        };

        calculateTotals();
    }, [rows]);

    const handleIncrement = (index) => {
        const updatedRows = [...rows];
        updatedRows[index].quantity += 1;
        setRows(updatedRows);
    };

    const handleDecrement = (index) => {
        const updatedRows = [...rows];
        if (updatedRows[index].quantity > 1) {
            updatedRows[index].quantity -= 1;
            setRows(updatedRows);
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
                    <Table sx={{ minWidth: 700, '& .MuiTableCell-sizeMedium': { padding: '20px 16px', }, }} aria-label="customized table">
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
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell><TiDelete style={style} /></StyledTableCell>
                                    <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                                    <StyledTableCell align="right">{'Rs.' + row.price.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <button style={buttonStyle} onClick={() => handleDecrement(index)}>-</button>
                                        <label style={qty} htmlFor="qty">{row.quantity}</label>
                                        <button style={buttonStyle} onClick={() => handleIncrement(index)}>+</button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{(row.price * row.quantity).toFixed(2)}</StyledTableCell>
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
                <Box height={324} width={470} p={2} sx={{ border: "2px solid grey" }}>
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
                    <Button
                        style={checkoutButton}
                        variant="contained"
                        onClick={handleCheckout}
                    >
                        Proceed to checkout
                    </Button>
                </Box>
            </div>
        </Layout>
    )
}
