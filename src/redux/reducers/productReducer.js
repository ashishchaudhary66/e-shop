import { FETCH_PRODUCT_DETAILS, FETCH_PRODUCTS } from "../types/productTypes";

const initialState = {
  products: [],
  selectedProduct: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
        return {
          ...state,
          products: action.payload,
        };
      }

    case FETCH_PRODUCT_DETAILS:
      return {
        ...state,
        selectedProduct: action.payload,
      };

    default:
      return state;
  }
};
