import React from "react";
import { Box, Slider } from "@mui/material";

function valuetext(value) {
  return `${value}₴`;
}

export default function RangeSlider({ minPrice, maxPrice, value, onChange }) {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Box sx={{ mb: 1, fontSize: 14, fontWeight: 500 }}>
        Від {value[0]}₴ до {value[1]}₴
      </Box>
      <Slider
        min={minPrice}
        max={maxPrice}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
  
}
