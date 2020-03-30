import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

const OrderScreen = props => {
    const orders = useSelector(state => state.orders.order)

    return(
        <FlatList keyExtractor={item =>item.id}
        data={orders}
    renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
        />
    )
};


export default OrderScreen;
