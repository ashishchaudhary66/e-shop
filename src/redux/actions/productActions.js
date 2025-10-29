import axios from "axios";
import { FETCH_PRODUCT_DETAILS, FETCH_PRODUCTS } from "../types/productTypes";

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

export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    console.log("Fetched product details:", response.data);
    dispatch({
      type: FETCH_PRODUCT_DETAILS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
