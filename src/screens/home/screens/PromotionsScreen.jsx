import React, { useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Share,
} from 'react-native';

import {colors} from '../../../components/Colors';


const DATA = [

    { id: '1',
      image:require('../images/header/food-story-1.jpg'),
      shareLink: 'https://example.com/1'
    },
  
    { id: '2',
      image:require('../images/header/food-story-2.jpg'),
      shareLink: 'https://example.com/2'
    },
  
    { id: '3',
      image:require('../images/header/food-story-3.jpg'),
      shareLink: 'https://example.com/3'
    },
]

const {width, height}= Dimensions.get('screen');


const PromotionsScreen = () => {
  const [selectedId, setSelectedId] = useState(0);
  const [circleColors, setCircleColors] = useState(['black', 'black', 'black']);
  
  const handleItemSelect = (id, shareLink) => {
    setSelectedId(id);
    handleShare(shareLink);
    
  };

  const handleShare = async (shareLink) => {
    try {
      const result = await Share.share({
        message: `Check out this image: ${shareLink}`,
      });
      if (result.action === Share.sharedAction) {
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };


  const renderItem = ({ item, index }) => {
    return (
      <View style={{ width: width }}>
        <TouchableWithoutFeedback onPress={() => handleItemSelect(index, item.shareLink)}>
        
          <View>
            <Image source={item.image} style={styles.itemImage} />
          </View>
            
        </TouchableWithoutFeedback>
        
      </View>
    );
  };


  const onFlatListScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / width);
    setSelectedId(currentIndex);
    updateCircleColors(currentIndex);
    
  };

  const updateCircleColors = (currentIndex) => {
    const newColors = circleColors.map((color, index) =>
      index === currentIndex ? 'gray' : 'orange'
    );
    setCircleColors(newColors);
  };

 
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback >
        <View style={styles.wrapBackground}>
          <Text style={styles.title}> Sale </Text>
          <View style={styles.wrapContent}>

            <FlatList
              data={DATA}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
              onScroll={onFlatListScroll}
            />
            <View style={styles.circleContainer}>
              {circleColors.map((color, index) => (
                <View
                  key={index}
                  style={[styles.circle, { backgroundColor: color }]}/>
              ))}
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1, 
  },

  wrapBackground: {
    flex: 1,
    backgroundColor: colors.itemBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color:colors.orange,
    marginBottom:20,
    textDecorationLine: 'underline',
    
  },

  wrapContent: {
    height:"75%",
    overflow: 'scroll',
  },


  itemImage: {
    width:300,
    height:500, 
    alignSelf:'center', 
  },

  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },

  
})

   
export default PromotionsScreen;
