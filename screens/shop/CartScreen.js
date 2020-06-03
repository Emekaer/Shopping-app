import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/order";
import { Snackbar } from "react-native-paper";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cartTotal = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    setIsVisible(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotal));
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.screen}>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Total:{" "}
            <Text style={styles.amount}>
              ${Math.round(cartTotal.toFixed(2) * 100) / 100}
            </Text>
          </Text>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Button
              color={Colors.accent}
              title="Order Now"
              disabled={cartItems.length === 0}
              onPress={sendOrderHandler}
            />
          )}
        </View>
        <View>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId}
            renderItem={(itemData) => (
              <CartItem
                quantity={itemData.item.quantity}
                title={itemData.item.productTitle}
                amount={itemData.item.sum}
                delatable
                onRemove={() => {
                  dispatch(cartActions.removeFromCart(itemData.item.productId));
                }}
              />
            )}
          />
        </View>
      </View>
      <Snackbar
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        duration={2000}
        style={{
          backgroundColor: Colors.primary,
          borderRadius: 10,
          alignItems: "flex-end",
        }}
      >
        Product Ordered
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "openSansBold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
