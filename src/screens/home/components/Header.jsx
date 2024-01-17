import React, { useState} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  
  
} from 'react-native';
import { useNavigation } from '@react-navigation/native'

import {colors} from '../../../components/Colors'
import CustomTouchable from '../../../components/CustomTouchable'
import Animated, { FlipInXUp, FlipOutXUp} from 'react-native-reanimated';


const Header = ({ onSearch }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation();


  const openModalScreen = () => {
    navigation.navigate('ModalScreen'); 
  };

  const handleSearchIconClick = () => {
    setSearchVisible(!searchVisible);
    
  };

  const handleSearch = (text) => {
  setSearchText(text);
  onSearch(text);
  }


  return (
    <Animated.View  style={styles.container}>
      {searchVisible && (
        <Animated.View entering={FlipInXUp} exiting={FlipOutXUp } style={styles.textInput} >
        <TextInput
          placeholder="Search..."
          placeholderTextColor={colors.textColor}
          onChangeText={handleSearch}
          value={searchText}
          style={{color:colors.textColor }}
        />
       </Animated.View> 
      )}
      <View style={styles.containerIcon}>
        <CustomTouchable onPress={handleSearchIconClick}  >
          <Image style={styles.searchIcon} source={require('../images/header/icon-search.png')} />
        </CustomTouchable>
        <CustomTouchable onPress={openModalScreen}  presentation="modal">
            <Image source={require('../images/header/icon-like.png')} style={styles.modalButton}/>
          </CustomTouchable>
      </View>
     

     

    </Animated.View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 30,
    marginRight: 20,
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    
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

  textInput: {
    borderWidth: 1,
    borderColor: colors.shadowBorderColor,
    borderRadius: 5,
    padding: 2,
    marginRight:15,
    width: '70%',
    paddingLeft: 15,
    
  },
  
})

   
export default Header;
