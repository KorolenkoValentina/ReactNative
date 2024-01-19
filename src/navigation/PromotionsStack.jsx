import React from 'react';
import 'react-native-gesture-handler';


import PromotionsScreen from '../screens/home/screens/PromotionsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {colors} from '../components/Colors'

const PromotionsStack =()=>{
    const PromotionsStack = createNativeStackNavigator();
    return(
      <PromotionsStack.Navigator
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
        <PromotionsStack.Screen name="Promotions" component={PromotionsScreen}/>
      </PromotionsStack.Navigator>
    )
}

export default PromotionsStack