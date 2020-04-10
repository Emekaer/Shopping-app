import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch) => {
    // any async code you want!
    try {
      const response = await fetch(
        `https://rn-shopping-app-98411.firebaseio.com/orders/u1.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const orderedItems = [];

      for (const key in resData) {
        orderedItems.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, orders: orderedItems });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const date = new Date();
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shopping-app-98411.firebaseio.com/orders/u1.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
