import * as actions from "./actionTypes";
import { database } from "../../Firebase/Firebase";
import {emptyCart} from './cart';

export const confirmOrder = data =>{
  return dispatch=>{
      dispatch(confirmOrderStart())
      database.ref('/confirmOrder/'+data.orderNumber).set(data)
      .then(()=>{
        database.ref('/orders/'+data.userId+'/'+data.orderNumber).set(data)
        .then(()=> {
          dispatch(confirmOrderSuccess())
          dispatch(confirmPath(true))
        
        })
        .catch(e=>dispatch(confirmOrderFail(e.massage)))
      })
      .catch(e=>dispatch(orderFail(e.massage)))

  }
}

export const fetchOrderToPayment = orderNumber =>{
  return (dispatch,getState)=>{
    dispatch(confirmOrderStart())
    const uid = getState().auth.currentUser.uid
        database.ref('/orders/'+uid+'/'+orderNumber).once('value')
        .then( snapshot => {
            const result = snapshot.val()
            dispatch(orderSuccess(result,""))
        })
        .catch(e=> dispatch(orderFail(e.massage)))

  }
}


export const orderCreate = (data) => {
  return (dispatch) => {
    dispatch(orderStart());
    database
      .ref("orders/" + data.userId + "/" + data.orderNumber)
      .set(data)
      .then(() => {
        dispatch(orderSuccess(data,data.orderNumber))
        dispatch(orderPath(true))
        dispatch(emptyCart())
      })
      .catch((e) => dispatch(orderFail(e.message)));
  };
};

export const orderPath =(method)=>{
  return{
    type: actions.ORDER_PATH,
    method: method
  }
}
export const confirmPath =(method)=>{
  return{
    type: actions.CONFIRM_ORDER_PATH,
    method: method
  }
}
export const emptyOrder =()=>{
  return{
    type:actions.EMPTY_ORDER
  }
}

export const orderStart = () => {
  return {
    type: actions.ORDER_START,
  };
};
export const orderSuccess = (data,orderNumber) => {
  return {
    type: actions.ORDER_SUCCESS,
     order: data,
    orderNumber:orderNumber
  };
};
export const orderFail = (e) => {
  return {
    type: actions.ORDER_FAIL,
    error: e,
  };
};

export const confirmOrderStart =()=>{
  return{
    type:actions.CONFIRM_ORDER_START
  }
}
export const confirmOrderSuccess =()=>{
  return{
    type:actions.CONFIRM_ORDER_SUCCESS,
  }
}
export const confirmOrderFail =(e)=>{
  return{
    type:actions.CONFIRM_ORDER_FAIL,
    error:e
  }
}
