import { atom, selector } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_DURATION } from 'utils/durationOptions';
import { STORAGE } from 'utils/storage';

const timerDurationState = atom<number | null>({
  key: 'timerDurationState',
  default: null,
});

export const selectTimerDuration = selector<number>({
  key: 'selectTimerDuration',
  get: async ({ get }) => {
    const durationInState = get(timerDurationState);
    const savedDuration = await AsyncStorage.getItem(STORAGE.SAVED_DURATION);
    return durationInState || Number(savedDuration) || DEFAULT_DURATION;
  },
  set: ({ set }, duration) => set(timerDurationState, duration),
});
