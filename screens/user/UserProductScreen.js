import React from "react";
import { FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as productsAction from "../../store/actions/products";
import EditProductScreen from "./EditProductScreen";

const UserProductScreen = props => {
  const deleteHandler = id => {
    Alert.alert(
      "Are you sure ?",
      "Do you really want to delete this item?",
      [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            dispatch(productsAction.deleteProduct(id));
          }
        }
      ]
    );
  };

  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = id => {
    props.navigation.navigate("EditProductScreen", { productId: id });
  };
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
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
  );
};

export default UserProductScreen;
