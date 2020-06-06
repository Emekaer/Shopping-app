import React from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { Rave } from 'rave-reactnative-wrapper';

const PaymentScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is the payment PaymentScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default PaymentScreen;
