import React from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity ,
  Text

} from 'react-native';

import HomeScreen from '../screens/home/screens/HomeScreen';
import PizzaScreen from '../screens/home/screens/PizzaScreen';
import PromotionsScreen from '../screens/home/screens/PromotionsScreen';
import SettingsScreen from '../screens/home/screens/SettingsScreen';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {colors} from '../components/Colors'

// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Feed" component={Feed} />
//       <Drawer.Screen name="Article" component={Article} />
//     </Drawer.Navigator>
//   );
// }


const Tab = createBottomTabNavigator();


const ModalScreen = ({ navigation }) => {
  const closeModal = () => {
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapContent}>
        <View style={styles.wrapHeader}>
            <Text style={styles.wraptitle}>Wish List</Text>
            <TouchableOpacity onPress={closeModal}>
              <Image source={require('./image/icon-close.png')} style={styles.closeButton}/>
            </TouchableOpacity>
        </View>
        <View  style={styles.wrapImage}>
          <Image source={require('./image/icon-wishList.png')} style={styles.iconWish}/>
        </View>
      </View>
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
        presentation: 'transparentModal',
        animation:'slide_from_bottom'
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
 
  container: {
    flex: 1,
    marginTop:80,
    backgroundColor: colors.primaryBackground,
  },

  wrapContent:{
    flexDirection:'column',
    padding:20
  },

  wrapHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
  },

  wraptitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.mainColor,
  },

  closeButton: {
    width:28,
    height:28

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },

  wrapImage:{
    justifyContent:'center',
    alignItems:'center',
    paddingTop:250,
  },

  iconWish:{
    width:80,
    height:80
  }

 
})




