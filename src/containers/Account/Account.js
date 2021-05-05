import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Account.module.css";
import * as actions from "../../store/actions/index";
import CheckoutForm from "../Checkout/CheckoutForm/CheckoutForm";
import { Modal,Button } from "react-bootstrap";

const Account = (props) => {
  const { changePasswordHandler, loading, authError,currentEmail,authAddress,authAddressHandler,fetchAuthAddress,trigger,triggerHandler } = props;

  const [passwordTrigger, setPasswordTrigger] = useState(false);
  const [addressTrigger, setAddressTrigger] = useState(false);
  const [newPassword, setNewPassword] = useState("");

 
  useEffect(() => {
    fetchAuthAddress()
  }, [fetchAuthAddress])

  const passwordSubmit = (e) => {
    e.preventDefault();
    changePasswordHandler(newPassword);
  };
  const addressSubmit = (data) => {

    authAddressHandler(data)
  };

  const modalClose = ()=>{
    triggerHandler(false)
    setAddressTrigger(false)
    setPasswordTrigger(false)
  }

  let  addressCard =null
  if(authAddress!==null){
    addressCard =(
      <div className="card">
                <div className="card-body">
                  
                  <h6 > <strong>Name:  </strong>{authAddress.name} </h6>
                  <h6> <strong>Phone: </strong>{authAddress.phone}</h6>
                  <h6>
                  <strong>Address:  </strong> 
                   {authAddress.address}{"  "}
                   {authAddress.district}{"  "}
                   {authAddress.city} {"  "} {authAddress.postcode}
                  </h6>
                </div>
              </div>
    )
  }
  
  return (
    <>
    <Modal show={trigger} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data will save</Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={modalClose}>
           continue
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <div className="row ">
          <div className="col-12 my-3">
            <h3>My Account</h3>
          </div>
          <div className="col-12 my-3">
            <ul className="nav nav-tabs ">
              <li className="nav-item">
                <h5>
                  <Link to="/account" className="nav-link active">
                    account
                  </Link>
                </h5>
              </li>
              <li className="nav-item">
                <h5>
                  <Link to="/orders" className="nav-link">
                    order
                  </Link>
                </h5>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6">
            <div className="col-12 d-flex justify-content-between my-2">
              <span className="h5">Email</span>
              <span className="h6 text-secondary">{currentEmail} </span>
            </div>
            <div className="col-12 d-flex justify-content-between my-2">
              <span className="h5">Password</span>
              <h6
                className={classes.changePassword}
                onClick={() => {
                  setPasswordTrigger(!passwordTrigger)
                  setAddressTrigger(false)
                }}
              >
                change password{" "}
              </h6>
            </div>
            {passwordTrigger && (
              <div className="col-12 ">
                <form className="row " onSubmit={passwordSubmit}>
                  <label
                    htmlFor="newPassword"
                    className="col-6 form-label h5 my-2 "
                  >
                    New Password
                  </label>
                  <div className="col-6">
                    <input
                      type="password"
                      className="form-control my-2"
                      id="newPassword"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  {authError && (
                    <div className="alert alert-danger alert-dismissible fade show">
                      <span>{authError}</span>
                    </div>
                  )}

                  <div className="col-12 d-flex justify-content-end  my-2">
                    <button
                      className="btn btn-success"
                      type="submit"
                      disabled={loading}
                    >
                      Change Password
                      {loading && (
                        <div
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                        >
                          <span className="visually-hidden"></span>
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="col-12 col-md-6">
            <div className="col-12 d-flex justify-content-between my-2">
              <h5>Address to shipping</h5>
              <h6
                className={classes.changePassword}
                onClick={() => {
                  setAddressTrigger(!addressTrigger)
                  setPasswordTrigger(false)
                }}
              >
                {authAddress!==null? 'EDIT' : '+ Address'}
               
              </h6>
            </div>
            {addressTrigger && <CheckoutForm loading={loading} authAddress={authAddress} addressSubmit={addressSubmit}  />}
            { addressCard}

            
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentEmail:state.auth.currentUser.email,
    loading: state.auth.loading,
    authError: state.auth.error,
    authAddress:state.auth.authAddress,
    trigger:state.auth.trigger
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePasswordHandler: newPassword => dispatch(actions.authUpdatePassword(newPassword)),
    authAddressHandler: data => dispatch(actions.authAddress(data)),
    fetchAuthAddress: ()=> dispatch(actions.fetchAuthAddress()),
    triggerHandler :method => dispatch(actions.authTrigger(method))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
