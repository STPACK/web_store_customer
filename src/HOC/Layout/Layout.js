import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDraw from "../../components/Navigation/SideDraw/SideDraw";
import * as actions from "../../store/actions/index";

const Layout = (props) => {

  const { cartLength, currentUser, authSubscribe,fetchCartHandler,fetchLocalStore } = props;
  const [sideDraw, setSideDraw] = useState(false);

  useEffect(() => {
    authSubscribe();
    if(currentUser !== null){
     return  fetchCartHandler()
    }else return fetchLocalStore()
  }, [currentUser,authSubscribe,fetchCartHandler,fetchLocalStore]);
  return (
    <div>
      <Toolbar
        cart={cartLength}
        currentUser={currentUser}
        showHome={sideDraw}
        sideDrawToggle={() => setSideDraw(true)}
      ></Toolbar>
      <SideDraw
        cart={cartLength}
        currentUser={currentUser}
        showSideDraw={sideDraw}
        closeSideDraw={() => setSideDraw(false)}
      />

      <main className={classes.Content}>{props.children}</main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartLength: state.cart.cart.length,
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authSubscribe: () => dispatch(actions.authSubscribe()),
    fetchCartHandler :()=> dispatch(actions.fetchCartInit()),
    fetchLocalStore :()=> dispatch(actions.fetchLocal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
