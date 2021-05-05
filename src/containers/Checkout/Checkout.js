import React, { useEffect ,useCallback } from "react";
import * as actions from "../../store/actions/index";
import moment from 'moment';

import classes from "./Checkout.module.css";
import CheckoutOrder from "./CheckoutOrder/CheckoutOrder";
import CheckoutForm from './CheckoutForm/CheckoutForm';
import Order from './CheckoutOrder/Order/Order';
import { connect } from "react-redux";
import { Link, Redirect,useHistory } from "react-router-dom";


const Checkout = (props) => {
  const {
    isCart,
    createOrder,
    userId,
    order,
    subTotal,
    shippingPrice,
    loading,
    orderPathHandler,
    orderPath,
    orderNo,
    authAddress,
    fetchAuthAddress
  } = props;

  const history = useHistory()

  useEffect(() => {
  
    fetchAuthAddress()
    if(orderPath){  onOrderPath()}
      
    return () => {
      orderPathHandler(false)
    }
  }, [orderPath,orderPathHandler,fetchAuthAddress,])

  const onOrderPath =useCallback(()=>{
    history.push('/confirm_payment/'+orderNo)
  },[orderNo,history])

  const orderNumberHandler = () => {
    let now = Date.now().toString();
    now += now + Math.floor(Math.random() * 10);
    const id = [now.slice(0, 4), now.slice(4, 10)].join("-");
    return id;
  };

  const submitHandler = (shippingInfo) => {
    
    const orderNumber = orderNumberHandler();
    const orderDate = moment().format('LLL')
    const data = {
      userId: userId,
      orderNumber: orderNumber,
      orderData: order,
      subTotal:subTotal,
      shippingPrice:shippingPrice,
      summaryPrice:subTotal+shippingPrice,
      shippingInfo: shippingInfo,
      status:0,
      orderDate:orderDate,
      fileUrl:'',
    };
    createOrder(data)
  };
  return (
    <>
      {!isCart && <Redirect to="/carts" />}
      <div className={`container ${classes.content}`}>
        <div className=" row d-flex flex-row-reverse">
          <div className="col-12 col-md-12 col-lg-5">
            <div className="d-flex justify-content-between">
              <h2 className="mb-4">ORDER</h2>
              <h5>
                <Link to="/carts">EDIT</Link>
              </h5>
            </div>
            {order.map(res=> <Order data={res} key={res.pdKey}/>)}
            
            <CheckoutOrder
              
              subTotal={subTotal}
              shippingPrice={shippingPrice}
            />
          </div>
          <div className="col-12 col-md-12 col-lg-7">
            <h2 className="mb-4">USER DATA</h2>
            <CheckoutForm
            loading={loading} authAddress={authAddress} addressSubmit={submitHandler}
            >
               <div className="card col-12 mt-4">
                <div className="card-body">
                  <h3 className="card-title">Shipping Options</h3>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked
                      readOnly
                    />
                    <label className="form-check-form">
                      Kerry Express 50.00 BATH
                    </label>
                  </div>
                </div>
              </div>
              <div className="card col-12 mt-4">
                <div className="card-body">
                  <h3 className="card-title">Payment</h3>
                  <p className="card-text">SCB XXX-XXX-XXXX MR.Test Tester</p>
                </div>
              </div>


            </CheckoutForm>
           
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isCart: state.cart.cart.length,
    userId: state.auth.currentUser.uid,
    order: state.cart.cart,
    subTotal: state.cart.subTotal,
    shippingPrice: state.cart.shippingPrice,
    loading: state.order.loading,
    error: state.order.error,
    orderPath: state.order.orderPath,
    orderNo:state.order.orderNumber,
    authAddress:state.auth.authAddress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (data) => dispatch(actions.orderCreate(data)),
    orderPathHandler:(method) => dispatch(actions.orderPath(method)),
    fetchAuthAddress: ()=> dispatch(actions.fetchAuthAddress()),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
