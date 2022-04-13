import { atom } from 'recoil';
import { EndingSoundOption } from 'utils/soundLibrary';

export const endingSoundState = atom<EndingSoundOption>({
  key: 'endingSoundState',
  default: 'Bell 1',
});
