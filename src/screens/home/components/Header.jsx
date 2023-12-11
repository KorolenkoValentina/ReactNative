import React, { useState} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
  
  
  
} from 'react-native';
import { useNavigation } from '@react-navigation/native'

import {colors} from '../../../components/Colors'
import CustomTouchable from '../../../components/CustomTouchable'

;

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
        <CustomTouchable onPress={openModalScreen}  presentation="modal">
            <Image source={require('../images/header/icon-like.png')} style={styles.modalButton}/>
          </CustomTouchable>
      </View>
     

     

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

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green', // Adjust the color as needed
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
    borderColor: colors.textColor,
    borderRadius: 5,
    padding: 2,
    marginRight:15,
    width: '70%',
    paddingLeft: 15,
    
  },
  
})

   
export default Header;
