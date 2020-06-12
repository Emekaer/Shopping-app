export const PAY = "PAY";
import { paystack } from "../../.ENV/key";

export const pay = (data) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

  
    try {
      const response = await fetch(
        `https://api.paystack.co/transaction/verify/${data.reference}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${paystack.secret}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      console.log(resData);
      /*  const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      } */

      dispatch({
        type: PAY,
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};
