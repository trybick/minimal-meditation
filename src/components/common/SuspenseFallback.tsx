import { StyleSheet, View } from 'react-native';

export default function SuspenseFallback() {
  return <View style={styles.fallback} />;
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
  },
});
