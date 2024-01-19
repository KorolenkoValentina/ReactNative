import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { SplashScreen } from 'expo';

const SplashScreenComponent = () => {
  React.useEffect(() => {
 // Hide SplashScreen after 2 seconds
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pizza App</Text>
      <Image source={require('../components/image/splash-image.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
  },
});

export default SplashScreenComponent;