import { useEffect, useState } from 'react';
import { AppState} from 'react-native';

const useAppState = ({ imageSource }) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove(); 
    };
  }, []);

  
  return { appState, imageSource };
};

export default useAppState;

