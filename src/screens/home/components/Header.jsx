import React, { useState} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Share,
} from 'react-native';

import {colors} from '../../../components/Colors'
import CustomTouchable from '../../../components/CustomTouchable'


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

const Header = ({ onSearch }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const [circleColors, setCircleColors] = useState(['black', 'black', 'black']);


 
  const closeModal = () => {
    setModalVisible(false);
    setSearchVisible(false);
  };

  const handleModalPress = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    closeModal();
  };

  const handleSearchIconClick = () => {
    setSearchVisible(!searchVisible);
    
  };

  const handleSearch = (text) => {
  setSearchText(text);
  onSearch(text);
  }
  
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
      index === currentIndex ? 'white' : 'black'
    );
    setCircleColors(newColors);
  };

 
  return (
    <View style={styles.container}>
      {searchVisible && (
        <TextInput
          style={styles.textInput}
          placeholder="Search..."
          onChangeText={handleSearch}
          value={searchText}
        />
      )}
      <View style={styles.containerIcon}>
        <CustomTouchable onPress={handleSearchIconClick}  >
          <Image style={styles.searchIcon} source={require('../images/header/icon-search.png')} />
        </CustomTouchable>
        <CustomTouchable onPress={() => setModalVisible(true)} >
            <Image source={require('../images/header/icon-like.png')} style={styles.modalButton}/>
          </CustomTouchable>
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={handleModalPress}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>

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
                  style={[styles.circle, { backgroundColor: color }]}
                />
                ))}
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 50,
    marginRight: 20,
  },

  containerIcon:{
    flexDirection: 'row'
    
  },

  modalButton: {
    width:20,
    height: 20,
  },

  searchIcon: {
    width:20,
    height: 20,
    
    marginRight:10,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: colors.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
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


  textInput: {
    borderWidth: 1,
    borderColor: colors.textColor,
    borderRadius: 5,
    padding: 2,
    marginRight:15,
    width: '70%',
    paddingLeft: 15,
    
  },
  
})

   
export default Header;
