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
      <View style={styles.chip}>
        <Text style={styles.text}>Duration</Text>
        <TouchableOpacity onPress={openDialog} style={styles.optionButton}>
          <Text style={styles.text}>{duration}</Text>
          <Icon color="white" name="chevron-small-right" size={22} />
        </TouchableOpacity>
      </View>

      <Dialog
        isVisible={isDurationDialogOpen}
        onBackdropPress={closeDialog}
        overlayStyle={{ backgroundColor: 'white' }}
      >
        <Dialog.Title title="Choose duration" />
        {durationOptions.map((option, i) => (
          <CheckBox
            key={i}
            title={option}
            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={duration === option}
            onPress={() => setDuration(option)}
          />
        ))}
        <Dialog.Actions>
          <Dialog.Button title="CONFIRM" titleStyle={{ color: 'white' }} onPress={closeDialog} />
          <Dialog.Button title="CANCEL" titleStyle={{ color: 'white' }} onPress={closeDialog} />
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
  text: {
    color: 'white',
    fontSize: 18,
    marginRight: 5,
  },
  optionButton: {
    display: 'flex',
    flexDirection: 'row',
  },
});
