import React from "react";

const Order = (props) => {
  let { data } = props;
  return (
    <>
      <div className="card border-light">
        <div className="row ">
          <div className="col-3">
            <img
              src={data.product.imageURL}
              alt="orderList"
              className="rounded img-fluid "
            />
          </div>
          <div className="col-9">
            <p>{data.product.title}</p>
            <div className="d-flex justify-content-between">
              <p className="text-danger">
                {" "}
                <strong>
                  {" "}
                  {(data.amount * data.product.price).toFixed(2)} BATH{" "}
                </strong>
              </p>
              <p className="text mx-3">TOTAL: { data.amount} PC</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Order;
