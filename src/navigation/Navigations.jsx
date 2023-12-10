import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import HomeScreen from '../screens/home/screens/HomeScreen';
import PizzaScreen from '../screens/home/screens/PizzaScreen';
import PromotionsScreen from '../screens/home/screens/PromotionsScreen';
import SettingsScreen from '../screens/home/screens/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';




const Tab = createBottomTabNavigator();


const HomeStack =()=>{
  const HomeStack = createNativeStackNavigator();
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Pizza Details" component={PizzaScreen} />
    </HomeStack.Navigator>
  )
}

const TabBarIcon =()=>{
  return <SvgUri style={styles.icon} 
    source={require('./image/menu-icon.svg')}
  /> 
}

const TabBarIconSetting =()=>{
  return <SvgUri style={styles.icon} 
    source={require('./image/icon-setting.svg')}/>
  
}

const TabBarIconPromotions =()=>{
  return <SvgUri style={styles.icon} 
    source={require('./image/promotions.svg')}/>
  
}


const MyTabs =()=> {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown:false,
    }}>
      <Tab.Screen 
      options={{
        tabBarIcon:TabBarIcon
      }}
      name="HomeTab" component={HomeStack} />
      <Tab.Screen
      options={{
        tabBarIconPromotions :TabBarIconPromotions 
      }}
       name="Promotions" component={PromotionsScreen}/>
      <Tab.Screen
      options={{
        
        tabBarIconSetting:TabBarIconSetting
      }}
       name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function Navigator() {
  return (
    <NavigationContainer>
      
      <MyTabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  icon:{
    width:28,
    height:28
  }
 
})




