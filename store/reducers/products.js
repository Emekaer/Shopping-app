import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT
} from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        product => product.id === action.pId
      );
      const updatedProduct = new Product(
        action.pId,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductsIndex = state.availableProducts.findIndex(
        product => product.id === action.pId
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductsIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pId
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pId
        )
      };
    }
  }
  return state;
};
