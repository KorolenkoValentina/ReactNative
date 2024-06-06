// import { useFonts } from 'expo-font';

// export const loadFonts = async () => {
//   return useFonts({
//     'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
//     'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
//     'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
//     'Lemon-Regular': require('../../assets/fonts/Lemon-Regular.ttf'),
//   });
  

// }

// LoadFonts.js
import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Lemon-Regular': require('../../assets/fonts/Lemon-Regular.ttf'),
  });
};
