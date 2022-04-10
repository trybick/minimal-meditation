import { atom } from 'recoil';
import { DEFAULT_DURATION } from 'utils/durationOptions';

export const timerDurationState = atom<number>({
  key: 'timerDurationState',
  default: DEFAULT_DURATION,
});
