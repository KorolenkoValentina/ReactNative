
import React, { useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  RefreshControl,
 
 
  
} from 'react-native';

import Header from '../components/Header';
import {mockItemData, mockOnEndReachedData } from '../components/MockData';
import { observer } from 'mobx-react';
import Item from '../components/ItemList'
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



function HomeScreen(){
 
  const [filteredData, setFilteredData] = useState(mockItemData);
  const [refreshing, setRefreshing] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  

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

  const renderItem = ({item , index}) => <Item item={item}  index={index} togglePizzaSize={togglePizzaSize}/>
  
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
 
  
})

export default observer (HomeScreen)
