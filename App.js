import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Navigator from './src/navigation/Navigations';
import useAppState from './src/components/UseAppState';
import  {loadFonts}  from './src/components/LoadFonts'

function App() {
  const  {appState}  = useAppState();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAsync = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  
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

