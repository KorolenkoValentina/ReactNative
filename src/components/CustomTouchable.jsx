
import React from 'react';
import {
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  StyleSheet,
  View
} from 'react-native';

const CustomTouchable = ({ onPress, children, style, withoutFeedback }) => {
  const Component = withoutFeedback ? TouchableWithoutFeedback : Pressable;

  return (
    <Component
      onPress={onPress}
      android_ripple={withoutFeedback ? undefined : { color: 'rgba(0, 0, 0, 0.1)' }}
      style={({ pressed }) => [
        Platform.OS === 'ios' && !withoutFeedback && styles.iosOpacity,
        styles.commonStyle,
        pressed && styles.pressedStyle, 
        style,
      ]}
    >
      <View>{children}</View>
    </Component>
  );
};

const styles = StyleSheet.create({
  commonStyle: {
    // overflow: 'hidden',
    borderRadius: 20,
    
  },
  
  iosOpacity: {
    opacity: 1, 
  },

  pressedStyle: {
    opacity: 0.8,
    
  },
});

export default CustomTouchable;