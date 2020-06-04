import React, { useState, useLayoutEffect } from "react";
import { FlatList, View, Text, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as productsAction from "../../store/actions/products";
import { Snackbar } from "react-native-paper";

const UserProductScreen = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const deleteHandler = (id) => {
    Alert.alert("Are you sure ?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsAction.deleteProduct(id));
          setIsVisible(true);
        },
      },
    ]);
  };

  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (id) => {
    props.navigation.navigate("EditProductScreen", { productId: id });
  };

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No products available. Start adding Products now?</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={userProducts}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              editProductHandler(itemData.item.id);
            }}
          >
            <Button
              color={Colors.primary}
              title="Edit"
              onPress={() => {
                editProductHandler(itemData.item.id);
              }}
            />
            <Button
              color={Colors.primary}
              title="Delete"
              onPress={() => {
                deleteHandler(itemData.item.id);
              }}
            />
          </ProductItem>
        )}
      />
      <Snackbar
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        duration={2000}
        style={{
          backgroundColor: Colors.primary,
          borderRadius: 10,
          alignItems: "flex-end",
        }}
      >
        Deleted
      </Snackbar>
    </View>
  );
};

export default UserProductScreen;
