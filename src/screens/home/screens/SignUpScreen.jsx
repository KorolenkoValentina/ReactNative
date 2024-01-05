import React,{useState} from 'react';

import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
  
} from 'react-native';

import CustomTouchable from '../../../components/CustomTouchable';
import {colors} from '../../../components/Colors';

export default function  SignUpScreen (){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, onChangeNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
    

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {  
    console.log('Введений пароль:', password);
  };
    
    

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="First Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="+380 XX XX XX XXX"
          keyboardType="numeric"
           required
        />
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
            value={password}
            required
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry={!showPassword}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            required
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>

        <CustomTouchable style={styles.wrapButton} onPress={handleLogin} >
          <Text style={styles.titleButton}>Log in your account</Text> 
        </CustomTouchable>
             
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
      
  },

  titleHeader:{
    fontSize:16,
    textAlign:'center',
    marginBottom:30,
  },

  input: {
    height: 40,
    borderColor: colors.lightgrey,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 16,
    width: 300,
    textAlign:'center'
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  wrapTitle:{
    flexDirection:'row',
    justifyContent:'space-between'  
    
  },

  wrapButton:{
    backgroundColor: colors.buttonBackground,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  titleButton: {
    fontSize: 16,
    color: colors.buttonColor, 
    textAlign:'center'
       
  },

  eyeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
})