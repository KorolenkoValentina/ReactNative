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
        orderWishStore.removeOrderWishItem(item);
    };

    const onItemBuy =(item)=>{
        orderStore.setOrders (item);
        orderWishStore.removeOrderWishItem(item);
         
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
            {item.selectedToppings && item.selectedToppings.length > 0 && (
           <View style={styles.toppingContainer}>
            <Text style={styles.titleTopping}>Add topping</Text>
              <View style={styles.selectedToppingsContainer}>
                {item.selectedToppings.map((topping, index) => (
                  <Text key={index} style={styles.selectedTopping}>{topping.title}</Text>
                ))}
              </View>
            </View>
          )}
           
            {item.type === 'pizza' ? (
            <View style={styles.priceContainer}>
                        
                <Text style={styles.titlePrice}>Price:</Text>
                <Text style={styles.price}>{orderWishStore.getPriceForSize(item).pricePizza}</Text>
                        
            </View>

            ) : item.type === 'drink' ? (
            <View style={styles.priceContainer}>
                <Text style={styles.titlePrice}>Price:</Text>
                <Text style={styles.price}>{orderWishStore.getPriceForSize(item).price}</Text>
                <Text style={styles.titlePrice}>Volume:</Text>
                <Text style={styles.price}>{orderWishStore.getPriceForSize(item).volume}</Text>
            </View> 
            ) : null} 
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
        backgroundColor: colors.mainBackground,
    },

    wrapContent:{
        flexDirection:'column',
        padding:10
    },

    wrapHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    wraptitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.orange,
        
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
        backgroundColor: colors.itemBackground,
        marginVertical:10,
        padding: 5,
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
        width: 120,
        height: 120,
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
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        color:colors.title
    },
    
    icon: {
        width:20,
        height: 20,
    },

    toppingContainer: {
        marginTop: 10,
    },
    
    titleTopping:{
        fontSize: 14,
        fontWeight: 'bold',
        color:colors.textColor,
    },
    
    selectedToppingsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    
    selectedTopping: {
        fontSize: 10,
        color: 'white',
        padding: 4,
        margin: 2,
        borderWidth: 1,
        borderRadius:4,
        borderColor: colors.shadowBorderColor,
    },
    
    
    priceContainer:{
        flexDirection:'row',
    },
    
    
    titlePrice:{
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginRight:10,
        color:colors.orange
    },
    
    price:{
        fontSize: 18,
        color: colors.newPriceColor,
        marginRight:10,   
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
        color:colors.title
      },


})

export default observer (WishListScreen)