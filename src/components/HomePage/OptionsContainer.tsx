import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox, Dialog, Text } from '@rneui/base';
import Icon from 'react-native-vector-icons/Entypo';
import { selectDefaultTimestampDuration } from 'state/atoms';
import { durationsInTimestamps } from 'utils/durationOptions';
import { STORAGE } from 'utils/storage';
import colors from 'style/colors';

export default function OptionsContainer() {
  const [selectedDuration, setSelectedDuration] = useState('');
  const defaultTimestampDuration = useRecoilValue(selectDefaultTimestampDuration);
  const [isDurationDialogOpen, setIsDurationDialogOpen] = useState(false);
  const openDialog = () => setIsDurationDialogOpen(true);
  const closeDialog = () => setIsDurationDialogOpen(false);

  const onSelectOption = async (option: string) => {
    setSelectedDuration(option);
    closeDialog();
    await AsyncStorage.setItem(STORAGE.DEFAULT_DURATION, option);
  };

  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity onPress={openDialog} style={styles.chip}>
        <Text style={styles.optionText}>Duration</Text>
        <View style={styles.currentSetting}>
          <Text style={styles.optionText}>{selectedDuration || defaultTimestampDuration}</Text>
          <Icon color={colors.primary} name="chevron-small-right" size={22} />
        </View>
      </TouchableOpacity>

      <Dialog isVisible={isDurationDialogOpen} onBackdropPress={closeDialog}>
        <Dialog.Title title="Choose duration" />
        {durationsInTimestamps.map((timestamp, i) => (
          <CheckBox
            checked={selectedDuration === timestamp}
            checkedIcon="dot-circle-o"
            containerStyle={styles.checkboxContainer}
            key={i}
            onPress={() => onSelectOption(timestamp)}
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
