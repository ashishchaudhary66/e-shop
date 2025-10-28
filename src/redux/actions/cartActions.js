import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QTY } from "../types/cartTypes";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const updateQty = (id, qty) => ({
  type: UPDATE_QTY,
  payload: { id, qty },
});
