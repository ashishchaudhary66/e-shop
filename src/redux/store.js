import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistedState = localStorage.getItem('cartState')
  ? JSON.parse(localStorage.getItem('cartState'))
  : {};

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage.setItem('cartState', JSON.stringify(store.getState()));
});

export default store;
