import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem'

const ProductOverViewScreen = props => {
    const allProducts = useSelector(state => state.products.availableProducts)

    return (
        <FlatList
            data={allProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onViewDetail={() => props.navigation.navigate('ProductDetail', {productId: itemData.item.id, title: itemData.item.title})}
                onAddToCart={()=>{}}
                />
            )
} />
    ) 
};

export default ProductOverViewScreen;