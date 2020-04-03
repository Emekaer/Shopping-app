import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { useSelector } from "react-redux";

const EditProductScreen = props => {
  const { productId } = props.route.params;
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === productId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    console.log("Submitting!");
  },[]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

    return (
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={text => setTitle(text)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>imgeUrl</Text>
            <TextInput
              style={styles.input}
              value={imageUrl}
              onChangeText={text => setImageUrl(text)}
            />
          </View>
          {editedProduct ? null : (
            <View style={styles.formControl}>
              <Text style={styles.label}>PRICE</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={text => setPrice(text)}
              />
            </View>
          )}
          <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: "100%"
  },
  label: {
    fontFamily: "openSansBold",
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export default EditProductScreen;
