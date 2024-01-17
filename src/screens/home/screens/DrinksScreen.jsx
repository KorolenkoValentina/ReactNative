import React from 'react';

import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity ,
    Text,
    FlatList,
    Modal
  
  
} from 'react-native';
import {mockDrinks} from '../components/MockData';
import ModalLikeScreen  from '../components/ModalLike'
import {colors} from '../../../components/Colors';
import orderWishStore from '../store/indexWishStore';
import orderStore from '../store/index';
import { observer } from 'mobx-react-lite';


const DrinksScreen = () => {

    const onItemBuy =(item)=>{

        const newItem = { 
            ...item, 
            price: item.price, 
            volume: item.volume, 
          };
        orderStore.setOrders (newItem);
        orderWishStore.removeOrderWishItem(item);
         
    };

    
    const onItemWish = (item) => {
    const isItemLiked = orderWishStore.isItemLiked(item); 
    if (!isItemLiked) {
        const newItem = { 
            ...item, 
            price: item.price, 
            volume: item.volume, 
          };
        
      orderWishStore.setOrdersWish(newItem);
    } else {
            orderWishStore.removeOrderWish(item);
        }
    };
    
   
   

    const renderItem = ({ item }) => (
    
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.drink} />
          </View>
          <View style={styles.wrapRight}>
            <View style={styles.wrapTitle}>
            <View style={styles.wrapTitle}>
         <Text style={styles.title}>{item.title}</Text>
         <Modal
            transparent={true}
            visible={orderWishStore.modalVisible}>
            <ModalLikeScreen item={orderWishStore.lastLikedItem} orderWishStore={orderWishStore} />
            
          </Modal> 
  
         <TouchableOpacity onPress={() => onItemWish(item)}>
            <Image
               source={orderWishStore.isItemLiked(item) ? require('../images/header/icon-like.png') : require('../images/homeScreen/icon-like.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
  
            </View>
            </View>
  
            <View style={styles.descriptionContainer}>
                <Text style={styles.titleDescription}>Price:</Text>
                <Text style={styles.subtitleDescription}>{item.price}</Text>
                <Text style={styles.titleDescription}>Volume:</Text>
                <Text style={styles.subtitleDescription}>{item.volume}</Text>
            </View>
            <View style={styles.wrapDesc}>
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
                <FlatList
                    data={mockDrinks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
               
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.textColor,
    },

    wrapContent:{
        flexDirection:'column',
        padding:20
    },

  
    wraptitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.orange,
        
    },

    item: {
        backgroundColor: colors.white,
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
    
    drink: {
        width: 100,
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
        color:colors.dark
    },
    
    icon: {
        width:20,
        height: 20,
    },

    
    
    
    descriptionContainer:{
        flexDirection:'row',
    },
    
    
    titleDescription:{
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginRight:10,
        color:colors.orange
    },
    
    subtitleDescription:{
        fontSize: 18,
        color: colors.newPriceColor,
        marginRight:20,   
    },

    wrapDesc: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40,
      },
    
      
      wrapCard: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    
      titleCard: {
        fontSize: 16,
        fontWeight: 'bold',
        color:colors.dark
      },


})

export default observer (DrinksScreen)