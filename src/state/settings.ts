import { atom } from 'recoil';
import { DEFAULT_ENDING_SOUND, EndingSoundOption } from 'utils/soundLibrary';

export const endingSoundState = atom<EndingSoundOption>({
  key: 'endingSoundState',
  default: DEFAULT_ENDING_SOUND,
});
