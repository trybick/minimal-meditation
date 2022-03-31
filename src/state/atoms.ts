import { atom } from 'recoil';
import { defaultDuration } from 'utils/durationOptions';

export const durationState = atom({
  key: 'duration',
  default: defaultDuration,
});
