import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./Reducers";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
const initialstate = {
  planets: [],
  vehicles: [],
  selectPlanets: [],
  selcetedVehicles: [],
  time: 0
};
const store = createStore(reducer, initialstate, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
