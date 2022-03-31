import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

export default function OptionsContainer() {
  const [duration, setDuration] = useState('10:00');

  const onPressDuration = () => {
    // open new page or dialog
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
