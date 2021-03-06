import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useReducer,
} from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as productAction from "../../store/actions/products";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { isLoading } from "expo-font";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
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

const EditProductScreen = (props) => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const myInput = useRef();

  const { navigation, route } = props;

  const productId = route.params?.productId;

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      description: editedProduct ? editedProduct.description : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const submitFn = async () => {
    if (myInput.current.isFocused()) {
      try {
        await myInput.current.blur();
      } catch (err) {
        setError(err);
      }
      await Keyboard.dismiss();
      submitHandler();
      return;
    } else {
      await Keyboard.dismiss();
      submitHandler();
      return;
    }
  };

  useEffect(() => {
    myInput.current.focus();
  }, [myInput]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
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
      if (editedProduct) {
        dispatch(
          productAction.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        dispatch(
          productAction.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [
    dispatch,
    formReducer,
    inputChangeHandler,
    productId,
    formState,
    error,
    isloading,
    navigation,
    myInput,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: productId ? "Edit Product" : "Add Product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Save" iconName={"md-checkmark"} onPress={submitFn} />
        </HeaderButtons>
      ),
    });
  }, [
    submitHandler,
    submitFn,
    navigation,
    route,
    inputChangeHandler,
    formState,
    dispatchFormState,
    myInput,
  ]);

  if (isloading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            forwardRef={myInput}
            id="title"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            label="Title"
            errorText="Please add valid title!"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            forwardRef={myInput}
            id="imageUrl"
            keyboardType="default"
            returnKeyType="next"
            label="Image Url"
            errorText="Please add valid ImageUrl!"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              navigation={navigation}
              submitHandler={submitHandler}
              Keyboard={Keyboard}
              forwardRef={myInput}
              id="price"
              keyboardType="decimal-pad"
              returnKeyType="next"
              label="Price"
              errorText="Please add valid Price!"
              required
              min={0.1}
              onInputChange={inputChangeHandler}
            />
          )}
          <Input
            forwardRef={myInput}
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default EditProductScreen;
