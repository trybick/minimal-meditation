import { atom, selector } from 'recoil';
import { DEFAULT_DURATION, DURATIONS } from 'utils/durationOptions';

export const selectedMeditationDurationState = atom({
  key: 'selectedMeditationDurationState',
  default: DEFAULT_DURATION,
});

export const selectSecondsInSelectedDuration = selector({
  key: 'secondsInSelectedDuration',
  get: ({ get }) => {
    const timestampDuration = get(selectedMeditationDurationState);
    // @ts-ignore
    return DURATIONS[timestampDuration];
  },
});

export const endingSoundState = atom({
  key: 'endingSoundState',
  default: 'bell1',
});
