import * as actions from "./actionTypes";
import { auth,database } from "../../Firebase/Firebase";
import {emptyCart} from './cart';

export const setAuthPath = (path) => {
  return{
    type: actions.AUTH_SET_PATH,
    authPath: path
  }
}

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};
export const authSuccess = (uerData) => {
  return {
    type: actions.AUTH_SUCCESS,
    currentUser: uerData,
  };
};
export const authFail = (error) => {
  return{
    type: actions.AUTH_FAIL,
    error: error
  }
}
export const authAddressStart = () => {
  return {
    type: actions.AUTH_ADDRESS__START,
  };
};
export const authAddressSuccess = (data) => {
  return {
    type: actions.AUTH_ADDRESS_SUCCESS,
    authAddress: data,
  };
};
export const authAddressFail = (error) => {
  return{
    type: actions.AUTH_ADDRESS_FAIL,
    error: error
  }
}

export const authSubscribe = () => {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authSuccess(user));
      }
    });
   
  };
};

export const authUpdatePassword = (newPassword)=>{
  return (dispatch)=>{
    dispatch(authStart());
    const currentUser = auth.currentUser
    currentUser.updatePassword(newPassword)
    .then(()=>{
      dispatch(authSuccess(currentUser))
      dispatch(authTrigger(true))
    })
    .catch(e=>dispatch(authFail(e.message)))
  }
}
export const authAddress =(data)=>{
  return (dispatch,getState)=>{
    dispatch(authAddressStart())
      const uid=getState().auth.currentUser.uid
      database.ref('/userData/'+uid)
      .set(data)
      .then(()=>{
        dispatch(authAddressSuccess(data))
        dispatch(authTrigger(true))
      })
      .catch(e=>dispatch(authAddressFail(e.message)))
  }
}
export const fetchAuthAddress =()=>{
  return (dispatch,getState)=>{
    dispatch(authAddressStart())
      const uid=getState().auth.currentUser.uid
      database.ref('/userData/'+uid).once('value')
      .then((res)=>dispatch(authAddressSuccess(res.val())))
      .catch(e=>dispatch(authAddressFail(e.message)))
  }
}
export const authTrigger =(method)=>{
  return {
    type:actions.AUTH_TRIGGER,
    method:method
  }
}

export const authSignIn = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(authSuccess(user));
      })
      .catch((e) => {
        dispatch(authFail(e.message))
      });
  };
};
export const authSignUp = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const userData = user.user;
        dispatch(authSuccess(userData));
      })
      .catch((e) => {
        dispatch(authFail(e.message))
      });
  };
};
export const clearError =() =>{
  return{
    type:actions.AUTH_CLEAR_ERROR
  }
}
export const authSignOut = () => {
  return (dispatch) => {
    dispatch(authStart());
    auth
      .signOut()
      .then(()=>{
        dispatch(authSuccess(null))
        dispatch(emptyCart())
      }
      )
      .catch((e) => {
        dispatch(authFail(e.message))
      });
  };
};
