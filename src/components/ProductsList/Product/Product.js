import React from "react";
import classes from "./Product.module.css";

const Product = (props) => {
  const { product, addToCartHandler, pdKey } = props;

  return (
    <div className={`card ${classes.cards}`}>
      <img src={product.imageURL} alt="cover" className="rounded img-fluid " />
      <div className="card-body">
        <p className="card-text">{product.detail}</p>
        <div className="d-flex justify-content-between align-items-center ">
        <h6 className="card-text text-danger">{product.price} ฿</h6>

        <button className="btn btn-light "  aria-label="Add to cart" onClick={()=>addToCartHandler(product,pdKey)} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
