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
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    playThroughEarpieceAndroid: false,
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
