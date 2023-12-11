import React from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  
} from 'react-native';

export default function SettingsScreen(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
            <Text style={styles.title}>Hello</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1, 
        
    },
    wrap:{
        flex: 1,
        justifyContent:'center', 
        alignItems: 'center',
    },
  
    title : {
        color:"red" ,
    }
})