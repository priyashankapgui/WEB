import React, { useState } from "react";
import "./Cart.css";
import Layout from "../../Components/Layout/Layout";
import CartTable from "../../Components/CartTable/CartTable";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { loadStripe } from "@stripe/stripe-js";

const getStripe = () => {
  let stripePromise = '';
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }
  console.log(stripePromise);
  return stripePromise;
}

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

export default function Cart({ cart }) {
  const [totals, setTotals] = useState({ subtotal: 0, discount: 0, total: 0 });

  const updateTotals = (newTotals) => {
    setTotals(newTotals);
  };

  return (
    <Layout>
      <div className="CartContainer">
        <CartTable updateTotals={updateTotals} />
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
          <Button style={checkoutButton} variant="contained">Proceed to checkout</Button>
        </Box>
      </div>
    </Layout>
  );
}
