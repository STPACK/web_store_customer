import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentUser: null,
  authAddress: null,
  trigger:false,
  loading: false,
  error: null,
  authPath: "/",
};

const authStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};
const authSuccess = (state, action) => {
  return {
    ...state,
    currentUser: action.currentUser,
    loading: false,
    error: null,
  };
};
const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};
const authAddressStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};
const authAddressSuccess = (state, action) => {
  return {
    ...state,
    authAddress: action.authAddress,
    loading: false,
  };
};
const authAddressFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const clearError = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
  };
};
const authSetPath = (state, action) => {
  return {
    ...state,
    authPath: action.authPath,
  };
};

const authTrigger =(state,action)=>{
  return{
    ...state,
    trigger:action.method
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_ADDRESS__START:
      return authAddressStart(state, action);
    case actionTypes.AUTH_ADDRESS_SUCCESS:
      return authAddressSuccess(state, action);
    case actionTypes.AUTH_ADDRESS_FAIL:
      return authAddressFail(state, action);
    case actionTypes.AUTH_SET_PATH:
      return authSetPath(state, action);
    case actionTypes.AUTH_CLEAR_ERROR:
      return clearError(state, action);
    case actionTypes.AUTH_TRIGGER:
      return authTrigger(state, action);

    default:
      return state;
  }
};

export default reducer;
