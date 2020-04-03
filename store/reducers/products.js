import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";
import products from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pId
        ),
        availableProducts: state.availableProducts.filter(
            product => product.id !== action.pId)
      };
    }
  }
  return state;
};
