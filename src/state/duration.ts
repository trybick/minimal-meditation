import { atom, selector } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_DURATION, DURATIONS } from 'utils/durationOptions';
import { STORAGE } from 'utils/storage';

export const selectSecondsInSelectedDuration = selector({
  key: 'secondsInSelectedDuration',
  get: async () => {
    const defaultDuration = await AsyncStorage.getItem(STORAGE.DEFAULT_DURATION);
    // @ts-ignore
    return DURATIONS[defaultDuration] || DEFAULT_DURATION;
  },
});

export const selectDefaultTimestampDuration = selector({
  key: 'defaultTimestampDuration',
  get: async () => (await AsyncStorage.getItem(STORAGE.DEFAULT_DURATION)) || DEFAULT_DURATION,
});
