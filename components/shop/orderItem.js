import React from 'react';
import {  View, Text, StyleSheet, Button} from "react-native";
import Color from "../../constants/Colors";
import CartItem from './CartItem';

const OrderItem = props =>{
    <View style={styles.OrderItem}>
        <View style={styles.summary}>
            <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <Button color={Color.primary} title="Show Details"/>
    </View>

};

const styles = StyleSheet.create({});

export default OrderItem;