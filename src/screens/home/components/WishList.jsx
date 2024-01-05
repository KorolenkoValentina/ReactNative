import React from 'react';

import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity ,
    Text,
    FlatList
  
  
} from 'react-native';

import {colors} from '../../../components/Colors';
import orderWishStore from '../store/indexWishStore';
import orderStore from '../store/index';
import { observer } from 'mobx-react-lite';


const WishListScreen = ({ navigation }) => {

    const closeModal = () => {
      navigation.goBack(); 
    };
    
    const onItemRemove = (item) => {
        orderWishStore.removeOrderWish(item);
    };

    const onItemBuy =(item)=>{
        orderStore.setOrders (item);
        orderWishStore.removeOrderWish(item);
         
    };
   
   

    const renderItem = ({ item }) => (
    
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.pizza} />
          </View>
          <View style={styles.wrapRight}>
            <View style={styles.wrapTitle}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity onPress={() => onItemRemove(item)}>
              <Image source={require('../../../navigation/image/icon-close-page.png')} style={styles.icon}/>
              </TouchableOpacity>
            </View>
  
            <View style={styles.priceContainer}>
                <Text style={styles.titlePrice}>Price:</Text>
                <Text style={styles.price}>{orderWishStore.getPriceForSize(item)}</Text>
            </View>
            <View style={styles.wrapDesc}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>{item.description}</Text>
                <TouchableOpacity style={styles.wrapCard}  onPress={() => onItemBuy(item)}>
                    <Text style={styles.titleCard}>Buy</Text>
                    <Image source={require('../images/homeScreen/icon-basket.png')} style={styles.icon}/>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      
    );
  
    return (
        <View style={styles.container}>
            <View style={styles.wrapContent}>
                <View style={styles.wrapHeader}>
                    <Text style={styles.wraptitle}>Wish List</Text>
                    <TouchableOpacity onPress={closeModal}>
                        <Image source={require('../../../navigation/image/icon-close.png')} style={styles.closeButton}/>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={orderWishStore.orders}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
                {orderWishStore.orders.length === 0 && (
                <View  style={styles.wrapImage}>
                    <Image source={require('../../../navigation/image/icon-wishList.png')} style={styles.iconWish}/>
                </View>
                )}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:80,
        backgroundColor: colors.backgroundModal,
    },

    wrapContent:{
        flexDirection:'column',
        padding:20
    },

    wrapHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    wraptitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.mainColor,
    },
    
    closeButton: {
        width:28,
        height:28
    
    },

    wrapImage:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop:250,
    },
    
    iconWish:{
        width:80,
        height:80
    },

    item: {
        backgroundColor: colors.primaryBackground,
        margin: 20,
        padding: 10,
        gap: 20,
        minHeight: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: colors.shadowColor,
        shadowOffSet: {
          with:0,
          height:12,
        },
        shadowOpacity:0.58,
        shadowRadius: 16.00,
        elevation: 5, // Elevation для тіні (працює на Android)
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
    
    wrapTitle: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    
    icon: {
        width:20,
        height: 20,
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

    wrapDesc: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40,
      },
    
      description: {
        flex: 1,
        fontSize: 14,
        color: colors.textColor,
      },
      
      wrapCard: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    
      titleCard: {
        fontSize: 16,
        fontWeight: 'bold',
      },


})

export default observer (WishListScreen)