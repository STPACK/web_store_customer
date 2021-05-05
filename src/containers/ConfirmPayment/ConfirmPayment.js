import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { storage } from "../../Firebase/Firebase";
import {useHistory ,useParams} from 'react-router-dom';
import CheckoutOrder from "../Checkout/CheckoutOrder/CheckoutOrder";
import Order from '../Checkout/CheckoutOrder/Order/Order';
import { Modal ,Button  } from "react-bootstrap";
import {statusFilter,statusColor} from '../../shared/utility'
import * as actions from '../../store/actions/index';

const ConfirmPayment = (props) => {
  const { order,onSubmitHandler,confirmPath,confirmPathHandler,loading,emptyOrder,fetchOrderHandler } = props;
  const history =useHistory()
  let {orderNumber} = useParams()

  const [file, setFile] = useState(null);
  const [onLoading, setOnLoading] = useState(false)

useEffect(() => {
  fetchOrderHandler(orderNumber)
  
  return () => {
    emptyOrder()
  }
}, [fetchOrderHandler,emptyOrder,orderNumber])
 

  const onFileChange = (e) => {
    e.preventDefault();
    setOnLoading(true)
    const slipFile = e.target.files[0];
    storage
      .ref()
      .child(order.orderNumber)
      .put(slipFile)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((res) => setFile(res));
        setOnLoading(false)
      });
  };

  const confirmOrder  = (e)=>{
    e.preventDefault()
    let orderData ={
      ...order,
      status:1,
      fileUrl:file,
    }
    onSubmitHandler(orderData)
  }

  const continueHandler =()=>{
    history.push('/orders')
    confirmPathHandler(false)
  }
  

  return (
    <>
    <Modal show={confirmPath}  centered>
        <Modal.Header >
          <Modal.Title>Thank you for your order</Modal.Title>
        </Modal.Header>
        <Modal.Body>You can check verify payment in your order list</Modal.Body>
        <Modal.Footer>
         
          <Button variant="primary" onClick={continueHandler}>
            continue
          </Button>
        </Modal.Footer>
      </Modal>

       {order!== null &&
      <div className={`container `}>
        <div className=" row d-flex flex-row-reverse">
          <div className="col-12 col-md-12 col-lg-5">
            <div className="d-flex justify-content-between my-4">
              <h6>ORDER NUMBER</h6>
              <h5>{order.orderNumber}</h5>
            </div>
            <div className="d-flex justify-content-between my-3">
              <h6 >STATUS</h6>
              <h6 className={statusColor(order.status)} > {statusFilter(order.status)}</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>ORDER DATE</h6>
              <h6>{order.orderDate}</h6>
            </div>
            <hr />
            <CheckoutOrder
              order={order.orderData}
              subTotal={order.subTotal}
              shippingPrice={order.shippingPrice}
            />
             {order.orderData.map(res=> <Order data={res} key={res.pdKey}/>)}
          </div>
          <div className="col-12 col-md-12 col-lg-7">
            <h3 className="mb-4">THANK YOU FOR YOUR ORDER</h3>
            <div className=" container row mx-2">
              <div className="card col-12 my-4">
                <div className="card-body">
                  <h3 className="card-title">Payment methods</h3>
                  <p className="card-text">SCB XXX-XXX-XXXX MR.Test Tester</p>
                </div>
              </div>
              <div className=" col-6">
                {onLoading && 
                <div className="spinner-grow text-secondary" style={{width: '3rem', height: '3rem'}} role="status">
                <span className="visually-hidden"></span>
              </div>
              
                }
                <img src={file} className="img-fluid" alt="" />
              </div>
              <form className=" col-12 my-4" onSubmit={confirmOrder}>
                <div className="input-group mb-3">
                  <input
                    className=""
                    type="file"
                    id="formFile"
                    onChange={onFileChange}
                    required
                  />
                </div>
                <div className=" col-12 d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-success" disabled={loading } >
                    {loading? <>
                      Loading...{" "}
                      <div className="spinner-grow spinner-grow-sm mx-1">
                        {" "}
                        <span className="visually-hidden"></span>
                      </div>{" "}
                    </>
                    : "UPLOAD SLIP"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.order.order,
    confirmPath:state.order.confirmPaymentPath,
    loading:state.order.loading
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    fetchOrderHandler: orderNumber => dispatch(actions.fetchOrderToPayment(orderNumber)),
    onSubmitHandler: order => dispatch(actions.confirmOrder(order)),
    confirmPathHandler :method => dispatch(actions.confirmPath(method)),
    emptyOrder : ()=> dispatch(actions.emptyOrder())

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ConfirmPayment);
