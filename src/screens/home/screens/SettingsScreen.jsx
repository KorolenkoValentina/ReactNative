import React,{useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SupportModalScreen from '../components/SupportModal'

export default function SettingsScreen(){
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();

  const onPressAboutUs = () => {
    navigation.navigate('About Us' );
  };

  const onPressDelivery  = () => {
    navigation.navigate('Delivery and payment' );
  };

  const onPressContacts  = () => {
    navigation.navigate('Contacts' );
  };

  const onPressSupport = () => {
    setShowModal(true);
  };

    return (
    <View style={styles.container}>
      
      <ListItem 
        iconCard={require('../images/settingsScreen/icon-team.png')}
        title="About Us"
        iconArrow={require('../images/settingsScreen/icon-right-arrow.png')}
        onPress={onPressAboutUs}
      />
      
      <ListItem
        iconCard={require('../images/settingsScreen/icon-pay.png')}
        title="Delivery and payment"
        iconArrow={require('../images/settingsScreen/icon-right-arrow.png')}
        onPress={onPressDelivery}
      />
      <ListItem
        iconCard={require('../images/settingsScreen/icon-contacts.png')}
        title="Contacts"
        iconArrow={require('../images/settingsScreen/icon-right-arrow.png')}
        onPress={onPressContacts}
      />
      <ListItem
        iconCard={require('../images/settingsScreen/icon-suport.png')}
        title="Support"
        iconArrow={require('../images/settingsScreen/icon-right-arrow.png')}
        onPress={onPressSupport}
      />
      {showModal && <SupportModalScreen onClose={() => setShowModal(false)} />}
      
    </View>
  );
};

const ListItem = ({ iconCard, title, iconArrow, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress}>
      <View style={styles.listItem}>
        <Image source={iconCard} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
        <Image source={iconArrow} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
});
