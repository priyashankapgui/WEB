import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TiDelete } from "react-icons/ti";

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

function createData(name, price, quantity, discount, subtotal) {
  return { name, price, quantity, discount, subtotal };
}

const initialRows = [
  createData('Frozen yoghurt', 159.00, 1, 1),
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

const qty={
  padding: '8px 12px',
};

export default function CartTable() {
  const [rows, setRows] = useState(initialRows);

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700, '& .MuiTableCell-sizeMedium': { padding: '20px 16px', }, }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{}</StyledTableCell>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Discount</StyledTableCell>
            <StyledTableCell align="right">Subtotal</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell><TiDelete style={style} /></StyledTableCell>
              <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{'Rs.'+row.price}</StyledTableCell>
              <StyledTableCell align="right">
                <button style={buttonStyle} onClick={() => handleDecrement(index)}>-</button>
                <label style={qty} htmlFor="qty">{row.quantity}</label>
                <button style={buttonStyle} onClick={() => handleIncrement(index)}>+</button>
              </StyledTableCell>
              <StyledTableCell align="right">{row.discount+'%'}</StyledTableCell>
              <StyledTableCell align="right">{row.price * row.quantity}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
