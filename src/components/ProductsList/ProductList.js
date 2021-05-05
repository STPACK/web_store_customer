import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./ProductList.module.css";

import Product from "./Product/Product";
import * as actions from "../../store/actions/index";
import AddCard from "../UI/addCartHandler/addCard";


const ProductList = (props) => {
  const {
    onFetchProduct,
    productList,
    addToCart,
    
  } = props;

  const [openAlert, setOpenAlert] = useState(false);
 

  useEffect(() => {
    onFetchProduct();
    return () => {
      clearTimeout();
    }
  }, [onFetchProduct]);

  const addToCartEvent = (product, pdKey) => {
    addToCart(product, pdKey);
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
    }, 1000);
  };
  

  return (
    <>    
      <div className="card mb-4">
        <img
          src={process.env.PUBLIC_URL + "/breadcrumb-bg1.jpg"}
         className={classes.imgCover}
          alt="breadcrumb"
        />
        <div className="card-img-overlay">
          <h1 className=" card-title text-center">PRODUCT</h1>
        </div>
      </div>

      <AddCard event={openAlert} />
      <div className={classes.warp}>
        <div className="row ">
          {productList.map((pd) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4"
              key={pd.key}
            >
              <Product
                product={pd.data}
                pdKey={pd.key}
                addToCartHandler={addToCartEvent}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    productList: state.products.product,
    loading: state.products.loading,
    error: state.products.error,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProduct: () => dispatch(actions.fetchProductList()),
    addToCart: (data, pdKey) => dispatch(actions.addToCart(data, pdKey,1)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
