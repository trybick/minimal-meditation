import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox, Dialog, Input, Text } from '@rneui/base';
import Icon from 'react-native-vector-icons/Entypo';
import { selectTimerDuration } from 'state/duration';
import { durationsEntries } from 'utils/durationOptions';
import { convertMinutesToSeconds, convertSecondsToClockTime } from 'utils/time';
import { STORAGE } from 'utils/storage';
import { numberRegex } from 'utils/regex';
import colors from 'style/colors';

export default function OptionsContainer() {
  const [timerDuration, setTimerDuration] = useRecoilState(selectTimerDuration);
  const [isDurationOptionsDialogOpen, setIsDurationOptionsDialogOpen] = useState(false);
  const [isCustomDurationDialogOpen, setIsCustomDurationDialogOpen] = useState(false);
  const [customDuration, setCustomDuration] = useState('');
  const openDurationOptionsDialog = () => setIsDurationOptionsDialogOpen(true);
  const closeDurationOptionsDialog = () => setIsDurationOptionsDialogOpen(false);
  const openCustomDurationDialog = () => setIsCustomDurationDialogOpen(true);
  const closeCustomDurationDialog = () => setIsCustomDurationDialogOpen(false);

  const onSelectOption = async (option: number) => {
    setTimerDuration(option);
    closeDurationOptionsDialog();
    await AsyncStorage.setItem(STORAGE.SAVED_DURATION, String(option));
  };

  const onPressCustomDurationOption = () => {
    closeDurationOptionsDialog();
    openCustomDurationDialog();
  };

  const onCustomDurationChange = (duration: string) => {
    if (numberRegex.test(duration)) {
      setCustomDuration(duration);
    }
  };

  const onCustomDurationSubmit = () => {
    const customDurationToSet = convertMinutesToSeconds(+customDuration);
    setTimerDuration(customDurationToSet);
    closeCustomDurationDialog();
  };

  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity onPress={openDurationOptionsDialog} style={styles.chip}>
        <Text style={styles.optionText}>Duration</Text>
        <View style={styles.currentSetting}>
          <Text style={styles.optionText}>{convertSecondsToClockTime(timerDuration)}</Text>
          <Icon color={colors.primary} name="chevron-small-right" size={22} />
        </View>
      </TouchableOpacity>

      <Dialog isVisible={isDurationOptionsDialogOpen} onBackdropPress={closeDurationOptionsDialog}>
        <Dialog.Title title="Choose duration" />
        {durationsEntries.map(([timestamp, seconds], i) => (
          <CheckBox
            checked={timerDuration === seconds}
            checkedIcon="dot-circle-o"
            containerStyle={styles.checkboxContainer}
            key={i}
            onPress={() => onSelectOption(seconds)}
            title={timestamp}
            uncheckedIcon="circle-o"
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
          <Dialog.Button onPress={closeDurationOptionsDialog} title="CANCEL" />
        </Dialog.Actions>
      </Dialog>

      <Dialog
        isVisible={isCustomDurationDialogOpen}
        onBackdropPress={() => setIsCustomDurationDialogOpen(false)}
      >
        <Dialog.Title title="Custom Duration" />
        <Input
          onChangeText={onCustomDurationChange}
          placeholder="Duration in minutes"
          shake={() => null}
          value={customDuration}
        />
        <Dialog.Actions>
          <Dialog.Button onPress={onCustomDurationSubmit} title="SUBMIT" />
          <Dialog.Button onPress={closeCustomDurationDialog} title="CANCEL" />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 400,
  },
  chip: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
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
});
