import React from "react";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const { cart, subtractOnHandler, addOnHandler, removeHandler } = props;

  return (
    
    <div className={`card ${classes.cards}`}>
      <img
        src={cart.product.imageURL}
        alt="cover"
        className="rounded img-fluid "
      />
      <div className="card-body">
        <p className="card-text">{cart.product.detail}</p>
        <div className="d-grid gap-2 d-flex justify-content-between align-items-center">
          <h6 className="card-text ">TOTAL {cart.product.price * cart.amount} ฿</h6>
          <button className="btn btn-sm btn-danger " aria-label="remove to cart" onClick={()=>removeHandler(cart.pdKey)}>
              
            REMOVE
          </button>
        </div>
        <div className="d-grid gap-2 d-flex justify-content-center align-items-center mt-3">
          <button className="btn btn-sm " aria-label="subtract on cart" onClick={()=>subtractOnHandler(cart.pdKey)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-dash-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          </button>
          <h6 className="card-text mx-3 mt-2 ">{cart.amount}</h6>
          <button className="btn btn-sm  "  aria-label="Add to cart" onClick={()=>addOnHandler(cart.pdKey)} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
