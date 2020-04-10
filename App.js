import React, { useState } from "react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/productNavigation";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth"

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  const fetchFonts = () => {
    return Font.loadAsync({
      openSans: require("./assets/fonts/OpenSans-Regular.ttf"),
      openSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
    });
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
