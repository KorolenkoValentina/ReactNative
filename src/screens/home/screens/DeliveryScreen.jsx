
import React from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
  
} from 'react-native';
import { colors } from '../../../components/Colors';


export default function DeliveryScreen() {


  return (
    <SafeAreaView style={styles.container}>
        
      <ScrollView style={styles.wrapDelivery}>
        <Text style={styles.deliveryTitle}>Terms of delivery</Text>
        <Text style={styles.deliverySubtitle}>Delivery time from 10a.m - 21p.m</Text>
        <View >
            <Text style={styles.deliveryTitle}>Payment options</Text>
            
            <View style={styles.wrapDeliveryItem}>
                <Image source={require('../images/settingsScreen/icon-credit-card.png')} style={styles.icon}/>
                <Text style={styles.deliverySubtitle}> Bank card online</Text>
                <Text style={styles.deliveryDescription}> When placing an order on the website (the service is available for cards: Visa, MasterCard) </Text>
            </View>
            <View style={styles.wrapDeliveryItem}>
                <Image source={require('../images/settingsScreen/icon-cash.png')} style={styles.icon}/>
                <Text style={styles.deliverySubtitle}> In cash</Text>
                <Text style={styles.deliveryDescription}> Payment in cash to the courier or in the restaurant upon receipt of the order </Text>
            </View>
            <View style={styles.wrapDeliveryItem}>
                <Image source={require('../images/settingsScreen/icon-wallet.png')} style={styles.icon}/>
                <Text style={styles.deliverySubtitle}> By bank card on receipt</Text>
                <Text style={styles.deliveryDescription}> Payment by card to the courier or in the restaurant upon receipt of the order </Text>
            </View>
        </View>

        <View >
            <Text style={styles.deliveryTitle}>Types of orders</Text>
            
            <View style={styles.wrapDeliveryItem}>
                <Image source={require('../images/settingsScreen/icon-pizza-deliver.png')} style={styles.icon}/>
                <Text style={styles.deliverySubtitle}> Delivery</Text>
                <Text style={styles.deliveryDescription}> Order in any convenient way and receive your order to the address you specify </Text>
            </View>
            <View style={styles.wrapDeliveryItem}>
                <Image source={require('../images/settingsScreen/icon-takeaway.png')} style={styles.icon}/>
                <Text style={styles.deliverySubtitle}> Pick up from the restaurant</Text>
                <Text style={styles.deliveryDescription}> Receive your order at the restaurant at a time convenient for you (the order can be placed at least 30 minutes before pickup) </Text>
            </View>
            <View style={styles.wrapDeliveryItem}>
                <Image source={require('../images/settingsScreen/icon-delivery-ontime.png')} style={styles.icon}/>
                <Text style={styles.deliverySubtitle}> Delivery by a certain time</Text>
                <Text style={styles.deliveryDescription}> Choose up to a certain time, receive your order minute by minute. The order can be placed at least 60 minutes before the delivery time </Text>
            </View>
        </View>

            
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },

  wrapDelivery:{
    
    // flexDirection:'column',
    // justifyContent:'center',
    // alignItems:'center'

  },

  deliveryTitle:{
    fontSize:22,
    fontWeight: 'bold',
    color: colors.mainColor,
    textAlign:'center',
    textDecorationLine: 'underline',
    marginVertical:20
    
  },

  wrapDeliveryItem:{
    width: 300,
    alignItems:'center',
    marginBottom:40,
    padding: 16,
    shadowOffset: {
        width: 0,
        height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    borderRadius: 10,
    borderColor: colors.shadowBorderColor,
    backgroundColor: colors.white, // Add a background color to see the shadow on iOS
    elevation: 3, 
  },
  icon:{
    width:50,
    height:50
  },

  deliverySubtitle:{
    fontSize:18,
    fontWeight: 'bold',
    marginTop:30,
    
  },
  deliveryDescription:{
    fontSize:14,
    textAlign: 'center',
    marginTop:10,
    color:colors.textColor
  }

  
});