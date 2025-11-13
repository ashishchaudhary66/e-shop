import { ADD_TO_ORDER_HISTORY, CHANGE_ORDER_STATUS, StatusTypes } from "../types/orderHistoryTypes";

const initialState = {
  orders: [],
};

export const orderHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_ORDER_HISTORY: {
        const totalAmount = action.payload.items.reduce((acc, item) => acc + item.price * item.qty, 0);
        const statusValues = Object.values(StatusTypes);
        const randomIndex = Math.floor(Math.random() * statusValues.length);
        const order = {
            orderId: `ORD-${Date.now()}`,
            items: action.payload.items,
            totalAmount: totalAmount,
            date: new Date().toISOString(),
            status: statusValues[randomIndex],
        }
        return {
            ...state,
            orders: [...state.orders, order],
        };
    }
    case CHANGE_ORDER_STATUS: {
        const { orderId, status } = action.payload;
        return {
            ...state,
            orders: state.orders.map(order =>
                order.orderId === orderId ? { ...order, status } : order
            ),
        };
    }
    default:
      return state;
  }
}