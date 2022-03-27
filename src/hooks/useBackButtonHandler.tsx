import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export function useBackButtonHandler() {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
}
