import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import PageLoading from "./Components/PageLoading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

export const Main = (props) => {
  const { updateLocationHistory, locationHistorys } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    updateLocationHistory(path);
  }, [path, updateLocationHistory]);

  return (
    <Suspense fallback={<PageLoading />}>
      <ToastContainer />
      <Routes>
        {/* Routes Examples */}
        {/* <Route exact path="/" render={() => <Navigate to="/home" />} /> */}
        {/* <Route exact path="/signup" element={<Signup {...props} />} /> */}
      </Routes>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
