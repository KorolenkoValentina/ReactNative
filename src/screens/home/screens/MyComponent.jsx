import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import {colors} from '../components/Colors'
import CustomTouchable from '../../../components/CustomTouchable'




const MyComponent = ({ filterItems }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  

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
  filterItems(text);
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
          <Text style={styles.searchIcon}>🔍</Text>
        </CustomTouchable>
        <CustomTouchable onPress={() => setModalVisible(true)} >
          <Text style={styles.modalButton}>❤️</Text>
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
              <Text style={styles.modalText}>Hello World!</Text>

              <CustomTouchable onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.textStyle}>Close Modal</Text>
              </CustomTouchable>
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
    marginTop:20,
  },

  containerIcon:{
    flexDirection: 'row',
    
  },

  modalButton: {
    fontSize: 24,
  },

  searchIcon: {
    fontSize: 24,
    marginRight:10,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: colors.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: colors.modalContentBackground,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '20%',
    maxHeight: '80%',
    overflow: 'scroll',
  },

  modalText: {
    fontSize: 20,
    color: colors.modalText,
    marginBottom: 40,
    textAlign: 'center',
  },

  closeButton:{
    borderRadius: 20,
    padding: 12,
    elevation: 5,
    shadowColor:colors.shadowColor,
    backgroundColor: colors.modalCloseButtonBackground,
  },

  textStyle: {
    color: colors.modalCloseButtonColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textInput: {
    borderWidth: 1,
    borderColor: colors.textColor,
    borderRadius: 5,
    padding: 2,
    marginTop: 10,
    marginRight:15,
    width: '70%',
    paddingLeft: 15,
    
  },
  

})



    
export default MyComponent;
