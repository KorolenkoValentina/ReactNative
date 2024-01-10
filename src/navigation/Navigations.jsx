import React from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity ,
  Text,


} from 'react-native';

import HomeScreen from '../screens/home/screens/HomeScreen';
import PizzaScreen from '../screens/home/screens/PizzaScreen';
import PromotionsScreen from '../screens/home/screens/PromotionsScreen';
import SettingsScreen from '../screens/home/screens/SettingsScreen';
import BasketScreen from '../screens/home/screens/BasketScreen';
import WishListScreen from '../screens/home/components/WishList';
import LogInScreen from '../screens/home/screens/LogInScreen';
import SignUpScreen from '../screens/home/screens/SignUpScreen';

import { NavigationContainer,useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { observer } from 'mobx-react-lite';
import orderStore from '../screens/home/store/index';
import {colors} from '../components/Colors'



const Tab = createBottomTabNavigator();

const HomeStack =()=>{
  const navigation = useNavigation();
  const HomeStack = createNativeStackNavigator();

  const handleLogInPress = () => {
    
    navigation.navigate('Log in'); 
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

  const LogIn = ()=>(
    <TouchableOpacity
      onPress={handleLogInPress}
      style={{ marginRight:10}}>
      <Image
        source={require('./image/icon-person.png')}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
  
  )

  return(
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerLeft: () => (<MenuIcon />),
        headerRight: ()=>(<LogIn/>),

      }}>
      <HomeStack.Screen name="Home" component={HomeScreen}/>
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

const TabBarIconBasket = observer((prop) => {
  const iconSource = prop.focused

    ? require('./image/icon-shopping-cart-focused.png')
    : require('./image/icon-shopping-cart.png');

    const ordersCount = orderStore.totalItems;
  return (
    <View style={styles.iconContainer}>
    {ordersCount > 0 && (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{ordersCount }</Text>
    </View>
     )} 
    <Image 
      style={styles.icon}
      source={iconSource}
    />
    </View>
  )
  
})



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
       name="Promotion" component={PromotionsStack}/>
      <Tab.Screen
      options={{
        
        tabBarIcon:TabBarIconSetting,
      }}
       name="Settings" component={SettingsScreen} />

      <Tab.Screen
      options={{
        tabBarIcon: function Icon (props) { 
          return <TabBarIconBasket {...props} />
        },

      }}
       name="Cart" component={BasketScreen} />

    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();
const CustomDrawerContent = ({ navigation, state }) => {
  const commonItemProps = {
    activeTintColor: colors.red,
    activeBackgroundColor: colors.lightgrey,
    inactiveTintColor: colors.mainColor,
    style: { width: '100%', borderBottomWidth: 1,padding: 10,
    marginVertical: 5, },
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <DrawerItem 
        label="Home"
        icon={({ size }) => (
          <Image
            source={require('./image/icon-home.png')}
            style={{ width: size, height: size }}
          />
        )}
        focused={state.index === state.routeNames.indexOf('Home')}
        onPress={() => navigation.navigate('Home')}
        {...commonItemProps}
      />
      <DrawerItem 
        label="Promotions"
        icon={({  size  }) => (
          <Image
            source={require('./image/promotions-focused.png')}
            style={{ width: size, height: size}}
          />
        )}
        focused={state.index === state.routeNames.indexOf('Promotions')}
        onPress={() => navigation.navigate('Promotions')}
        {...commonItemProps}
      />
      <DrawerItem
        label="Settings"
        icon={({  size }) => (
          <Image
            source={require('./image/settings-focused.png')}
            style={{ width: size, height: size}}
          />
        )}
        focused={state.index === state.routeNames.indexOf('Settings')}
        onPress={() => navigation.navigate('Settings')}
        {...commonItemProps}
      />
      
    </View>
  );
};



const  MyDrawer=()=> {
  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: true,
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="Promotions" component={PromotionsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Basket" component={BasketScreen} />
    </Drawer.Navigator>
  );
};

export default function Navigator() {
  return (
    <NavigationContainer>
      <MyDrawer/>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
 
  icon:{
    width:24,
    height:24,
    
  },
  drawerIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain', 
  },
 
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },

  iconContainer: {
    position: 'relative',
  },

  badgeContainer: {
    position: 'absolute',
    backgroundColor: colors.red,
    borderRadius: 10,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1,
    
  },
  badgeText: {
    color: colors.white,
    fontSize: 8,
  },
 
})




