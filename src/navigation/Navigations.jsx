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
import { NavigationContainer,useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import {colors} from '../components/Colors'


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
  const navigation = useNavigation();
  const HomeStack = createNativeStackNavigator();

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



  return(
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerLeft: () => (<MenuIcon />)

      }}>
      <HomeStack.Screen name="Home" component={HomeScreen}/>
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
       name="Promotion" component={PromotionsStack}/>
      <Tab.Screen
      options={{
        
        tabBarIcon:TabBarIconSetting
      }}
       name="Settings" component={SettingsScreen} />

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




