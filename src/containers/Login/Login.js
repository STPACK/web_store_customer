import React, { useState, useEffect } from "react";
// import classes from "./Login.module.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";


const Login = (props) => {
  const {
    onLogin,
    loading,
    isAuth,
    authPath,
    authError,
    isCart,
    setAuthPath,
  } = props;
  const [email, setEmail] = useState("ee@ee.com");
  const [password, setPassword] = useState("eeeeee");

  useEffect(() => {
    if (!isCart && !isAuth) {
      setAuthPath("/");
    }
  }, [isCart, isAuth, setAuthPath]);

  const submitHandler = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };
  return (
    <>
      {isAuth && <Redirect to={authPath} />}
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <span className="h2">LOGIN</span>
            <form onSubmit={submitHandler}>
              <div className="col-12 mt-3 mb-3">
                <label htmlFor="emailInput" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  id="emailInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="passwordInput" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  id="passwordInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="col-12">
                {authError &&
                <div className="alert alert-danger alert-dismissible fade show">
                  <span>{authError}</span>
                  
                </div>
                }
              </div>
              <div className="d-flex justify-content-end  mx-3">
                <button className="btn btn-success flex-end w-25" type="submit" disabled={loading}>
                  LOGIN
                {loading&& <div className="spinner-grow spinner-grow-sm mx-1"> <span className="visually-hidden"></span></div> }
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-12 col-lg-6">
            <span className="h2">REGISTER</span>
            <div className="row">
              <div className="col-12 mt-4">
                <p className="h5">If you don't have account ,please register and login before shopping</p>
              </div>
              <div className="d-flex justify-content-end w-100 mt-3 mx-3">
                <button className="btn btn-warning w-25"><Link to="/register" className="text-dark"> REGISTER </Link></button>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuth: state.auth.currentUser !== null,
    isCart: state.cart.cart.length,
    authPath: state.auth.authPath,
    authError: state.auth.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => dispatch(actions.authSignIn(email, password)),
    closeError: () => dispatch(actions.clearError()),
    setAuthPath: (path) => dispatch(actions.setAuthPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
