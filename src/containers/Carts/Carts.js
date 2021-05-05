import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import * as actions from "../../store/actions/index";
import Cart from "../../components/Cart/Cart";
import classes from "./Carts.module.css";

const Carts = (props) => {
  let history = useHistory();
  const {
    cart,
    removeHandler,
    addOnHandler,
    subtractOnHandler,
    subTotal,
    emptyCart,
    isAuth,
    setAuthPath,
  } = props;

  const renderEmptyCart = (
    <>
      <h6>
        You have no items in your shopping cart,
        <Link className={classes.link} to="/products">
          start adding some !!
        </Link>
      </h6>
    </>
  );

  const checkoutHandler = () => {
    if (isAuth) {
      return history.push("/checkout");
    }
    history.push("/login");
    setAuthPath("/carts");
  };

  const renderCart = (
    <>
      <div className="row mt-3">
        {cart.map((res) => (
          <div
            className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
            key={res.pdKey}
          >
            <Cart
              cart={res}
              removeHandler={removeHandler}
              addOnHandler={addOnHandler}
              subtractOnHandler={subtractOnHandler}
            />
          </div>
        ))}

        <div className={classes.cardDetail}>
          <h3>SUBTOTAL : {subTotal} BATH</h3>
          <div className="d-flex gab-2 d-grid">
            <button className="btn btn-danger mx-3 " onClick={emptyCart}>
              EMPTY CART
            </button>
            <button className="btn btn-primary " onClick={checkoutHandler}>
              {isAuth ? "CHECKOUT" : "PLEASE LOGIN TO ORDER"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <>
      <div className="container">
       <h1>Your Shopping Cart</h1>
        {!cart.length ? renderEmptyCart : renderCart}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    subTotal: state.cart.subTotal,
    isAuth: state.auth.currentUser !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeHandler: (key) => dispatch(actions.removeFromCart(key)),
    addOnHandler: (key) => dispatch(actions.addOnCart(key)),
    subtractOnHandler: (key) => dispatch(actions.subtractOnCart(key)),
    emptyCart: () => dispatch(actions.emptyCart()),
    setAuthPath: (path) => dispatch(actions.setAuthPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carts);
