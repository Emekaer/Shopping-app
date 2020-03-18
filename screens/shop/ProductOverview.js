import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSelector } from 'react-redux';


const ProductOverViewScreen = props => {
    const allProducts = useSelector(state => state.products.availableProducts)

    return (
        <FlatList
            data={allProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (<View>
                <Text>{itemData.item.title}</Text>
            </View>)
} />
    ) 
};

export default ProductOverViewScreen;