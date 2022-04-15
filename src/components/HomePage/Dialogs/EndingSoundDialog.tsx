import { StyleSheet } from 'react-native';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox, Dialog, Icon as RNEIcon } from '@rneui/base';
import { STORAGE } from 'utils/storage';
import { endingSoundState } from 'state/settings';
import { EndingSoundOption, endingSoundOptions } from 'utils/soundLibrary';
import { playSound } from 'utils/soundPlayer';
import colors from 'style/colors';

export default function EndingSoundDialog({
  isVisible,
  closeDialogs,
}: {
  isVisible: boolean;
  closeDialogs: () => void;
}) {
  const [endingSound, setEndingSound] = useRecoilState(endingSoundState);

  const onPressEndingSoundOption = async (option: EndingSoundOption) => {
    playSound(option);
    setEndingSound(option);
    await AsyncStorage.setItem(STORAGE.ENDING_SOUND, option);
  };

  return (
    <Dialog isVisible={isVisible} onBackdropPress={() => closeDialogs()}>
      {endingSoundOptions.map((sound, i) => (
        <CheckBox
          checked={endingSound === sound}
          checkedIcon={<RNEIcon color="black" name="radio-button-checked" type="material" />}
          containerStyle={styles.checkboxContainer}
          key={`ending-sound-${i}`}
          onPress={() => onPressEndingSoundOption(sound)}
          title={sound}
          uncheckedIcon={<RNEIcon color="black" name="radio-button-unchecked" type="material" />}
        />
      ))}
      <Dialog.Actions>
        <Dialog.Button onPress={() => closeDialogs()} title="SAVE" titleStyle={styles.colorWhite} />
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    backgroundColor: colors.primary,
  },
  colorWhite: {
    color: 'white',
  },
});
