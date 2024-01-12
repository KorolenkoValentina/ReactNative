
import React,{useState} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking
  
} from 'react-native';
import { colors } from '../../../components/Colors';




export default function ContactsScreen() {
  const [showDetails, setShowDetails] = useState(false);

  const phoneNumber = '066 884 0029';
  const phoneNumberSecond = '066 884 0029';


  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleCallPressSecond = () => {
    Linking.openURL(`tel:${phoneNumberSecond }`);
  };



  const handleSocialMediaPress = (socialMedia) => {
    
    switch (socialMedia) {
      case 'telegram':
        Linking.openURL('https://www.facebook.com/your-facebook-page');
      break;
      case 'instagram':
        Linking.openURL('https://www.instagram.com/valenttinochka?igsh=MTc2YWY0MHhuZWwwbw==');
      break;
      case 'viber':
        Linking.openURL('https://twitter.com/your-twitter-account');
      break;
      default:
      break;
    }
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapContacts}>
        <Text style={styles.contactsTitle}>Contacts</Text>
        <View style={styles.contactsItem}>
          <Image
          source={require('../images/settingsScreen/icon-contacts.png')} style={styles.icon}/>
          <View style={styles.wrapNumber}>
            <TouchableOpacity onPress={handleCallPress}>
              <Text style={styles.contactsText}> 066 884 0029</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCallPressSecond }>
              <Text style={styles.contactsText}> 096 884 0029</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contactsItem}>
          <Image
          source={require('../images/settingsScreen/icon-eye.png')} style={styles.icon}/>
          <View style={styles.wrapContacts}>
            <Text style={styles.contactsText}> We are in social networks</Text>
            <View  style={styles.wrapSocial}>
              <TouchableOpacity onPress={() => handleSocialMediaPress('telegram')}>
                <Image source={require('../images/settingsScreen/icon-telegram.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSocialMediaPress('instagram')}>
                <Image source={require('../images/settingsScreen/icon-instagram.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSocialMediaPress('viber')}>
                <Image source={require('../images/settingsScreen/icon-viber.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.contactsItem}>
          <Image source={require('../images/settingsScreen/icon-location.png')} style={styles.icon}/>
          <Text style={styles.contactsText}>Addresses of pickup</Text>
        </View>   
        <View style={styles.addressItem}>
          <TouchableOpacity onPress={handleToggleDetails}>
              <View style={styles.wrapAddress}>
                <Text> 30 Soborna Street</Text>
                <View style={styles.arrowContainer}>
                <Image source={showDetails ? require('../images/settingsScreen/icon-down-arrow.png') : require('../images/settingsScreen/icon-arrowWight.png')} style={styles.arrowIcon} />
                </View>
              </View>
          </TouchableOpacity>
          {showDetails && (
          <View style={styles.detailsContainer}>
            <View style={styles.detailsItem}>
              <Image source={require('../images/settingsScreen/icon-telephone.png')} style={styles.iconDetails} />
              <View style={styles.wrapNumber}>            
                <Text style={styles.contactsText}> 066 884 0029</Text>
                <Text style={styles.contactsText}> 096 884 0029</Text>          
              </View>           
            </View>
            <View style={styles.detailsItem}>
              <Image source={require('../images/settingsScreen/icon-email.png')} style={styles.iconDetails} />                         
              <Text style={styles.contactsText}> Email: example@example.com</Text>
            </View>
            <View style={styles.detailsItem}>
              <Image source={require('../images/settingsScreen/icon-schedule.png')} style={styles.iconDetails} />                         
              <Text style={styles.contactsText}> Pickup daily from 10a.m - 22.30p.m</Text>
            </View>
                                                
          </View> )}
            
        </View>
                          
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contactsTitle:{
    fontSize:22,
    fontWeight:'bold',
    margin:20,
    color:colors.mainColor

  },
  contactsItem:{
    flexDirection:'row',
    borderBottomWidth:2,
    borderColor:colors.mainColor,
    margin:20,
    
    

  },
  icon:{
    width:30,
    height:30,
    marginRight:10

  },
  wrapNumber:{
    
  },
  wrapSocial:{
    flexDirection:'row',
    marginVertical:15

  },
  contactsText:{
    fontSize:16,
    color:colors.textColor,
    marginBottom:5
  },
  addressItem:{


  },

  wrapAddress:{
    flexDirection:'row',
    padding:12,
    borderRadius: 10,
    backgroundColor:colors.buttonBackground,
    marginHorizontal:20
    
  },
  arrowContainer: {
    flex: 1, 
    alignItems: 'flex-end'
  },

  arrowIcon: {
    width: 20,
    height: 20,
   
  },

  detailsContainer:{
    marginLeft:40,
    marginTop:20
  },
  detailsItem:{
    flexDirection:'row',
    marginBottom:15

  },
  iconDetails:{
    width: 20,
    height: 20,
    marginRight:10
  }


  
});