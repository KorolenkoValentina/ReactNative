import React,{useState} from 'react';

import {
  StyleSheet,
  Image,
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  TextInput 
     
} from 'react-native';

import {colors} from '../../../components/Colors';


const SupportModalScreen = ({ onClose }) => {
      
  const [firstName, setFirstName] = useState('');
  const [number, onChangeNumber] = useState('');
  const [text, onChangeText] = useState('');

  const handleSend = () => {
      
  if (!firstName || !number || !text) {
    console.error('Please fill in all fields');
    return;
  }
  console.log('Sending data:', {
    firstName,
    number,
    text,
    });
  onClose();
  };

      
  
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true} >
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Image source={require('../../../navigation/image/icon-close-page.png')} style={styles.icon}/>
          </TouchableOpacity>
          <Text style={styles.title}>Write to us</Text>
        
          <View style={styles.wrap}>
            <TextInput
              style={styles.input}
              onChangeText={setFirstName}
              value={firstName}
              placeholder="First Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="+380 XX XX XX XXX"
              keyboardType="numeric"
              required
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Enter your comment"
              required
            />
  
            <TouchableOpacity  onPress={handleSend} style={styles.wrapButton}  >
              <Text style={styles.titleButton}>Send</Text> 
            </TouchableOpacity>
               
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
  
  
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.lightgrey, 
    padding: 20,
    borderRadius: 10,
    width: '90%', 
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  icon:{
    width: 24,
    height: 24,
  },
  title:{
    fontSize: 20,
    fontWeight:'bold',
    textAlign:'center',
    marginVertical:20,
    color:colors.orange

  },
  input: {
    height: 40,
    borderColor: colors.dark,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 16,
    width: 300,
    textAlign:'center',
    color:colors.dark
  },

  
  wrapButton:{
    backgroundColor: colors.orange,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  
  titleButton: {
    fontSize: 16,
    color: colors.white, 
    textAlign:'center'
         
  },
  
})

export default SupportModalScreen