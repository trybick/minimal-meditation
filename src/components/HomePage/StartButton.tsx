import { StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Button } from '@rneui/base';
import { ROUTES } from 'utils/routes';
import colors from 'style/colors';

export default function StartButton() {
  const history = useHistory();

  const onPressStart = () => {
    history.push(ROUTES.TIMER);
  };

  return (
    <Button
      buttonStyle={styles.button}
      containerStyle={styles.container}
      onPress={onPressStart}
      title="Start"
      titleStyle={styles.title}
      type="outline"
    />
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    height: 60,
  },
  container: {
    width: 200,
    marginTop: 60,
  },
  title: {
    color: colors.primary,
  },
});
