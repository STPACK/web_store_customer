import React from "react";


const CheckoutOrder = React.memo((props) => {
  
  const {subTotal,shippingPrice}=props

  return (
    <>
      <div className="d-flex justify-content-between my-4">
        <h5>TOTAL</h5>
        <h6>{subTotal.toFixed(2)} BATH</h6>
      </div>
      <div className="d-flex justify-content-between">
        <h5>SHIPPING PRICE</h5>
        <h6>{shippingPrice.toFixed(2)} BATH</h6>
      </div>
      <hr/>
      <div className="d-flex justify-content-between my-4">
        <h4>SUBTOTAL</h4>
        <h5>{(shippingPrice+subTotal).toFixed(2)} BATH</h5>
      </div>
      
    </>
  );
})


export default CheckoutOrder;
