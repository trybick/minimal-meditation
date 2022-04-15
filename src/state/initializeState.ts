import { SetRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endingSoundState } from 'state/settings';
import { STORAGE } from 'utils/storage';
import { EndingSoundOption } from 'utils/soundLibrary';

export async function initializeState({ set }: { set: SetRecoilState }) {
  const savedValue = await AsyncStorage.getItem(STORAGE.ENDING_SOUND);
  if (savedValue) {
    set(endingSoundState, savedValue as EndingSoundOption);
  }
}
