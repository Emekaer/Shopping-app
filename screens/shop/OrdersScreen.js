import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";

const OrderScreen = props => {
  const orders = useSelector(state => state.orders.order);

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
      />
    </View>
  );
};

export default OrderScreen;
