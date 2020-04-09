import { ADD_ORDER } from "../actions/order";
import Order from "../../models/order";

const initialState = {
  order: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        order: state.order.concat(newOrder),
      };
  }

  return state;
};
