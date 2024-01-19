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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function  SignUpScreen (){
  const [firstName, setFirstName] = useState('');
  const [number, onChangeNumber] = useState('+380');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const navigation = useNavigation();

    

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSignUp = async () => {
    const userExists = await AsyncStorage.getItem(`user_${number}`);

    if (userExists) {
      Alert.alert('User with this number already exists!');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;


    if (!passwordRegex.test(password)) {
      Alert.alert('Password must be at least 8  characters long and contain both letters and numbers.');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
      return;
    }

    const userData = { firstName, password };
    await AsyncStorage.setItem(`user_${number}`, JSON.stringify(userData));
    await AsyncStorage.setItem('currentUser', JSON.stringify({ firstName}));
    
    navigation.navigate('Log in');
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
          onChangeText={(text) => onChangeNumber(text.replace(/\D/g, ''))}
          value={number.replace(/\D/g, '')}
          placeholder="+380 XX XX XX XXX"
          keyboardType="numeric"
          maxLength={12}
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

        <CustomTouchable style={styles.wrapButton} onPress={handleSignUp} >
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
    backgroundColor:colors.lightgrey
      
  },

  titleHeader:{
    fontSize:16,
    textAlign:'center',
    marginBottom:30,
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

  eyeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
})