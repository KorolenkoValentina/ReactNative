import React, { useState, useEffect, useCallback} from 'react';

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  
} from 'react-native';

import Header from '../components/Header';
import CustomSwitch  from '../../../components/CustomSwitch';
import {colors} from '../../../components/Colors'
import {mockItemData, mockOnEndReachedData } from '../components/MockData';
import orderStore from '../store/index';
import orderWishStore from '../store/indexWishStore';
import { observer } from 'mobx-react';
import Animated, {  useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
   

const mockRefreshItem = [
 {id: '58694a0f-3da1-471f-bd96-145571e29d94',
 title: 'Сaesar pizza ',
 isNew: true,
 image: require('../images/homeScreen/pizza-сaesar.jpg'),
 oldPrice: '$15.99',
 newPrice: '$12.99',
 size42:'$14.99',
 selectedSize: 32,
 description: 'Italian pizza with chicken breast, mozzarella cheese, parmesan cheese, quail eggs, tomatoes, iceberg lettuce, provan herbs, béchamel sauce.',
}
];


function HomeScreen({navigation}){
 
  const [filteredData, setFilteredData] = useState(mockItemData);
  const [refreshing, setRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [likedItems, setLikedItems] = useState({});

  const scrollY = useSharedValue(0);
  
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    
  });

  const animatedTextStyle = useAnimatedStyle(()=>{

    
    return {
      paddingTop: interpolate(scrollY.value, [0, 100], [0, 30]),
      marginBottom: interpolate(scrollY.value, [0, 100], [0, -100]),
      opacity: interpolate(scrollY.value, [0, 50], [1, 0]),
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, 100], [0, -30]),
        },
      ],
    };
  });


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
      setFilteredData((prevData) => [...prevData, ...mockOnEndReachedData]);
    setIsEndReached(true);}
  };

  const onSearch= (text) => {
    const filteredItems = mockItemData.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase()) 
    );
    setFilteredData(filteredItems);
  };

  const togglePizzaSize = (item) => {
    setFilteredData((prevData) => {
      return prevData.map((prevItem) => {
        if (prevItem.id === item.id) {
          return {
            ...prevItem,
            selectedSize: prevItem.selectedSize === 32 ? 42 : (prevItem.selectedSize === 42 ? 32 : prevItem.selectedSize),
          };
        }
        return prevItem;
      });
    });
  };

  const renderItem = useCallback(({item , index}) =>{
    
    const onItemPress=(item)=>{
    navigation.navigate('Pizza Details', { item });
    }


    const onItemBuy = (item) => {
      const priceForSize = orderStore.getPriceForSize(item);
      orderStore.setOrders({ ...item,  price: priceForSize });
    };
    

    const onItemWish = (item) => {
      const isItemLiked = likedItems[item.id] || false;
      const priceForSize = orderWishStore.getPriceForSize(item);
    
      if (!isItemLiked) {
        orderWishStore.setOrdersWish({ ...item, price: priceForSize });
      } else {
        orderWishStore.removeOrderWish(item);
      }
    
      setLikedItems((prevLikedItems) => {
        return {
          ...prevLikedItems,
          [item.id]: !isItemLiked,
        };
      });
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
         <TouchableOpacity onPress={() => onItemWish(item, item.selectedSize)}>
            <Image
               source={likedItems[item.id] ? require('../images/header/icon-like.png') : require('../images/homeScreen/icon-like.png')}
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
  },[likedItems]);


  

  return(

    <SafeAreaView style={styles.container}>
        <Animated.View style={animatedTextStyle}>
          <Header onSearch={onSearch}/>
        </Animated.View> 
       <Animated.FlatList
         style={{marginTop:30}}
         data={filteredData}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
        // onRefresh={onRefresh} 
        // refreshing={refreshing} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        onScroll={scrollHandler}
      />
      
    </SafeAreaView>
  );
};

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    
  },
 
  switchContainer: {
    flexDirection: 'row',
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
    width: 100,
    height: 100,
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
  },
  
})

export default observer (HomeScreen)
