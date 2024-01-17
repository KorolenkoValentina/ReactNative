import React from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { colors } from './Colors';


const CustomSwitch = ({ label, onPress, isActive }) => {

    return (
      <TouchableOpacity style={[styles.switch, isActive && styles.activeSwitch]} onPress={onPress}>
        <Image
        source={isActive ? require('./image/icon-diameter.png') : require('./image/icons-diameter.png')}
        style={styles.icon}
      />
        <Text style={[styles.sizeText, isActive && styles.activeSize]}>{label}</Text>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  switch: {
    padding: 6, 
    borderWidth: 1,
    borderRadius:4,
    borderColor: colors.shadowBorderColor,
    flexDirection:'row',
    alignItems: 'center',
   
    
       
  },
      activeSwitch: {
        backgroundColor: colors.orange,
      },

      icon: {
        width: 20, 
        height: 20,
        marginRight: 5, 
      },
      sizeText: {
        fontSize: 12,
        color:colors.textColor
      },
      activeSize: {
        color: colors.mainColor,
      },
  });

export default CustomSwitch;








