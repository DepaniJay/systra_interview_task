import React from "react";
import Main from "./Main";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import RootSaga from "./Saga";
import Reducers from "./Reducers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(RootSaga);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
