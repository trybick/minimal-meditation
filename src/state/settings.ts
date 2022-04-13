import { atom, selector } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_ENDING_SOUND, EndingSoundOption } from 'utils/soundLibrary';
import { STORAGE } from 'utils/storage';

export const endingSoundState = atom<EndingSoundOption | null>({
  key: 'endingSoundState',
  default: null,
});

export const selectEndingSound = selector<EndingSoundOption>({
  key: 'selectEndingSound',
  get: async ({ get }) => {
    const stateValue = get(endingSoundState);
    const savedValue = (await AsyncStorage.getItem(STORAGE.ENDING_SOUND)) as EndingSoundOption;
    return stateValue || savedValue || DEFAULT_ENDING_SOUND;
  },
  set: ({ set }, endingSound) => set(endingSoundState, endingSound),
});
