import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CheckBox, Dialog, Text } from '@rneui/base';
import Icon from 'react-native-vector-icons/Entypo';

const durationOptions = ['5:00', '10:00', '15:00'];

export default function OptionsContainer() {
  const [duration, setDuration] = useState('10:00');
  const [isDurationDialogOpen, setIsDurationDialogOpen] = useState(false);

  const onPressDuration = () => {
    setIsDurationDialogOpen(true);
  };

  return (
    <View style={styles.optionsContainer}>
      <View style={styles.chip}>
        <Text style={styles.text}>Duration</Text>
        <TouchableOpacity onPress={onPressDuration} style={styles.optionButton}>
          <Text style={styles.text}>{duration}</Text>
          <Icon color="white" name="chevron-small-right" size={22} />
        </TouchableOpacity>
      </View>

      <Dialog
        isVisible={isDurationDialogOpen}
        onBackdropPress={() => setIsDurationDialogOpen(false)}
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
          <Dialog.Button title="CONFIRM" onPress={() => setIsDurationDialogOpen(false)} />
          <Dialog.Button title="CANCEL" onPress={() => setIsDurationDialogOpen(false)} />
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
    borderRadius: 8,
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
