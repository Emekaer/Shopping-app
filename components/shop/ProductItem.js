import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";


const ProductItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} useForeground>
      <View style={styles.itemConatiner}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.detail}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>{props.children}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemConatiner: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  image: {
    width: "100%",
    height: "100%"
  },
  title: {
    fontFamily: "openSansBold",
    fontSize: 18,
    marginVertical: 4
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "openSans"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20
  },
  detail: {
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
    padding: 10
  }
});

export default ProductItem;
