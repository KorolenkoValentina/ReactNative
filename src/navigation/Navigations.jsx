import React from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  Image,
  View, 
  Text,
} from 'react-native';


import DrinksScreen from '../screens/home/screens/DrinksScreen';
import HomeStack from './HomeStack';
import SettingsStack from './SettingsStack';
import PromotionsStack from './PromotionsStack';
import BasketStack from './BasketStack';



import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { observer } from 'mobx-react-lite';
import orderStore from '../screens/home/store/index';
import {colors} from '../components/Colors'

const DrinksStack =()=>{
  const DrinksStack = createNativeStackNavigator();
  return(
    <DrinksStack.Navigator
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
      <DrinksStack.Screen name="Drink" component={DrinksScreen}/>
    </DrinksStack.Navigator>
  )
}


const Tab = createBottomTabNavigator();
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
      tabBarActiveTintColor:colors.title,
      tabBarStyle: {
        backgroundColor: colors.tabColor,
      },
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
       name="Setting" component={SettingsStack} />

      <Tab.Screen
      options={{
        tabBarIcon: function Icon (props) { 
          return <TabBarIconBasket {...props} />
        },

      }}
       name="Cart" component={BasketStack} />

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
        label="Drinks"
        icon={({  size }) => (
          <Image
            source={require('./image/icon-drinks.png')}
            style={{ width: size, height: size}}
          />
        )}
        focused={state.index === state.routeNames.indexOf('Drinks')}
        onPress={() => navigation.navigate('Drink')}
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
      <Drawer.Screen name="Promotion" component={PromotionsStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
      <Drawer.Screen name="Basket" component={BasketStack} />
      <Drawer.Screen name="Drink" component={DrinksStack} />
      
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




