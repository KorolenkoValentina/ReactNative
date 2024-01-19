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
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../../components/Colors';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function  LogInScreen (){
    const [password, setPassword] = useState('');
    const [number, onChangeNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

   
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        const userData = await AsyncStorage.getItem(`user_${number}`);
    
        if (!userData) {
            Alert.alert('The user with this number does not exist!');
          return;
        }

    
        const parsedUserData = JSON.parse(userData);
    
        if (parsedUserData.password === password) {
            Alert.alert('Successful login!');
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('currentUser', JSON.stringify(parsedUserData));
            console.log('Logged in user:', parsedUserData.firstName); 
          } else {
            Alert.alert('Incorrect password!');
        }
        navigation.navigate('Home');
    };
  
    
    const navigateToSignUp = () => {
        navigation.navigate('Sign Up');
    };

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.wrap}>
                <Text style={styles.titleHeader}> Log in: </Text>
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
                    onChangeText={setPassword}
                    value={password}
                    required
                    />
                    <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                        <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                </View>
                <CustomTouchable style={styles.wrapButton} onPress={handleLogin} >
              
                    <Text style={styles.titleButton}>Log in to your account</Text> 
                </CustomTouchable>
            
                <View style={styles.wrapTitle}>
                    <Text style={styles.title}>Forgot your password?</Text>
                    <CustomTouchable>
                        <Text style={[styles.title, { color: colors.orange }]} onPress={navigateToSignUp}> Sign up</Text>
                    </CustomTouchable>
                </View>
            
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

    title:{
        fontSize:14,
        marginTop:30
    },
    eyeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
})