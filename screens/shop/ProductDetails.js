import React from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Image,
    Button,
    Text
} from "react-native";
import products from '../../store/reducers/products';
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

const ProductDetail = props => {

    const { productId } = props.route.params;

    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.button}>
                <Button  color={Colors.primary} title="Add to Cart" onPress={() => { }} />
            </View>
            <Text style={styles.prices} >${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description} >{selectedProduct.description}</Text>
        </ScrollView>
    )

};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    prices: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'openSansBold',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'openSans',
    },
    button:{
        marginVertical: 10,
        alignItems: 'center'
    }

});

export default ProductDetail;
