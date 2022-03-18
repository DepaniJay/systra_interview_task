import React from "react";
import { CircularProgress } from "@mui/material";

export default function CircularProgressComponent({
  size = 20,
  color,
  sx,
  customColor,
  ...props
}) {
  return (
    <CircularProgress
      size={size}
      color={color}
      sx={{ color: customColor, ...sx }}
      {...props}
    />
  );
}
