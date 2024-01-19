import React from 'react';
import 'react-native-gesture-handler';

import SettingsScreen from '../screens/home/screens/SettingsScreen';
import AboutUsScreen from '../screens/home/screens/AboutUsScreen';
import DeliveryScreen from '../screens/home/screens/DeliveryScreen';
import ContactsScreen from '../screens/home/screens/ContactsScreen';





import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {colors} from '../components/Colors'



const SettingsStack =()=>{
    const SettingsStack = createNativeStackNavigator();
    return(
      <SettingsStack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.tabColor, 
          },
          headerTitleStyle: {
            color: colors.title, 
          },
          
        }}>
        <SettingsStack.Screen name="Settings" component={SettingsScreen}/>
        <SettingsStack.Screen name="About Us" component={AboutUsScreen}/>
        <SettingsStack.Screen name="Delivery and payment" component={DeliveryScreen}/>
        <SettingsStack.Screen name="Contacts" component={ContactsScreen}/>
      </SettingsStack.Navigator>
    )
}

export default SettingsStack