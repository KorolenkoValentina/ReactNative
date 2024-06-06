import React,{useState} from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { observer } from 'mobx-react-lite';
import orderStore from '../store/index';
import {colors} from '../../../components/Colors'


const BasketScreen = () => {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  
  const onPress = () => {
    orderStore.clearOrders(); 
    setConfirmationMessage('Order successfully cleared!');
   
    setTimeout(() => {
      setConfirmationMessage('');
    }, 2000); 
  };
  

  const onItemRemove = (item) => {
    orderStore.removeOrder(item);
  };

  const onConfirmOrder = () => {
    orderStore.confirmOrder();
    setConfirmationMessage('Order successfully sent!');
   
    setTimeout(() => {
      setConfirmationMessage('');
      
    }, 2000);
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

          <View style={styles.priceContainer}>
            <View style={styles.priceText}>
              
              {item.type === 'pizza' ? (
              <View style={styles.priceContainer}>
                        
                <Text style={styles.titlePrice}>Price:</Text>
                <Text style={styles.price}>{orderStore.getPriceForSize(item).pricePizza}</Text>
                        
              </View>

              ) : item.type === 'drink' ? (
                <View style={styles.priceContainer}>
                  <Text style={styles.titlePrice}>Price:</Text>
                  <Text style={styles.price}>{orderStore.getPriceForSize(item).price}</Text>
                  <Text style={styles.titlePrice}>Volume:</Text>
                  <Text style={styles.price}>{orderStore.getPriceForSize(item).volume}</Text>
                </View> 
              ) : null}
            </View>
            
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => orderStore.increaseQuantity(item)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => orderStore.decreaseQuantity(item)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleClear} onPress={onPress}>Clear</Text>
        <Text style={styles.titleOrders}>{`In your basket: ${orderStore.totalItems} items`}</Text>
      </View>
      <FlatList
        data={orderStore.orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.cartIconContainer}>
        {orderStore.orders.length === 0 && (
          <Image style={styles.iconCart} source={require('../../../navigation/image/icon-cart.png')} />
        )}
      </View>
      {orderStore.orders.length > 0 && (
      <View style={styles.totalContainer}>
        <View style={styles.wrapTotal}>
          <View style={styles.wrapTotalTitle}>
            <Text style={styles.totalTitle}>Total: </Text>
            <Text style={styles.totalPrice}>${orderStore.calculateTotal().totalAmount}</Text>
          </View>
          <View style={styles.wrapTotalTitle}>
            <Text style={styles.totalTitle}>Discount: </Text>
            <Text style={styles.totalPrice}> ${orderStore.calculateTotal().totalDiscount}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirmOrder}>
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </View> )}
      {confirmationMessage && (
        <View style={styles.confirmationMessageContainer}>
          <Text style={styles.confirmationMessageText}>{confirmationMessage}</Text>
        </View>
      )}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.mainBackground

  },

  titleContainer:{
    marginHorizontal:30,
    marginTop:10,
  },

  titleOrders:{
    fontSize: 18,
    fontWeight: 'bold',
    color:colors.textColor  
    
  },
 
  titleClear:{
    fontSize: 18,
    marginLeft:'auto',
    color:colors.orange
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
    color:colors.title
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

  totalContainer:{
    margin:10,
  },

  wrapTotal:{
    flexDirection:'row',
    justifyContent:'space-between'
  },

  wrapTotalTitle:{
    flexDirection:'row',
    alignItems:'center'
  },

  totalTitle:{
    color:colors.title,
    fontSize: 18,
  },

  totalPrice:{
    fontSize: 20,
    fontWeight: 'bold',
    color:colors.textColor,
  },

  icon: {
    width:20,
    height: 20,
  },

  priceContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },

  priceText:{
    flexDirection: 'column',
  },

  titlePrice:{
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color:colors.textColor,
    marginTop:5
  },

  price:{
    fontSize: 20,
    color: colors.orange,
    marginLeft:5
    
  },
  quantityContainer:{
    flexDirection:'row',
    marginTop:2,
    borderWidth:1,
    borderRadius:10,
    borderColor:colors.orange

  },

  quantityButton:{
    marginHorizontal:20,
    fontSize:16,
    fontWeight: 'bold',
    color:colors.orange
  },

  confirmButton:{
    backgroundColor: colors.orange,
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',

  },

  confirmButtonText:{
    color:colors.textColor,
    fontWeight: 'bold',
    fontSize: 16,
  },

  confirmationMessageContainer: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
    marginBottom: 40,
    alignItems: 'center',
  },

  confirmationMessageText: {
    fontSize: 16,
    color: colors.newPriceColor,
  },

  cartIconContainer:{
    flex: 70,
    justifyContent:'center',
    alignItems:'center'
  },

  iconCart:{
    width:91,
    height:91
  }

});

export default observer(BasketScreen);