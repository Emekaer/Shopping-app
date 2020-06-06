export const PAY = "PAY"

export const pay =()=>{
    return async (dispatch, getState) => {
      const userId = getState().auth.userId;
  
      // any async code you want!
      try {
        const response = await fetch(
            `https://ravesandboxapi.flutterwave.com`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId,
              }),
            }
        );
  
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
  
        const resData = await response.json();
        const loadedProducts = [];
  
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
        }

        
  
        dispatch({
          type: SET_PRODUCTS,
          products: loadedProducts,
          userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
        });
      } catch (err) {
        // send to custom analytics server
        throw err;
      }
    };
  };