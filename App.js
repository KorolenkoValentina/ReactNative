import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Navigator from './src/navigation/Navigations';
import useAppState from './src/components/UseAppState';

function App() {
  const  {appState}  = useAppState();
  
  
  return (
    <>
      {appState !== 'active' ? (
        <ImageBackground
        source={require('./src/components/image/pizza.jpg')}
        style={styles.backgroundImage}
      ></ImageBackground>
      ) : (
      <Navigator/>
      )}
    </>
  );
  
}
const styles = StyleSheet.create({
 
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover'
  },
});

export default App;

