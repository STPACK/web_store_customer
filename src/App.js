import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./HOC/Layout/Layout";
import {
  Carts,
  Products,
  Homepage,
  Checkout,
  Login,
  Register,
  Logout,
  ConfirmPayment,
  Account,
  Orders,
  OrdersDetail
} from "./containers/index";

const App = (props) => {
  let { isAuth } = props;
  let routes = (
    <Switch>
      <Route path="/products" component={Products} />
      <Route path="/carts" component={Carts} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" exact component={Homepage} />
    </Switch>
  );
  if (isAuth) {
    routes = (
      <Switch>
        <Route path="/products" component={Products} />
        <Route path="/carts" component={Carts} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/confirm_payment/:orderNumber" component={ConfirmPayment} />
        <Route path="/account" component={Account} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/orders/:orderNumber"  component={OrdersDetail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Homepage} />
      </Switch>
    );
  }
  return (
    <>
      <Router>
        <Layout>{routes}</Layout>
      </Router>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.currentUser !== null,
  };
};

export default connect(mapStateToProps)(App);
