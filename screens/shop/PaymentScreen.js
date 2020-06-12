import React, {
  useReducer,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Button,
} from "react-native";
import Colors from "../../constants/Colors";
import RNPaystack from "react-native-paystack";
import { paystack } from "../../.ENV/key";
import Input from "../../components/UI/Input";
import { ScrollView } from "react-native-gesture-handler";
import { pay } from "../../store/actions/pay";
import { useDispatch } from "react-redux";

RNPaystack.init({ publicKey: paystack.public });

const PAYMENT_DETAILS = "PAYMENT_DETAILS";

const paymentReducer = (state, action) => {
  if (action.type === PAYMENT_DETAILS) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const PaymentScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const myInput = useRef();
  const dispatch = useDispatch();

  const { navigation, route } = props;

  const [formState, dispatchFormState] = useReducer(paymentReducer, {
    inputValues: {
      cardNumber: null,
      expiryMonth: null,
      expiryYear: null,
      ccv: null,
    },
    inputValidities: {
      cardNumber: false,
      expiryMonth: false,
      expiryYear: false,
      ccv: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: PAYMENT_DETAILS,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    myInput.current.focus();
  }, [myInput]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const chargeCardWithAccessCode = useCallback(async () => {
    if (!formState.formIsValid) {
      console.log(!formState.formIsValid);
      Alert.alert("Wrong input!", "Please Check for errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }

    console.log("valid");
    setError(null);
    setIsLoading(true);
    try {
      console.log("Payment attempted");
      RNPaystack.chargeCard({
        cardNumber: formState.inputValues.cardNumber,
        expiryMonth: formState.inputValues.expiryMonth,
        expiryYear: formState.inputValues.expiryYear,
        cvc: formState.inputValues.ccv,
        email: "emekaokaforer@gmail.com",
        amountInKobo: 150000,
        accessCode: "2p3j42th639duy4",
      })
        .then((response) => {
          console.log(response); // do stuff with the token
          dispatch(pay(response));
        })
        .catch((error) => {
          console.log(error); // error is a javascript Error object
          console.log(error.message);
          console.log(error.code);
        });
      navigation.navigate("All Products");
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [
    paymentReducer,
    inputChangeHandler,
    formState,
    error,
    isLoading,
    navigation,
    myInput,
  ]);

  const date = new Date();
  let month = date.getMonth();
  if (month < 10) {
    month = "0" + month;
  }
  const year = date.getFullYear().toString().slice(2);

  return (
    <KeyboardAvoidingView style={styles.screen} keyboardVerticalOffset={150}>
      <ScrollView>
        <Input
          placeholder={"0000 0000 0000 0000"}
          forwardRef={myInput}
          id="cardNumber"
          keyboardType="number-pad"
          returnKeyType="next"
          label="Card Number:"
          errorText="Please add Card Number"
          onInputChange={inputChangeHandler}
          initialValue={""}
          initiallyValid={false}
          required
          valueLenght={16}
        />
        <Input
          forwardRef={myInput}
          placeholder={month}
          id="expiryMonth"
          keyboardType="number-pad"
          returnKeyType="next"
          label="Expiry Month:"
          errorText="Please add Expiry Month"
          onInputChange={inputChangeHandler}
          initialValue={""}
          initiallyValid={false}
          required
          valueLenght={2}
          max={12}
        />
        <Input
          forwardRef={myInput}
          placeholder={year}
          max={99}
          id="expiryYear"
          keyboardType="number-pad"
          returnKeyType="next"
          label="Expiry Year:"
          errorText="Please add valid Expiry Year!"
          onInputChange={inputChangeHandler}
          initialValue={""}
          initiallyValid={false}
          required
          valueLenght={2}
        />
        <Input
          forwardRef={myInput}
          placeholder={"000"}
          id="ccv"
          keyboardType="number-pad"
          returnKeyType="next"
          label="CCV:"
          errorText="Please add valid CCV!"
          onInputChange={inputChangeHandler}
          initialValue={""}
          initiallyValid={false}
          required
          valueLenght={3}
        />
        <Button
          color={Colors.primary}
          title={"PAY!"}
          onPress={() => {
            chargeCardWithAccessCode();
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default PaymentScreen;
