import { useState, useEffect, useRef } from 'react';
import { AppState} from 'react-native';


const useAppState = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisible(nextAppState);
      console.log('AppState', appState.current);
    }
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

      return () => {
        appStateSubscription.remove();
      };
    }, []);

    
  return { appState: appStateVisible }
};


export default useAppState;




