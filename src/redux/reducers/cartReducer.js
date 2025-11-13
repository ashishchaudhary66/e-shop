import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, UPDATE_QTY } from "../types/cartTypes";

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find(i => i.id === item.id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i.id === existItem.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, { ...item, qty: 1 }] };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i.id !== action.payload),
      };

    case UPDATE_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map(i =>
          i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        ),
      };

      case CLEAR_CART:
        return {
          ...state,
          cartItems: [],
        };

    default:
      return state;
  }
};
