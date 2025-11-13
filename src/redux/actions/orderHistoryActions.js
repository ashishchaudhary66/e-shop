import {
  ADD_TO_ORDER_HISTORY,
  CHANGE_ORDER_STATUS,
  StatusTypes,
} from "../types/orderHistoryTypes";

export const addToOrderHistory = (order) => {
  return {
    type: ADD_TO_ORDER_HISTORY,
    payload: order,
  };
};

export const changeOrderStatus = (orderId, status) => {
  const validStatuses = Object.values(StatusTypes);
  if (!validStatuses.includes(status)) {
    throw new Error(
      `Invalid status: ${status}. Must be one of: ${validStatuses.join(", ")}`
    );
  }
  return {
    type: CHANGE_ORDER_STATUS,
    payload: { orderId, status },
  };
};

