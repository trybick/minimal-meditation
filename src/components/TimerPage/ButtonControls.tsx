import { StyleSheet, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'style/colors';

export default function ButtonControls() {
  return (
    <View style={styles.buttonsContainer}>
      <MaterialIcon color={colors.primary} name="pause" size={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
  },
});
