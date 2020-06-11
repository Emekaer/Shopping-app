import React, { useState, useEffect } from "react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/productNavigation";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(async () => {
    // Prevent native splash screen from autohiding
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    prepareResources();
  }, [SplashScreen, prepareResources, fetchFonts]);

  const prepareResources = async () => {
    await fetchFonts();
    setFontLoaded(true);
    await SplashScreen.hideAsync();
  };

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
  /* 
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  } */

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
