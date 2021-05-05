import * as actionTypes from "../actions/actionTypes";

const initialState = {
  order: null,
  loading: false,
  error: null,
  orderPath: false,
  orderNumber: "",
  confirmPaymentPath: false,
};

const orderStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};
const orderSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
     order: action.order,
    orderNumber: action.orderNumber,
  };
};
const orderFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const confirmStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};
const confirmSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};
const confirmFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};
const orderPath = (state, action) => {
  return {
    ...state,
    orderPath: action.method,
  };
};
const confirmPath = (state, action) => {
  return {
    ...state,
    confirmPaymentPath: action.method,
  };
};
const emptyOrder = (state, action) => {
  return {
    ...state,
    order: null,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_START:
      return orderStart(state, action);
    case actionTypes.ORDER_SUCCESS:
      return orderSuccess(state, action);
    case actionTypes.ORDER_FAIL:
      return orderFail(state, action);
    case actionTypes.ORDER_PATH:
      return orderPath(state, action);
    case actionTypes.CONFIRM_ORDER_START:
      return confirmStart(state, action);
    case actionTypes.CONFIRM_ORDER_SUCCESS:
      return confirmSuccess(state, action);
    case actionTypes.CONFIRM_ORDER_FAIL:
      return confirmFail(state, action);
    case actionTypes.CONFIRM_ORDER_PATH:
      return confirmPath(state, action);
    case actionTypes.EMPTY_ORDER:
      return emptyOrder(state, action);

    default:
      return state;
  }
};

export default reducer;
