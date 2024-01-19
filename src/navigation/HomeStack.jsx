import React,{useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {
  Image,
  View,
  TouchableOpacity ,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/home/screens/HomeScreen';
import PizzaScreen from '../screens/home/screens/PizzaScreen';
import WishListScreen from '../screens/home/components/WishList';
import LogInScreen from '../screens/home/screens/LogInScreen';
import SignUpScreen from '../screens/home/screens/SignUpScreen';



import { useNavigation, useFocusEffect} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {colors} from '../components/Colors'




const HomeStack =()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation();
    const HomeStack = createNativeStackNavigator();
    
    useFocusEffect(
      React.useCallback(() => {
        const checkLoginStatus = async () => {
          const value = await AsyncStorage.getItem('isLoggedIn');
          console.log('Before Login - isLoggedIn value:', value);
          setIsLoggedIn(value === 'true');
        };
  
        checkLoginStatus();
      }, [])
    );
  
  
    const handleLogInPress = async () => {
      if (isLoggedIn) {
        console.log('Before Logout - isLoggedIn is true');
        await AsyncStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
        navigation.navigate('Log in');
      } else {
        console.log('Before Login - isLoggedIn is false');
        navigation.navigate('Log in');
      }
    };
  
    const MenuIcon = () => (
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ marginLeft: 10 }}>
        <Image
          source={require('./image/icon-menu.png')}
          style={{ width: 35, height: 35 }}
        />
      </TouchableOpacity>
    );
  
    const getCurrentUserName = async () => {
      const currentUserData = await AsyncStorage.getItem('currentUser');
      const { firstName } = JSON.parse(currentUserData);
      return firstName;
    };
  
    const LogIn = () => {
      const [currentUserName, setCurrentUserName] = useState('');
  
      useEffect(() => {
      const fetchCurrentUserName = async () => {
        const name = await getCurrentUserName();
        console.log('After Login - Fetched currentUserName:', name);
        setCurrentUserName(name);
      };
  
      if (isLoggedIn) {
        console.log('After Login - Fetching currentUserName');
        fetchCurrentUserName();
      }
    }, [isLoggedIn]);
  
  
    return (
  
      <TouchableOpacity onPress={handleLogInPress} style={{ marginRight: 10 }}>
        <View style={{ alignItems: 'center' }}>      
          <Image
            source={require('./image/icon-person.png')}
            style={{ width: 30, height: 30 }}
          />
          {isLoggedIn && (
          <Text style={{ color: colors.textColor, marginRight: 5 }}>{currentUserName}</Text> 
          )}   
        </View>
      </TouchableOpacity>
    );
    }
  
    return(
      <HomeStack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (<MenuIcon />),
          headerRight: ()=>(<LogIn/>),
          headerStyle: {
            backgroundColor: colors.tabColor, 
          },
          headerTitleStyle: {
            color: colors.title, 
          },
  
        }}>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        
        <HomeStack.Screen name="Pizza Details" component={PizzaScreen} />
        <HomeStack.Screen name="Log in" component={LogInScreen} />
        <HomeStack.Screen name="Sign Up" component={SignUpScreen} />
        <HomeStack.Screen
        options={{
          headerShown: false,
          presentation: 'transparentModal',
          animation:'slide_from_bottom'
        }}
        name="ModalScreen"
        component={WishListScreen}
        />
      </HomeStack.Navigator>
    )
}
export default HomeStack