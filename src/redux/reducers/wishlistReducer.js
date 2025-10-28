import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../types/wishlistTypes";

const initialState = {
  wishlistItems: [],
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST: {
      const item = action.payload;
      const existItem = state.wishlistItems.find(i => i.id === item.id);

      if (!existItem) {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, item],
        };
      }

      return state;
    }

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(i => i.id !== action.payload),
      };

    default:
      return state;
  }
};
