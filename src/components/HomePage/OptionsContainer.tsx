import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function OptionsContainer() {
  const [duration, setDuration] = useState('10:00');
  return (
    <View style={styles.optionsContainer}>
      <View style={styles.chip}>
        <Text style={styles.text}>Duration</Text>
        <Button title={duration} titleStyle={{ color: 'white' }} type="clear" />
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
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
