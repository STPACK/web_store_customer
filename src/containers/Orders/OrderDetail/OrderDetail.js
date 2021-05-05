import React, { useEffect } from "react";
import { connect } from "react-redux";
import {useParams} from 'react-router-dom'
import * as actions from "../../../store/actions/index";
import {statusFilter,statusColor} from '../../../shared/utility'
import CheckoutOrder from "../../Checkout/CheckoutOrder/CheckoutOrder";
import Order from "../../Checkout/CheckoutOrder/Order/Order";

const OrderDetail = (props) => {
  const { fetchDetailHandler, orderDetail } = props;
  let {orderNumber} = useParams()
  useEffect(() => {
    fetchDetailHandler(orderNumber);
  }, [fetchDetailHandler,orderNumber]);
  return (
    <>
      {orderDetail !== null && (
        <div className="container">
          <h3>ORDER SUMMARY</h3>
          <div className="row d-flex flex-row-reverse ">
            <div className="col-12 col-md-6">
              <div className="d-flex justify-content-between my-3">
                <h6>ORDER NUMBER</h6>
                <h6>{orderDetail.orderNumber}</h6>
              </div>
              <div className="d-flex justify-content-between my-3">
                <h6>STATUS</h6>
                <h6 className={statusColor(orderDetail.status)}> {statusFilter(orderDetail.status)}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6>ORDER DATE</h6>
                <h6>{orderDetail.orderDate}</h6>
              </div>
              <hr />
              <CheckoutOrder
                order={orderDetail.orderData}
                subTotal={orderDetail.subTotal}
                shippingPrice={orderDetail.shippingPrice}
              />
              {orderDetail.orderData.map((res) => (
                <Order data={res} key={res.pdKey} />
              ))}
            </div>
            <div className="col-12 col-md-6">
              <h5 className="my-4">Shipping Detail</h5>
              <hr />
              <div className="col-12">
                <h6> <strong>Name:</strong> {orderDetail.shippingInfo.name}</h6>
                <h6> <strong>Phone: </strong>{orderDetail.shippingInfo.phone} </h6>
                <h6>
                <strong>Address:</strong> {orderDetail.shippingInfo.address}{" "}
                  {orderDetail.shippingInfo.city}{" "}
                  {orderDetail.shippingInfo.district}{" "}
                  {orderDetail.shippingInfo.postcode}{" "}
                </h6>
              </div>
              <hr />
              <div className=" col-12 mt-4">
                <h5>Shipping option</h5>
                <h6>Kerry Express 50 Bath</h6>

              </div>
              <div className="card col-12 mt-4">
                <div className="card-body">
                  <h3 className="card-title">Payment</h3>
                  <img src={orderDetail.fileUrl} alt="fileUrl" className="img-fluid w-50"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    orderDetail: state.orderList.orderDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailHandler: (orderNumber) =>
      dispatch(actions.fetchDetail(orderNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
