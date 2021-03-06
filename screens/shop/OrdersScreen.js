import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import * as orderAction from "../../store/actions/order";
import Colors from "../../constants/Colors";
import Swipeable from "react-native-gesture-handler/Swipeable";

const OrderScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orders.order);
  const dispatch = useDispatch();

  const deleteHandler = () => {
    return (
      <View>
        <Text>Delete</Text>
      </View>
    );
  };
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      await dispatch(orderAction.fetchOrders());
      setIsLoading(false);
    };

    fetchOrders();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No orders available. Start placing orders now?</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <Swipeable renderLeftActions={deleteHandler}>
            <OrderItem
              amount={itemData.item.totalAmount}
              date={itemData.item.readableDate}
              items={itemData.item.items}
            />
          </Swipeable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default OrderScreen;
