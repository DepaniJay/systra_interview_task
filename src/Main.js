import React from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";
import Home from "./Components/Home";

export default function Main(props) {
  return (
    <Grid>
      <Routes>
        <Route exact path="/home" element={<Home {...props} />} />
      </Routes>
    </Grid>
  );
}
