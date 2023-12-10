import React from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  
} from 'react-native';

export default function Settings(){
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Hello</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1, 
        
    },
  
    title : {
        color:"red" 
    }
})