import React, { useReducer } from 'react';
import { useRecoilState } from 'recoil';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox, Dialog, Input, Icon as RNEIcon, Text } from '@rneui/base';
import Icon from 'react-native-vector-icons/Entypo';
import { selectTimerDuration } from 'state/duration';
import { selectEndingSound } from 'state/settings';
import { durationsEntries } from 'utils/durationOptions';
import { convertMinutesToSeconds, convertSecondsToClockTime } from 'utils/time';
import { STORAGE } from 'utils/storage';
import { numberRegex } from 'utils/regex';
import { playSound } from 'utils/soundPlayer';
import { EndingSoundOption, endingSoundOptions } from 'utils/soundLibrary';
import colors from 'style/colors';

type State = {
  currentDialog: DialogName | null;
  customDuration: string;
};

const initialState = {
  currentDialog: null,
  customDuration: '',
};

type DialogName = 'DurationOptions' | 'CustomDuration' | 'EndingSound';

type Action =
  | { type: 'openDialog'; name: DialogName }
  | { type: 'closeDialogs' }
  | { type: 'setCustomDuration'; value: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'openDialog':
      return { ...state, currentDialog: action.name };
    case 'closeDialogs':
      return { ...state, currentDialog: null };
    case 'setCustomDuration':
      return { ...state, customDuration: action.value };
    default:
      throw new Error();
  }
}

export default function OptionsContainer() {
  const [timerDuration, setTimerDuration] = useRecoilState(selectTimerDuration);
  const [endingSound, setEndingSound] = useRecoilState(selectEndingSound);
  const [{ currentDialog, customDuration }, dispatch] = useReducer(reducer, initialState);

  const isDialogVisible = (name: DialogName) => currentDialog === name;
  const openDialog = (name: DialogName) => dispatch({ type: 'openDialog', name });
  const closeDialogs = () => dispatch({ type: 'closeDialogs' });

  const onSelectDurationOption = async (option: number) => {
    setTimerDuration(option);
    closeDialogs();
    await AsyncStorage.setItem(STORAGE.SAVED_DURATION, String(option));
  };

  const onCustomDurationChange = (value: string) => {
    if (!value) {
      dispatch({ type: 'setCustomDuration', value: '' });
    } else if (numberRegex.test(value)) {
      dispatch({ type: 'setCustomDuration', value });
    }
  };

  const onCustomDurationSubmit = async () => {
    const customDurationToSet = convertMinutesToSeconds(+customDuration);
    setTimerDuration(customDurationToSet);
    closeDialogs();
    await AsyncStorage.setItem(STORAGE.SAVED_DURATION, String(customDurationToSet));
    dispatch({ type: 'setCustomDuration', value: '' });
  };

  const onPressCancelCustomDuration = () => {
    dispatch({ type: 'setCustomDuration', value: '' });
    closeDialogs();
  };

  const onPressEndingSoundOption = async (option: EndingSoundOption) => {
    playSound(option);
    setEndingSound(option);
    await AsyncStorage.setItem(STORAGE.ENDING_SOUND, option);
  };

  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity
        onPress={() => openDialog('DurationOptions')}
        style={styles.optionContainer}
      >
        <Text style={styles.optionText}>Duration</Text>
        <View style={styles.currentSetting}>
          <Text style={styles.optionText}>{convertSecondsToClockTime(timerDuration)}</Text>
          <Icon color={colors.primary} name="chevron-small-right" size={22} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openDialog('EndingSound')} style={styles.optionContainer}>
        <Text style={styles.optionText}>Ending Sound</Text>
        <View style={styles.currentSetting}>
          <Text style={styles.optionText}>{endingSound}</Text>
          <Icon color={colors.primary} name="chevron-small-right" size={22} />
        </View>
      </TouchableOpacity>

      <Dialog isVisible={isDialogVisible('DurationOptions')} onBackdropPress={() => closeDialogs()}>
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
          checkedIcon="dot-circle-o"
          containerStyle={styles.checkboxContainer}
          key="custom"
          onPress={() => openDialog('CustomDuration')}
          title="Custom"
          uncheckedIcon="circle-o"
        />
        <Dialog.Actions>
          <Dialog.Button
            onPress={() => closeDialogs()}
            title="CANCEL"
            titleStyle={styles.colorWhite}
          />
        </Dialog.Actions>
      </Dialog>

      <Dialog isVisible={isDialogVisible('CustomDuration')} onBackdropPress={() => closeDialogs()}>
        <Input
          inputStyle={styles.colorWhite}
          onChangeText={onCustomDurationChange}
          placeholder="Duration in minutes"
          shake={() => null}
          value={customDuration}
        />
        <Dialog.Actions>
          <Dialog.Button
            onPress={onCustomDurationSubmit}
            title="ENTER"
            titleStyle={styles.colorWhite}
          />
          <Dialog.Button
            onPress={onPressCancelCustomDuration}
            title="CANCEL"
            titleStyle={styles.colorWhite}
          />
        </Dialog.Actions>
      </Dialog>

      <Dialog isVisible={isDialogVisible('EndingSound')} onBackdropPress={() => closeDialogs()}>
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
          <Dialog.Button
            onPress={() => closeDialogs()}
            title="SAVE"
            titleStyle={styles.colorWhite}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 400,
    width: '100%',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 24,
    padding: 14,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  optionText: {
    color: colors.primary,
    fontSize: 18,
    marginRight: 5,
  },
  currentSetting: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    backgroundColor: colors.primary,
  },
  colorWhite: {
    color: 'white',
  },
});
