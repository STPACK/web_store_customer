import * as actionTypes from "./actionTypes";
import { database } from "../../Firebase/Firebase";

export const fetchProductStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_START,
  };
};
export const fetchProductSuccess = (result) => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUCCESS,
    product: result,
  };
};
export const fetchProductFail = (e) => {
  return {
    type: actionTypes.FETCH_PRODUCT_FAIL,
    error: e,
  };
};

export const fetchProductList = () => {
  return (dispatch) => {
    dispatch(fetchProductStart());
    database
      .ref("productList")
      .once("value")
      .then((snapshot) => {
        const result = [];
        snapshot.forEach((res) => {
          const data = res.val();
          const key = res.key;
          result.push({
            key: key,
            data: data,
          });
        });
        dispatch(fetchProductSuccess(result));
      })
      .catch((e) => {
        dispatch(fetchProductFail(e));
      });
  };
};
