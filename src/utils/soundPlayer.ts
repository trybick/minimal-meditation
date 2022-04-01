import { Audio } from 'expo-av';
import SoundLibrary from './soundLibrary';

const loadedSounds: {
  [key: string]: Audio.Sound;
} = {};

export function loadSounds() {
  Object.entries(SoundLibrary).forEach(([name, sound]) => {
    loadedSounds[name] = new Audio.Sound();
    loadedSounds[name].loadAsync(sound);
  });
}

export function unloadSounds() {
  Object.keys(SoundLibrary).forEach(name => {
    loadedSounds[name].unloadAsync();
  });
}

export async function playSound(name: string) {
  if (loadedSounds[name]) {
    console.log('playing sound:', name);
    await loadedSounds[name].replayAsync().catch(console.warn);
  }
}
