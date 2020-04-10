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
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const defaultNavOps = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: "openSansBold",
  },
};

const ProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOps}>
      <Stack.Screen
        name="All Products"
        component={productOverview}
        options={(navData) => ({
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
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        options={(navData) => ({
          title: navData.route.params.productTitle,
        })}
        component={ProductDetail}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={(navData) => ({
          headerTitle: "Your Cart",
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
        options={(navData) => ({
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
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const userNavigation = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOps}>
      <Stack.Screen
        name="UserProductScreen"
        component={UserProductScreen}
        options={(navData) => ({
          headerTitle: "Your Products",
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
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="ADD"
                iconName={"md-create"}
                onPress={() => {
                  navData.navigation.navigate("EditProductScreen", {
                    productId: false,
                  });
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={(navData) => {
          const submitFn = navData.route.params.submit;
          return {
            headerTitle: navData.route.params.productId
              ? "Edit Product"
              : "Add Product",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Save"
                  iconName={"md-checkmark"}
                  onPress={submitFn}
                />
              </HeaderButtons>
            ),
          };
        }}
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
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={"md-list"}
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigation}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={"md-cart"}
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={userNavigation}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={"md-create"}
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOps}>
      <Stack.Screen name="Login" component={AuthScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const isLoggedIn = useSelector((state) => state.auth.isSignIn);
  console.log(isLoggedIn);
  return (
    <Stack.Navigator headerMode="none">
      {isLoggedIn ? (
        <Stack.Screen name="Here" component={SideDrawer} />
      ) : (
        <Stack.Screen
          name="Here"
          component={AuthNavigator}
          options={() => {
            return {
              headerTitle: "Login",
            };
          }}
        />
      )}
    </Stack.Navigator>
  );
};
export default MainNavigator;
