import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orderList:[],
  orderDetail:null,
  loading:false,
  error:null
};

const orderListStart = (state, action) => {
  return {
    ...state,
    loading:true,
    error:null
  };
};
const orderListSuccess = (state, action) => {
  return {
    ...state,
    orderList:action.data,
    loading:false
  };
};
const orderDetailSuccess = (state, action) => {
  return {
    ...state,
    orderDetail:action.data,
    loading:false
  };
};
const orderListFail = (state, action) => {
  return {
    ...state,
    loading:false,
    error:action.error

  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_LIST_START:
      return orderListStart(state, action);
    case actionTypes.ORDER_LIST_SUCCESS:
      return orderListSuccess(state, action);
    case actionTypes.ORDER_LIST_FAIL:
      return orderListFail(state, action);
    case actionTypes.ORDER_DETAIL_SUCCESS:
      return orderDetailSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
