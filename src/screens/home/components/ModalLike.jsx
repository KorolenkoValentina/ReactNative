import React from 'react';

import {
    StyleSheet,
    Image,
    View,
    Text,
    FlatList,
    
 
} from 'react-native';

import {colors} from '../../../components/Colors';
import orderWishStore from '../store/indexWishStore';
import { observer } from 'mobx-react-lite';


const ModalLikeScreen = () => {
    
    
    const renderItem = ({ item }) => {


        const isLastLikedItem =
        orderWishStore.lastLikedItem && item.id === orderWishStore.lastLikedItem.id && item.selectedSize === orderWishStore.lastLikedItem.selectedSize;
     
        return isLastLikedItem ? (
            
            <View style={styles.item}>
             
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.pizza} />
                </View>
         
                <View style={styles.wrapRight}>
                   <Text style={styles.title}>{item.title}</Text>
                   
                    <View style={styles.priceContainer}>
                        <Text style={styles.titlePrice}>Price:</Text>
                        <Text style={styles.price}>{orderWishStore.getPriceForSize(item)}</Text>
                    </View>
                </View>
                <View style={styles.wrapLeft}>
                    <Image
                        source={ require('../images/header/icon-like.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.titleCard}>{orderWishStore.isRemoveAction  ? 'Delete' : 'Add'}</Text>
                   
                </View>
           </View>
        ) : null;
    };
  
    return (
       
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>  
                <FlatList
                  data={orderWishStore.orders}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },

    modalContent: {
        padding: 10,
        backgroundColor:'white'
    },
    
    wraptitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    
    item: {
        backgroundColor: colors.primaryBackground,
        paddingHorizontal: 20,
        paddingVertical:10,
        gap: 20,
        minHeight: 100,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.shadowBorderColor,
      },
    
    pizza: {
        width: 75,
        height: 75,
        borderRadius: 10,
        resizeMode: 'stretch',
    },
    
    wrapRight: {
        gap: 10,
        flex: 1,
    },
    
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    
    icon: {
        width:30,
        height: 30,
    },
    
    priceContainer:{
        flexDirection:'row',
    },
    
    
    titlePrice:{
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginRight:8,
    },
    
    price:{
        fontSize: 16,
        color: colors.newPriceColor,   
    },

    titleCard: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default observer (ModalLikeScreen)