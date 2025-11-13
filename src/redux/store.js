import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";
import { productReducer } from "./reducers/productReducer";
import { orderHistoryReducer } from "./reducers/orderHistoryReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  product: productReducer,
  order: orderHistoryReducer
});

const persistedCart = localStorage.getItem("cartState")
  ? JSON.parse(localStorage.getItem("cartState"))
  : undefined;

const persistedWishlist = localStorage.getItem("wishlistState")
  ? JSON.parse(localStorage.getItem("wishlistState"))
  : undefined;

  const persistedOrderHistory = localStorage.getItem("orderHistoryState")
  ? JSON.parse(localStorage.getItem("orderHistoryState"))
  : undefined;

const persistedState = {
  cart: persistedCart,
  wishlist: persistedWishlist,
  order: persistedOrderHistory,
};

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cartState", JSON.stringify(state.cart));
  localStorage.setItem("wishlistState", JSON.stringify(state.wishlist));
  localStorage.setItem("orderHistoryState", JSON.stringify(state.order));
});

export default store;
