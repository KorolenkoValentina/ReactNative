import React from 'react';

import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  
} from 'react-native';

import  orderStore from '../store/index';
import CustomTouchable from '../../../components/CustomTouchable'
import {colors} from '../../../components/Colors'

export default function PizzaScreen({ route }) {

  const { item } = route.params;
 
  const onPress = (item) => {
    orderStore.setOrders(item);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.pizza} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={require('../images/pizzaScreen/icon-like.png')} style={styles.likeIcon}/>
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.priceContainer}>
            <View style={styles.priceText}>
              <Text style={styles.titlePrice}>Price:</Text>
              <Text style={styles.price}>{item.newPrice}</Text>
            </View>
            <CustomTouchable style={styles.buttonContainer} onPress={() => onPress(item)}>
              <View style={styles.buttonContent}>
              <Text style={styles.text}>Get</Text>
              <Image source={require('../images/homeScreen/icon-basket.png')} style={styles.cartIcon}/>
              </View>
            </CustomTouchable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      
    },

    item: {
      width: '90%',
      minHeight:'90%',
      backgroundColor: colors.primaryBackground,
      marginVertical: 30,
      marginHorizontal:20,
      padding: 10,
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.shadowBorderColor,
    },

    textContainer: {
      flex: 1,
      maxWidth:300,
      marginTop:30,
         
    },

    pizza: {
      width: 300,
      height: 300,
      borderRadius: 10,
      marginTop:10
    },

    wrapTitle:{
      flexDirection: 'row',
      justifyContent:'space-between',
      marginBottom:20,
    },

    title: {
      fontSize: 30,
      fontWeight: 'bold',
       
    },

    likeIcon: {
      width:28,
      height: 28,
      marginTop:8,
      
    },

    description: {
      fontSize: 16,
      color: colors.textColor,
    },

    priceContainer:{
      flexDirection: 'row',
      justifyContent:'space-between',
      marginTop:30,
    },

    priceText:{
      flexDirection: 'column',
    },

    titlePrice:{
      fontSize: 14,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },

    price:{
      fontSize: 20,
      color: colors.newPriceColor,
      
    },

    cartIcon: {
      width:20,
      height: 20,
      marginLeft: 6,
      
    },

    buttonContainer: {
      backgroundColor: colors.buttonBackground,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 18,
  
    },

    buttonContent: {
      flexDirection: 'row',
      
      
    },

    text: {
      fontSize: 16,
      color: colors.buttonColor, 
     
    },
})