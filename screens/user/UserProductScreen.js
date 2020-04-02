import React from "react";
import { FlatList, Button } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";

const UserProductScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {}}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {}}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductScreen;
