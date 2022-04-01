import { StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { ROUTES } from 'utils/routes';
import colors from 'style/colors';

export default function ButtonControls() {
  const history = useHistory();

  const onPressBack = () => {
    history.push(ROUTES.HOME);
  };

  return (
    <View style={styles.buttonsContainer}>
      <AntIcon color={colors.primary} name="back" onPress={onPressBack} size={25} />
      <MaterialIcon color={colors.primary} name="pause" size={40} />
      {/* This third icon is only here to take up a blank space so Pause icon is centered */}
      <AntIcon color={colors.hidden} name="back" size={25} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 500,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
});
