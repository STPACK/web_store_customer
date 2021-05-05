import * as actionTypes from "../actions/actionTypes";

const initialState = {
  product: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.product,
      };
    case actionTypes.FETCH_PRODUCT_FAIL:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
