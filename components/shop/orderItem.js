import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Color from "../../constants/Colors";
import CartItem from "./CartItem";

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.OrderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Color.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  OrderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10
  },
  summary: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: "openSansBold",
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: "openSans",
    color: "#888"
  },
  detailItems: {
    width: "100%"
  }
});

export default OrderItem;
