import * as actionTypes from "./actionTypes";
import { database } from "../../Firebase/Firebase";

export const fetchCartInit = () => {
  return (dispatch, getState) => {
    dispatch(fetchCartStart());
    //  fetchLocal()
    const user = getState().auth.currentUser;
    const cart = getState().cart.cart;
    const subTotal = getState().cart.subTotal;
    database
      .ref("/userCart/" + user.uid)
      .once("value")
      .then((snapshot) => {
        const result = snapshot.val();
        if (result !== null) {
          const NsubTotal = subTotal + result.subTotal;
          if (cart.length) {
            result.cart.forEach((res) => {
              const cartIndex = cart.findIndex(
                ({ pdKey }) => pdKey === res.pdKey
              );
              if (cartIndex < 0) {
                cart.push(res);
              } else {
                cart[cartIndex].amount = cart[cartIndex].amount + res.amount;
              }
              emptyLocal()
              dispatch(toStorageCart(cart, NsubTotal));
            });
          }
          emptyLocal()
          dispatch(updateCart(result.cart, result.subTotal));
        }
      });
  };
};

const emptyLocal = () => {
  localStorage.removeItem("cart");
  localStorage.removeItem("subTotal");
};

export const fetchLocal = () => {
  return (dispatch) => {
    const cart = localStorage.getItem("cart");
    const subTotal = localStorage.getItem("subTotal");
    if (cart === null || subTotal === null) {
      return;
    }
    return dispatch(updateCart(JSON.parse(cart), JSON.parse(subTotal)));
  };
};
export const fetchCartSuccess = (cartData) => {
  return {
    type: actionTypes.FETCH_CART_SUCCESS,
    cart: cartData,
  };
};
export const fetchCartFail = () => {
  return {
    type: actionTypes.FETCH_CART_FAIL,
  };
};
export const fetchCartStart = () => {
  return {
    type: actionTypes.FETCH_CART_START,
  };
};

export const toStorageCartStart = () => {
  return {
    type: actionTypes.TO_STORE_CART_START,
  };
};
export const toStorageCartFail = (e) => {
  return {
    type: actionTypes.TO_STORE_CART_FAIL,
    error: e,
  };
};

export const toStorageCart = (cart, subTotal) => {
  return (dispatch, getState) => {
    const user = getState().auth.currentUser;
    if (user !== null) {
      let data = {
        cart: cart,
        subTotal: subTotal,
      };

      if (!cart.length) {
        data = null;
      }
      dispatch(toStorageCartStart);
      database
        .ref("/userCart/" + user.uid)
        .set(data)
        .then(() => dispatch(updateCart(cart, subTotal)))
        .catch((e) => dispatch(toStorageCartFail(e.massage)));
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("subTotal", JSON.stringify(subTotal));
      dispatch(updateCart(cart, subTotal));
      if (!cart.length) emptyLocal()
    }
  };
};

const newSubTotal = (subTotal, price, amount, method) => {
  const oldPrice = subTotal;
  const priceChange = price * amount;
  if (method === 1) {
    return oldPrice + priceChange;
  } else {
    return oldPrice - priceChange;
  }
};

export const addToCart = (product, pdId, amount) => {
  return (dispatch, getState) => {
    const cart = getState().cart.cart;
    const subTotal = getState().cart.subTotal;
    const result = cart.findIndex(({ pdKey }) => pdKey === pdId);
    const newPrice = newSubTotal(subTotal, product.price, amount, 1);
    if (result < 0) {
      cart.push({ product: product, pdKey: pdId, amount: amount });
      return dispatch(toStorageCart(cart, newPrice));
    } else {
      cart[result].amount = cart[result].amount + amount;
      return dispatch(toStorageCart(cart, newPrice));
    }
  };
};
export const removeFromCart = (pdId) => {
  return (dispatch, getState) => {
    const cart = getState().cart.cart;
    const subTotal = getState().cart.subTotal;
    const result = cart.findIndex(({ pdKey }) => pdKey === pdId);
    const newCart = cart.filter((cartItem) => cartItem.pdKey !== pdId);
    const newPrice = newSubTotal(
      subTotal,
      cart[result].product.price,
      cart[result].amount,
      0
    );
    dispatch(toStorageCart(newCart, newPrice));
  };
};
export const subtractOnCart = (pdId) => {
  return (dispatch, getState) => {
    const cart = getState().cart.cart;
    const subTotal = getState().cart.subTotal;
    const result = cart.findIndex(({ pdKey }) => pdKey === pdId);
    const newPrice = newSubTotal(subTotal, cart[result].product.price, 1, 0);
    if (cart[result].amount === 1) {
      const newCart = cart.filter((cartItem) => cartItem.pdKey !== pdId);

      return dispatch(toStorageCart(newCart, newPrice));
    } else {
      cart[result].amount = cart[result].amount - 1;
      return dispatch(toStorageCart(cart, newPrice));
    }
  };
};
export const addOnCart = (pdId) => {
  return (dispatch, getState) => {
    const cart = getState().cart.cart;
    const subTotal = getState().cart.subTotal;
    const result = cart.findIndex(({ pdKey }) => pdKey === pdId);
    cart[result].amount = cart[result].amount + 1;
    const newPrice = newSubTotal(subTotal, cart[result].product.price, 1, 1);
    dispatch(toStorageCart(cart, newPrice));
  };
};

export const emptyCart = () => {
  return (dispatch, getState) => {
    const user = getState().auth.currentUser;
    if (user !== null) {
      dispatch(toStorageCartStart);
      database
        .ref("/userCart/" + user.uid)
        .set(null)
        .then(() => {
          dispatch(updateCart([], 0));
          localStorage.removeItem("cart");
          localStorage.removeItem("subTotal");
        })
        .catch((e) => dispatch(toStorageCartFail(e.massage)));
    } else {
      localStorage.removeItem("cart");
      localStorage.removeItem("subTotal");
      dispatch(updateCart([], 0));
    }
  };
};

export const updateCart = (cart, newPrice) => {
  return {
    type: actionTypes.UPDATE_CART,
    cart: cart,
    subTotal: newPrice,
  };
};
