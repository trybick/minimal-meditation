import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CheckBox, Dialog, Text } from '@rneui/base';
import Icon from 'react-native-vector-icons/Entypo';
import { defaultDuration, durationOptions } from 'utils/durationOptions';

export default function OptionsContainer() {
  const [duration, setDuration] = useState(defaultDuration);
  const [isDurationDialogOpen, setIsDurationDialogOpen] = useState(false);
  const openDialog = () => setIsDurationDialogOpen(true);
  const closeDialog = () => setIsDurationDialogOpen(false);

  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity onPress={openDialog} style={styles.chip}>
        <Text style={styles.optionText}>Duration</Text>
        <View style={styles.currentSetting}>
          <Text style={styles.optionText}>{duration}</Text>
          <Icon color="white" name="chevron-small-right" size={22} />
        </View>
      </TouchableOpacity>

      <Dialog
        isVisible={isDurationDialogOpen}
        onBackdropPress={closeDialog}
        overlayStyle={{ backgroundColor: 'white' }}
      >
        <Dialog.Title title="Choose duration" />
        {durationOptions.map((option, i) => (
          <CheckBox
            checked={duration === option}
            checkedIcon="dot-circle-o"
            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
            key={i}
            onPress={() => setDuration(option)}
            title={option}
            uncheckedIcon="circle-o"
          />
        ))}
        <Dialog.Actions>
          <Dialog.Button onPress={closeDialog} title="CONFIRM" titleStyle={{ color: 'white' }} />
          <Dialog.Button onPress={closeDialog} title="CANCEL" titleStyle={{ color: 'white' }} />
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
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    marginRight: 5,
  },
  currentSetting: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
