import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
} from 'react-native';
   

const mockItemData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Pepperoni',
    isNew: true,
    image: require('./images/pepperoni.jpg'),
    oldPrice: '$14.99',
    newPrice: '$9.99',
    description: 'Classic pizza with mozzarella and pepperoni sausage.',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Mozzarella pizza',
    isNew: false,
    image:require('./images/pizza-margarita.jpg'),
    oldPrice: '$12.99',
    newPrice: '$8.99',
    description: 'Delicious pizza with Italian mozzarella. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Vegetarian pizza ',
    isNew: true,
    image:require('./images/pizza-vegetarian.jpg'),
    oldPrice: '$15.99',
    newPrice: '$10.99',
    description: 'Italian vegetarian pizza with tomatoes, mushrooms, peppers, onion, and black olives. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const Item = ({ title, image, oldPrice, newPrice, description, isNew }) => (
  <View style={styles.item}>
    <View style={styles.itemContent}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.pizza} />
        {isNew && <View style={styles.newBadge}><Text style={styles.newBadgeText}>New</Text></View>}
      </View>
      <View style={styles.textContainer}>
       
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.oldPrice}>{oldPrice}</Text>
          <Text style={styles.newPrice}>{newPrice}</Text>
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>{description}</Text>
      </View>
    </View>
    <View style={styles.iconsContainer}>
        <Text style={styles.likeIcon}>❤️</Text>
        <Text style={styles.cartIcon}>Buy 🛒</Text>
      
    </View>
  </View>
);

  
export default function App(){
  return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={mockItemData}
          renderItem={({item}) => (
          <Item 
            title={item.title}
            image={item.image}
            oldPrice={item.oldPrice}
            newPrice={item.newPrice}
            description={item.description}
            isNew={item.isNew}
          />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
};
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },

    item: {
      width: '90%',
      backgroundColor: '#FFEBCD',
      margin: 20,
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor:'#8B4513',
      shadowOffSet: {
        with:0,
        height:12,
      },
      shadowOpacity:0.58,
      shadowRadius: 16.00,
      elevation: 5, // Elevation для тіні (працює на Android)
      borderRadius: 10,
      borderWidth: 2,
    },

    itemContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    
    },

    
    imageContainer: {
        marginRight: 10,
        position: 'relative',
    },

    textContainer: {
        flex: 1,
        maxWidth:170,
       
    },
   
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 5,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },

    oldPrice: {
        textDecorationLine: 'line-through',
        color: 'red',
    },

    newPrice: {
        color: 'green',
    },

    description: {
        fontSize: 14,
        color: 'gray',
    },
    
    pizza: {
        width: 68,
        height: 75,
        borderRadius: 10,
    },
    newBadge: {
        position: 'absolute',
        top: -20,
        right: -20,
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 10,
    },

    newBadgeText: {
        color: 'white',
        fontWeight: 'bold',
    },

    iconsContainer: {
      
     justifyContent: 'space-between',
     alignItems: 'flex-end',
     position: 'absolute',
     top: 0,
     right: 0,

    },

  
    likeIcon: {
      fontSize: 22,
      top: 5,
      right: 5,
    },
  
    cartIcon: {
      fontSize: 20,
      top: 30,
      right: 5,
    },

    
});