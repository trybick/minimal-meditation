import { atom, selector } from 'recoil';
import { DEFAULT_DURATION } from 'utils/durationOptions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from 'utils/storage';

const selectSavedTimerDuration = selector({
  key: 'selectSavedTimerDuration',
  async get() {
    const savedDuration = (await AsyncStorage.getItem(STORAGE.SAVED_DURATION))!;
    return +savedDuration || DEFAULT_DURATION;
  },
});

export const timerDurationState = atom<number>({
  key: 'timerDurationState',
  default: selectSavedTimerDuration,
});
