import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function CustomRating({ value, onChange, legend }) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography
        component="legend"
        sx={{
          fontFamily: "Poppins",
          fontSize: "0.7em",
        }}
      >
        {legend}
      </Typography>
      <Rating name="custom-rating" value={value} onChange={onChange} />
    </Box>
  );
}
