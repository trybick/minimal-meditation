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
