import React, { useState } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native'
import ProductNavigator from './navigation/productNavigation';


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const rootReducer = combineReducers({
    products: productsReducer,

  });

  const store = createStore(rootReducer);

  const fetchFonts = () => {
    return (Font.loadAsync({
      'openSans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'openSansBold': require('./assets/fonts/OpenSans-Bold.ttf')
    }))
  }

  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => { setFontLoaded(true); }} />
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ProductNavigator />
      </NavigationContainer>
    </Provider>
  );
}

