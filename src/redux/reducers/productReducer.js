import { FETCH_PRODUCT_DETAILS_FAILURE, FETCH_PRODUCT_DETAILS_REQUEST, FETCH_PRODUCT_DETAILS_SUCCESS, FETCH_PRODUCTS } from "../types/productTypes";

const initialState = {
  products: [],
  productDetails: {},
  isLoading: false,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
        return {
          ...state,
          products: action.payload,
        };
      }

    case FETCH_PRODUCT_DETAILS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_PRODUCT_DETAILS_SUCCESS:
      return { ...state, isLoading: false, productDetails: action.payload };

    case FETCH_PRODUCT_DETAILS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};
