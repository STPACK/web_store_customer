import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

const Logout = (props) => {
  const { onSignOut } = props;

  useEffect(() => {
    onSignOut();
  }, [onSignOut]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => dispatch(actions.authSignOut()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
