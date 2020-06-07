import React from "react";
import { View, StyleSheet, Text, TextInput, Alert, Button } from "react-native";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { pay } from "../../store/actions/pay";

const PaymentScreen = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Text>This is the payment PaymentScreen</Text>
      <Button color={Colors.primary} title={"PAY!"} onPress={()=>{dispatch(pay)}} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default PaymentScreen;