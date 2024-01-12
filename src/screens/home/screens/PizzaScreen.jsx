import React,{useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity ,
  FlatList,
} from 'react-native';

import  orderStore from '../store/index';
import  orderWishStore from '../store/indexWishStore';
import CustomTouchable from '../../../components/CustomTouchable'
import CustomSwitch from '../../../components/CustomSwitch'
import {colors} from '../../../components/Colors'
import { observer } from 'mobx-react';
import {mockVegetables, mockMeats, mockCheese, mockFish } from '../../home/components/MockData'


const PizzaScreen = ({ route})=> {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const { item, togglePizzaSize } = route.params;

  

  useEffect(() => {
    updateTotalPrice(selectedToppings);
  }, [selectedToppings]);

  
  const onPress = (item) => {

    const selectedItem = {
    ...item,
    selectedSize: selectedSize,
    selectedToppings: selectedToppings,
    updatedPrice: totalPrice,
    };
    orderStore.setOrders(selectedItem);
  };

  const onPressCategory = (category) => {
    setSelectedCategory(category);
  };

  
  const selectedSize = item && item.selectedSize ? item.selectedSize : 0;

  const isItemLiked = orderWishStore.isItemLiked(item) ;

  const onItemWish = (item) => {
    
    const priceForSize = orderWishStore.getPriceForSize(item);
    
    if (!isItemLiked) {
      orderWishStore.setOrdersWish({ ...item, price: priceForSize });
    } else {
      orderWishStore.removeOrderWish(item);
    }
  };

  const onPressProduct = (item) => {
    const isToppingSelected = selectedToppings.includes(item);
    let updatedToppings;
  
    if (isToppingSelected) {
      updatedToppings = selectedToppings.filter((topping) => topping !== item);
    } else {
      updatedToppings = [...selectedToppings, item];
    }
  
    setSelectedToppings(updatedToppings);
    updateTotalPrice(updatedToppings);
    
  };

  const updateTotalPrice = (toppings) => {
    const rounding = (value) => value.toFixed(2);
    const basePrice = item.selectedSize === 42
      ? parseFloat(item.size42.replace('$', ''))
      : parseFloat(item.newPrice.replace('$', ''));

  
    const toppingsPrice = toppings.reduce((toppingTotal, topping) => toppingTotal + parseFloat(topping.price.replace('$', '')), 0);
    const newTotalPrice =  rounding(basePrice + toppingsPrice);

    setTotalPrice(newTotalPrice);
  };

  
  
  
  const renderProductList = (data, key) => {
    return (
      <FlatList
        key={key} 
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressProduct(item)}>
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemSubtitle}>{item.price}</Text>
              <Text style={styles.itemSubtitle}>{item.weight}</Text>
              
            </View>
            {selectedToppings.includes(item) && (
              <Image
                source={require('../images/pizzaScreen/icon-check.png')} 
                style={styles.checkmarkIcon}
              />
            )}
          </View>
        </TouchableOpacity>
        )}
      />
    );
  };


  const renderItem  = ()=>{

    return (
    
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.pizza} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.wrapTitle}>
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity onPress={() =>onItemWish(item, item.selectedSize)}>
              <Image source={orderWishStore.isItemLiked(item) ? require('../images/header/icon-like.png') : require('../images/pizzaScreen/icon-like.png')} style={styles.likeIcon}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.switchContainer}>
            <CustomSwitch label="32 cm" onPress={() => togglePizzaSize(item)} isActive={item.selectedSize === 32} />
            <CustomSwitch label="42 cm" onPress={() => togglePizzaSize(item)} isActive={item.selectedSize === 42} />
          </View>
          <View style={styles.toppingContainer}>
            <Text style={styles.toppingTitle}> Add topping</Text>
            <View style={styles.categoryContainer}>
              <TouchableOpacity onPress={() => onPressCategory(mockVegetables)}>
                <Text style={selectedCategory === mockVegetables ? styles.selectedCategory : styles.category}>Vegetables</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressCategory(mockMeats)}>
                <Text style={selectedCategory === mockMeats ? styles.selectedCategory : styles.category}>Meat</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressCategory(mockCheese)}>
                <Text style={selectedCategory === mockCheese ? styles.selectedCategory : styles.category}>Cheese</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressCategory(mockFish)}>
                <Text style={selectedCategory === mockFish ? styles.selectedCategory : styles.category}>Fish</Text>
              </TouchableOpacity>
                
            </View>
            {selectedCategory && renderProductList(selectedCategory, 'unique-key')}
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.priceText}>
              <Text style={styles.titlePrice}>Price:</Text>
              <Text style={styles.price}>${totalPrice}</Text>
              {/* <Text style={styles.price}>{ orderStore.getPriceForSize(item)}</Text> */}
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
    );
  }


  return(

    <SafeAreaView style={styles.container}>
      <FlatList
      data={[item]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id} 
      />
    </SafeAreaView>
  );

  
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1, 
      
  },

  checkmarkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
  },

  item: {
    
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
    marginBottom:20
  },

  switchContainer: {
    flexDirection: 'row',
  },

  categoryContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:20

  },
  category: {
    fontSize: 16,
    color: colors.textColor,
    padding: 6, 
    borderWidth: 1,
    borderRadius:4,
    borderColor: colors.shadowBorderColor,
    marginTop:20,
  },

  selectedCategory: {
    fontSize: 16,
    backgroundColor: colors.backgroundModal,
    color: colors.mainColor,
    padding: 6, 
    borderWidth: 1,
    borderRadius:4,
    borderColor: colors.shadowBorderColor,
    marginTop:20,
  },

  itemContainer: {
    width:102,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },

  itemTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  itemTextContainer: {
    flexDirection:'row',
  },

  itemSubtitle: {
    fontSize: 10,
    color: '#666',
    marginRight:5
  },

  toppingTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:20,
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

export default observer (PizzaScreen)