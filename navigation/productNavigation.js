import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import productOverview from '../screens/shop/ProductOverview';
import Colors from "../constants/Colors";
import ProductDetail from '../screens/shop/ProductDetails';


const Stack = createStackNavigator();

const ProductsNavigator = () => {
    return (<Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: Colors.primary,
            },
            headerTitleStyle: {
                fontFamily: 'openSansBold',
            }
        }}>
        <Stack.Screen name='Products' component={productOverview} />
        <Stack.Screen name='ProductDetail'
            options={(navData) => ({
                title: navData.route.params.title
            })} component={ProductDetail} />
    </Stack.Navigator>
    )
};

export default ProductsNavigator;