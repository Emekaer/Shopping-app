import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CartItem = props => {
  return (
    <View style={styles.CartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${(props.amount.toFixed(2))}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.StyleSheet}>
          <Ionicons name="md-trash" size={23} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: "space-between",
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center"
  },
  quantity: {
    fontFamily: "openSans",
    color: "#888",
    fontSize: 16
  },
  mainText: {
    fontFamily: "openSansBold",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  deleteButton: {
    margin: 20
  }
});

export default CartItem;
