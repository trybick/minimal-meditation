import { StyleSheet } from 'react-native';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox, Dialog, Icon as RNEIcon } from '@rneui/base';
import { durationsEntries } from 'utils/durationOptions';
import { timerDurationState } from 'state/duration';
import { STORAGE } from 'utils/storage';
import colors from 'style/colors';
import { DialogName } from '../HomePageTypes';

export default function DurationOptionsDialog({
  isVisible,
  closeDialogs,
  openDialog,
}: {
  isVisible: boolean;
  closeDialogs: () => void;
  openDialog: (name: DialogName) => void;
}) {
  const [timerDuration, setTimerDuration] = useRecoilState(timerDurationState);

  const onSelectDurationOption = async (option: number) => {
    setTimerDuration(option);
    closeDialogs();
    await AsyncStorage.setItem(STORAGE.SAVED_DURATION, String(option));
  };

  return (
    <Dialog isVisible={isVisible} onBackdropPress={() => closeDialogs()}>
      {durationsEntries.map(([timestamp, seconds], i) => (
        <CheckBox
          checked={timerDuration === seconds}
          checkedIcon={<RNEIcon color="black" name="radio-button-checked" type="material" />}
          containerStyle={styles.checkboxContainer}
          key={`duration-option-${i}`}
          onPress={() => onSelectDurationOption(seconds)}
          title={timestamp}
          uncheckedIcon={<RNEIcon color="black" name="radio-button-unchecked" type="material" />}
        />
      ))}
      <CheckBox
        checked={false}
        checkedIcon={<RNEIcon color="black" name="radio-button-checked" type="material" />}
        containerStyle={styles.checkboxContainer}
        key="custom"
        onPress={() => openDialog('CustomDuration')}
        title="Custom"
        uncheckedIcon={<RNEIcon color="black" name="radio-button-unchecked" type="material" />}
      />
      <Dialog.Actions>
        <Dialog.Button
          onPress={() => closeDialogs()}
          title="CANCEL"
          titleStyle={styles.colorWhite}
        />
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
