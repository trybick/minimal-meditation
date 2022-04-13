export type EndingSoundOption = 'Bell 1' | 'Bell 2' | 'Bell 3';

export const endingSoundOptions: EndingSoundOption[] = ['Bell 1', 'Bell 2', 'Bell 3'];

const SoundLibrary: { [O in EndingSoundOption]: any } = {
  ['Bell 1']: require('../../assets/sound/bell1.wav'),
  ['Bell 2']: require('../../assets/sound/bell2.wav'),
  ['Bell 3']: require('../../assets/sound/bell3.wav'),
};

export default SoundLibrary;
