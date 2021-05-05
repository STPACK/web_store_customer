import * as actionTypes from "../actions/actionTypes";

const initialState = {
  cart: [],
  subTotal:0,
  shippingPrice:50,
  error: null,
  toStoreLoading:false,
  toStoreError:null
};

const toStorageCartStart=(state,action)=>{
  return{
    ...state,
    cart:action.cart,
    subTotal:action.subTotal,
    toStoreLoading:true
  }
}
const toStorageCartFail=(state,action)=>{
  return{
    ...state,
    toStoreError:action.error,
    toStoreLoading:false
  }
}
const updateCart=(state,action)=>{
  return{
    ...state,
    cart:action.cart,
    subTotal:action.subTotal,
    toStoreLoading:false
  }
}


const emptyCart = (state,action) => {
  return{
    ...state,
    cart:[],
    subTotal:0
  }
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
   
    
    case actionTypes.EMPTY_CART:
      return emptyCart(state, action);
    case actionTypes.UPDATE_CART:
      return updateCart(state, action);
    case actionTypes.TO_STORE_CART_START:
      return toStorageCartStart(state, action);
    case actionTypes.TO_STORE_CART_FAIL:
      return toStorageCartFail(state, action);
    default:
      return state;
  }
};

export default reducer;
