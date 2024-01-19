import React from 'react';
import 'react-native-gesture-handler';


import BasketScreen from '../screens/home/screens/BasketScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {colors} from '../components/Colors'



const BasketStack =()=>{
    const BasketStack = createNativeStackNavigator();
    return(
      <BasketStack.Navigator
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
        <BasketStack.Screen name="Basket" component={BasketScreen}/>
      </BasketStack.Navigator>
    )
}
export default BasketStack