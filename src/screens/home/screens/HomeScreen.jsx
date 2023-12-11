import React, { useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  RefreshControl,
  TouchableOpacity
  
} from 'react-native';

import Header from '../components/Header';
import {colors} from '../../../components/Colors'
import {mockItemData, mockOnEndReachedData } from '../components/MockData';

   

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


const Item = ({ title, image, oldPrice, newPrice, description, isNew, onPress }) => (
  <TouchableOpacity onPress={() => onPress({ title, image, oldPrice, newPrice, description, isNew })} activeOpacity={1}>
    <View style={styles.item}>
   
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.pizza} />
        {isNew && <Image style={styles.iconNew} source={require('../images/homeScreen/icon-new.png')}></Image>}
      </View>
      <View style={styles.wrapRight}>
        <View style={styles.wrapTitle}>
          <Text style={styles.title}>{title}</Text>
          <Image source={require('../images/header/icon-like.png')} style={styles.icon}/>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.oldPrice}>{oldPrice}</Text>
          <Text style={styles.newPrice}>{newPrice}</Text>
        </View>
        <View style={styles.wrapDesc}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>{description}</Text>
          <View style={styles.wrapCard}>
            <Text style={styles.titleCard}>Buy</Text>
            <Image source={require('../images/homeScreen/icon-basket.png')} style={styles.icon}/>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

  
export default function HomeScreen(props){
 
  const [filteredData, setFilteredData] = useState(mockItemData);
  const [refreshing, setRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const navigation = useNavigation();
  
  const onPress = (item) => {
    navigation.navigate('Pizza Details', { item });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setFilteredData([mockRefreshItem[0], ...mockItemData]);
      setIsEndReached(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setFilteredData(mockItemData);
  }, [mockItemData]);


  const onEndReached = () => {
    if (!isEndReached) {
    setDataWithRefreshItem((prevData) => [...prevData, ...mockOnEndReachedData.slice(0, 5)]);
    setIsEndReached(true);
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
          <Item onPress={onPress}
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
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
    color: colors.oldPriceColor,
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
  },
  
})
