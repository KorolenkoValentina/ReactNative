import React from 'react';
import HomeScreen from './src/screens/home/screens/HomeScreen';
import PizzaScreen from './src/screens/home/screens/PizzaScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const HomeStack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="PizzaDetails" component={PizzaScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;

