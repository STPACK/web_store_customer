import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {authReducer,cartReducer,orderReducer,productReducer,orderListReducer} from './store/reducers/index';

import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'


import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  products: productReducer,
  order: orderReducer,
  cart:cartReducer,
  auth:authReducer,
  orderList:orderListReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
   
      <App />
   
  </Provider>,
  document.getElementById("root")
);
