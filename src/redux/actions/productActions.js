import axios from "axios";
import { FETCH_PRODUCT_DETAILS_FAILURE, FETCH_PRODUCT_DETAILS_REQUEST, FETCH_PRODUCT_DETAILS_SUCCESS, FETCH_PRODUCTS } from "../types/productTypes";

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    console.log("Fetched products:", response.data);
    dispatch({
      type: FETCH_PRODUCTS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchProductDetails = (id) => async (dispatch, action) => {
  try {
    dispatch({ type: FETCH_PRODUCT_DETAILS_REQUEST });
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    dispatch({
      type: FETCH_PRODUCT_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    dispatch({
      type: FETCH_PRODUCT_DETAILS_FAILURE,
      payload: error.message,
    });
  }
};
