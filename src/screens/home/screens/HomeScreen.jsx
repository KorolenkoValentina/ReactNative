import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  RefreshControl,
  ScrollView
} from 'react-native';

import Header from '../components/Header';
import {mockItemData, mockOnEndReachedData } from '../components/MockData'; 
import {colors} from '../components/Colors'
   

const mockRefreshItem = [
 {id: '58694a0f-3da1-471f-bd96-145571e29d94',
 title: 'Сaesar pizza ',
 isNew: true,
 image: require('../images/homeScreen/pizza-сaesar.jpg'),
 oldPrice: '$15.99',
 newPrice: '$12.99',
 description: 'Italian pizza with chicken breast, mozzarella cheese, parmesan cheese, quail eggs, tomatoes, iceberg lettuce, provan herbs, béchamel sauce.',
}
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
        <Image source={require('../images/header/icon-like.png')} style={styles.likeIcon}/>

        <Image source={require('../images/homeScreen/icon-basket.png')} style={styles.cartIcon}/>
      
    </View>
  </View>
);

  
export default function App(){
  const [filteredData, setFilteredData] = useState(mockItemData);
  const [refreshing, setRefreshing] = useState(false);
  const [dataWithRefreshItem, setDataWithRefreshItem] = useState(mockItemData);
  const [isEndReached, setIsEndReached] = useState(false);
  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setDataWithRefreshItem([mockRefreshItem[0], ...mockItemData]);
      setIsEndReached(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setFilteredData(dataWithRefreshItem);
  }, [dataWithRefreshItem]);


  const onEndReached = () => {
    if (!isEndReached) {
    setDataWithRefreshItem((prevData) => [...prevData, ...mockOnEndReachedData]);
    setIsEndReached(true)};
  }


  const onSearch= (text) => {
    const filteredItems = mockItemData.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase()) 
    );
    setFilteredData(filteredItems);
  };



  return (
    <SafeAreaView style={styles.container}>
      <Header onSearch={onSearch} />

      <FlatList
        data={filteredData}
         renderItem={({ item }) => (
          <Item
            title={item.title}
            image={item.image}
           oldPrice={item.oldPrice}
            newPrice={item.newPrice}
            description={item.description}
            isNew={item.isNew}
          />
        )}
        keyExtractor={(item) => item.id}
        // onRefresh={onRefresh} 
        // refreshing={refreshing} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
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
    backgroundColor: colors.primaryBackground,
    margin: 20,
    padding: 10,
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
    color: colors.oldPriceColor,
  },

  newPrice: {
    color: colors.newPriceColor,
  },

  description: {
    fontSize: 14,
    color: colors.textColor,
  },
    
  pizza: {
    width: 68,
    height: 75,
    borderRadius: 10,
  },
  newBadge: {
    position: 'absolute',
    top: -5,
    right: -15,
    backgroundColor: colors.newBadgeBackground,
    padding: 4,
    borderRadius: 10,
  },

  newBadgeText: {
    color: colors.newBadgeText,
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
    width:20,
    height: 20,
    top: 8,
    right: 5,
  },
  
  cartIcon: {
    width:20,
    height: 20,
    top: 45,
    right: 5,
  },

    
})
