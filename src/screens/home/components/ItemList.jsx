
import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  
  
} from 'react-native';


import CustomSwitch  from '../../../components/CustomSwitch';
import {colors} from '../../../components/Colors'
import orderStore from '../store/index';
import orderWishStore from '../store/indexWishStore';
import { observer } from 'mobx-react';
import ModalLikeScreen from './ModalLike';
import { useNavigation } from '@react-navigation/native';




const Item = ({item , index, togglePizzaSize }) =>{

 
  const navigation = useNavigation();
  
  const onItemPress = (item) => {
    navigation.navigate('Pizza Details', { item, togglePizzaSize: togglePizzaSize });
  };
 
  const onItemBuy = (item) => {
    const priceForSize = orderStore.getPriceForSize(item );
    orderStore.setOrders({ ...item,  price: priceForSize });
  };


  const onItemWish = (item) => {
    const isItemLiked = orderWishStore.isItemLiked(item);
    const priceForSize = orderWishStore.getPriceForSize(item);
    
    if (!isItemLiked) {
      orderWishStore.setOrdersWish({ ...item, price: priceForSize });
    } else {
      orderWishStore.removeOrderWish(item);
    }
  };
    
  const getPriceForSize=(item)=>{
    return item.selectedSize === 42 ? item.size42 : item.newPrice;
  }
  

  
  return (
      <TouchableOpacity onPress={() => onItemPress(item)} activeOpacity={1}>
      <View style={styles.item}>
     
     <View style={styles.imageContainer}>
       <Image source={item.image} style={styles.pizza} />
       {item.isNew && <Image style={styles.iconNew} source={require('../images/homeScreen/icon-new.png')}></Image>}
     </View>
     <View style={styles.wrapRight}>
       <View style={styles.wrapTitle}>
         <Text style={styles.title}>{item.title}</Text>
         <Modal
            transparent={true}
            visible={orderWishStore.modalVisible}>
            <ModalLikeScreen item={orderWishStore.lastLikedItem} orderWishStore={orderWishStore} />
            
          </Modal> 
  
         <TouchableOpacity onPress={() => onItemWish(item, item.selectedSize)}>
            <Image
               source={orderWishStore.isItemLiked(item) ? require('../images/header/icon-like.png') : require('../images/homeScreen/icon-like.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
  
       </View>
       <View style={styles.priceContainer}>
         <Text style={styles.oldPrice}>{item.oldPrice}</Text>
         <Text style={styles.newPrice}>{getPriceForSize(item)}</Text>
       </View>
       <View style={styles.switchContainer}>
            <CustomSwitch label="32 cm" onPress={() => togglePizzaSize(item)} isActive={item.selectedSize === 32} />
            <CustomSwitch label="42 cm" onPress={() => togglePizzaSize(item)} isActive={item.selectedSize === 42} />
        </View>
        
       <View style={styles.wrapDesc}>
         <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>{item.description}</Text>
         <TouchableOpacity style={styles.wrapCard}  onPress={() => onItemBuy(item, item.selectedSize)}>
           <Text style={styles.titleCard}>Buy</Text>
           <Image source={require('../images/homeScreen/icon-basket.png')} style={styles.icon}/>
         </TouchableOpacity>
       </View>
     </View>
    </View>
    </TouchableOpacity>
  )
}




  const styles = StyleSheet.create({
   
   
    switchContainer: {
      flexDirection: 'row',
    },
  
    item: {
      backgroundColor: colors.itemBackground,
      margin: 10,
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
  
    iconNew: {
      position: 'absolute',
      maxHeight: 35,
      borderRadius: 6,
      right: -25,
      top: -10,
      resizeMode: 'contain',
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
      fontFamily:'Poppins-Regular',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
      color:colors.title
    },
  
    icon: {
      width:20,
      height: 20,
    },
   
    priceContainer: {
      flexDirection: 'row',
      gap: 20,
    },
  
  
    oldPrice: {
      textDecorationLine: 'line-through',
      color: colors.red,
    },
  
    newPrice: {
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
      color: colors.title,
    },
    
  })
  
export default observer (Item)