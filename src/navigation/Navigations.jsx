import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity ,
  // SafeAreaView,
  Text

} from 'react-native';

import HomeScreen from '../screens/home/screens/HomeScreen';
import PizzaScreen from '../screens/home/screens/PizzaScreen';
import PromotionsScreen from '../screens/home/screens/PromotionsScreen';
import SettingsScreen from '../screens/home/screens/SettingsScreen';
// import ModalScreen from '../screens/home/components/Header';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {colors} from '../components/Colors'


const Tab = createBottomTabNavigator();


// const ModalScreen = () => {
//   return (
//     <SafeAreaView style={styles.modalBackground}>
//       <View style={styles.modalContent}>
//       <Text style={styles.title}>Wish List</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

const ModalScreen = ({ navigation }) => {
  const closeModal = () => {
    navigation.goBack(); // Close the modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.modalText}>This is your modal content</Text>
      <TouchableOpacity onPress={closeModal}>
        <Text style={styles.closeButton}>Close Modal</Text>
      </TouchableOpacity>
    </View>
  );
};



const HomeStack =()=>{
  const HomeStack = createNativeStackNavigator();
  return(
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Pizza Details" component={PizzaScreen} />
      <HomeStack.Screen
      options={{
        headerShown: false,
        presentation: 'modal',
      }}
      name="ModalScreen"
      component={ModalScreen}
      />
    </HomeStack.Navigator>
  )
}

const PromotionsStack =()=>{
  const PromotionsStack = createNativeStackNavigator();
  return(
    <PromotionsStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        
      }}>
      <PromotionsStack.Screen name="Promotions" component={PromotionsScreen}/>
    </PromotionsStack.Navigator>
  )
}




const TabBarIcon = (prop) => {

  const iconSource = prop.focused
    ? require('./image/icon-menuFocused.png')
    : require('./image/menu-icon.png');

  return (
    <Image
      style={styles.icon}
      source={iconSource}
    />
  );
}

const TabBarIconSetting =(prop)=>{
  
  const iconSource = prop.focused
    ? require('./image/settings-focused.png')
    : require('./image/icon-setting.png');
  return (
    <Image
      style={styles.icon}
      source={iconSource}
    />
  );
  
}

const TabBarIconPromotions =(prop)=>{
  const iconSource = prop.focused

    ? require('./image/promotions-focused.png')
    : require('./image/promotions.png');
  return (
    <Image
      style={styles.icon}
      source={iconSource}
    />
  )
  
}


const MyTabs =()=> {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:'maroon'
    }}>
      <Tab.Screen 
      options={{
        tabBarIcon:TabBarIcon
      }}
      name="HomeTab" component={HomeStack} />
      <Tab.Screen
      options={{
        tabBarIcon:TabBarIconPromotions ,
      }}
       name="Promotions" component={PromotionsStack}/>
      <Tab.Screen
      options={{
        
        tabBarIcon:TabBarIconSetting
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
    width:24,
    height:24,
    
  },
  // modalBackground: {
  //   flex: 1,
  //   backgroundColor: 'gray',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  // modalContent: {
  //   height:"90%",
   
  // },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 16,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },

  closeButton: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green', // Adjust the color as needed
  },

 
})




