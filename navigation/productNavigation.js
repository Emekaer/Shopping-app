import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import productOverview from '../screens/shop/ProductOverview';
import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const ProductsNavigator = () => {
   return( <Stack.Navigator
   screenOptions={{
    headerStyle: {
        backgroundColor: Colors.primary,
    },
   }}>
        <Stack.Screen name='Home' component={productOverview}/>
    </Stack.Navigator>
   )
};

export default ProductsNavigator;