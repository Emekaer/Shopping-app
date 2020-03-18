import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import productsReducer from './store/reducers/products'

import {NavigationContainer} from '@react-navigation/native'
import ProductNavigator from './navigation/productNavigation';

export default function App() {

  const rootReducer = combineReducers({
    products : productsReducer,

  })

  const store = createStore(rootReducer)

  return (
    <Provider store={store}>
      <NavigationContainer>
    <ProductNavigator/>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
