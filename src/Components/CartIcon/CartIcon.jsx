import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    background: "green",
    padding: "0 4px",
  },
}));

export default function CartIcon() {
  const [cartCount, setCartCount] = useState(0);
  const productCount = localStorage.getItem("ProductCount");
  let newProductCount = [];
  if(productCount !== "undefined"){
    console.log("ProductCount", productCount);
    newProductCount = JSON.parse(productCount);
  }
  useEffect(() => {
    setCartCount(newProductCount);
  }, []);

  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={cartCount} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
