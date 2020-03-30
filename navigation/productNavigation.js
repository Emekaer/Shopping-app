import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import productOverview from "../screens/shop/ProductOverview";
import Colors from "../constants/Colors";
import ProductDetail from "../screens/shop/ProductDetails";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/HeaderButton";
import CartScreen from "../screens/shop/CartScreen";

const Stack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary
        },
        headerTitleStyle: {
          fontFamily: "openSansBold"
        }
      }}
    >
      <Stack.Screen
        name="Products"
        component={productOverview}
        options={navData => ({
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={"ios-cart"}
                onPress={()=>{navData.navigation.navigate("CartScreen")}}
              />
            </HeaderButtons>
          )
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        options={navData => ({
          title: navData.route.params.title
        })}
        component={ProductDetail}
      />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;
