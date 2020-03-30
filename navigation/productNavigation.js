import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import productOverview from "../screens/shop/ProductOverview";
import Colors from "../constants/Colors";
import ProductDetail from "../screens/shop/ProductDetails";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/HeaderButton";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const defaultNavOps = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTitleStyle: {
    fontFamily: "openSansBold"
  }
};

const ProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOps}>
      <Stack.Screen
        name="Products"
        component={productOverview}
        options={navData => ({
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={"ios-cart"}
                onPress={() => {
                  navData.navigation.navigate("CartScreen");
                }}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={"ios-menu"}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
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
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={navData => ({
          headerTitle: "Your Cart"
        })}
      />
    </Stack.Navigator>
  );
};

const OrdersNavigation = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOps}>
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={navData => ({
          headerTitle: "Your Orders",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={"ios-menu"}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          )
        })}
      />
    </Stack.Navigator>
  );
};

const SideDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{ activeTintColor: Colors.primary }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: drawerConfig => (
            <Ionicons
              name={"md-list"}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigation}
        options={{
          drawerIcon: drawerConfig => (
            <Ionicons
              name={"md-cart"}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
};

export default SideDrawer;
