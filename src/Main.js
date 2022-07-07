import React from "react";
import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import home from "./Components/home";

export const Main = (props) => {
  return (
    <Routes>
      <Route exact path="/" render={() => <Navigate to="/home" />} />
      <Route exact path="/home" element={<Home {...props} />} />
    </Routes>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
