import React, { useReducer, useState } from 'react';
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
  // isDurationOptionsDialogOpen: boolean;
  // isCustomDurationDialogOpen: boolean;
  // isEndingSoundDialogOpen: boolean;
  customDuration: string;
};

const initialState = {
  // isDurationOptionsDialogOpen: false,
  // isCustomDurationDialogOpen: false,
  // isEndingSoundDialogOpen: false,
  customDuration: '',
};

type DialogName = 'DurationOptions' | 'CustomDuration' | 'EndingSound';

type Action =
  // | { type: 'openDialog'; dialogName: DialogName }
  // | { type: 'closeDialog'; dialogName: DialogName }
  { type: 'setCustomDuration'; value: string };

function reducer(state: State, action: Action) {
  switch (action.type) {
    // case 'openDialog':
    //   return { count: state.count + 1 };
    case 'setCustomDuration':
      return { customDuration: action.value };
    default:
      throw new Error();
  }
}

export default function OptionsContainer() {
  const [timerDuration, setTimerDuration] = useRecoilState(selectTimerDuration);
  const [endingSound, setEndingSound] = useRecoilState(selectEndingSound);
  const [isDurationOptionsDialogOpen, setIsDurationOptionsDialogOpen] = useState(false);
  const [isCustomDurationDialogOpen, setIsCustomDurationDialogOpen] = useState(false);
  const [isEndingSoundDialogOpen, setIsEndingSoundDialogOpen] = useState(false);
  const openDurationOptionsDialog = () => setIsDurationOptionsDialogOpen(true);
  const closeDurationOptionsDialog = () => setIsDurationOptionsDialogOpen(false);
  const openCustomDurationDialog = () => setIsCustomDurationDialogOpen(true);
  const closeCustomDurationDialog = () => setIsCustomDurationDialogOpen(false);
  const openEndingSoundDialog = () => setIsEndingSoundDialogOpen(true);
  const closeEndingSoundDialog = () => setIsEndingSoundDialogOpen(false);

  const [{ customDuration }, dispatch] = useReducer(reducer, initialState);

  const onSelectDurationOption = async (option: number) => {
    setTimerDuration(option);
    closeDurationOptionsDialog();
    await AsyncStorage.setItem(STORAGE.SAVED_DURATION, String(option));
  };

  const onPressCustomDurationOption = () => {
    closeDurationOptionsDialog();
    openCustomDurationDialog();
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
    closeCustomDurationDialog();
    await AsyncStorage.setItem(STORAGE.SAVED_DURATION, String(customDurationToSet));
    dispatch({ type: 'setCustomDuration', value: '' });
  };

  const onPressCancelCustomDuration = () => {
    dispatch({ type: 'setCustomDuration', value: '' });
    closeCustomDurationDialog();
  };

  const onPressEndingSoundOption = async (option: EndingSoundOption) => {
    playSound(option);
    setEndingSound(option);
    await AsyncStorage.setItem(STORAGE.ENDING_SOUND, option);
  };

  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity onPress={openDurationOptionsDialog} style={styles.optionContainer}>
        <Text style={styles.optionText}>Duration</Text>
        <View style={styles.currentSetting}>
          <Text style={styles.optionText}>{convertSecondsToClockTime(timerDuration)}</Text>
          <Icon color={colors.primary} name="chevron-small-right" size={22} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={openEndingSoundDialog} style={styles.optionContainer}>
        <Text style={styles.optionText}>Ending Sound</Text>
        <View style={styles.currentSetting}>
          <Text style={styles.optionText}>{endingSound}</Text>
          <Icon color={colors.primary} name="chevron-small-right" size={22} />
        </View>
      </TouchableOpacity>

      <Dialog isVisible={isDurationOptionsDialogOpen} onBackdropPress={closeDurationOptionsDialog}>
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
          onPress={onPressCustomDurationOption}
          title="Custom"
          uncheckedIcon="circle-o"
        />
        <Dialog.Actions>
          <Dialog.Button
            onPress={closeDurationOptionsDialog}
            title="CANCEL"
            titleStyle={styles.colorWhite}
          />
        </Dialog.Actions>
      </Dialog>

      <Dialog isVisible={isCustomDurationDialogOpen} onBackdropPress={closeCustomDurationDialog}>
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

      <Dialog isVisible={isEndingSoundDialogOpen} onBackdropPress={closeEndingSoundDialog}>
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
            onPress={closeEndingSoundDialog}
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
