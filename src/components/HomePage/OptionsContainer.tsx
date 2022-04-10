import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox, Dialog, Text } from '@rneui/base';
import Icon from 'react-native-vector-icons/Entypo';
import { timerDurationState } from 'state/duration';
import { durationsEntries } from 'utils/durationOptions';
import { STORAGE } from 'utils/storage';
import colors from 'style/colors';
import { convertSecondsToClockTime } from '../../utils/time';

export default function OptionsContainer() {
  const [timerDuration, setTimerDuration] = useRecoilState(timerDurationState);
  const [isDurationDialogOpen, setIsDurationDialogOpen] = useState(false);
  const openDialog = () => setIsDurationDialogOpen(true);
  const closeDialog = () => setIsDurationDialogOpen(false);

  const onSelectOption = async (option: number) => {
    setTimerDuration(option);
    closeDialog();
    await AsyncStorage.setItem(STORAGE.SAVED_DURATION, String(option));
  };

  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity onPress={openDialog} style={styles.chip}>
        <Text style={styles.optionText}>Duration</Text>
        <View style={styles.currentSetting}>
          <Text style={styles.optionText}>{convertSecondsToClockTime(timerDuration)}</Text>
          <Icon color={colors.primary} name="chevron-small-right" size={22} />
        </View>
      </TouchableOpacity>

      <Dialog isVisible={isDurationDialogOpen} onBackdropPress={closeDialog}>
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
