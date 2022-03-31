import { Button } from '@rneui/base';
import { useHistory } from 'react-router-native';
import { ROUTES } from 'utils/routes';
import colors from 'style/colors';

export default function StartButton() {
  const history = useHistory();

  const onPressStart = () => {
    history.push(ROUTES.TIMER);
  };

  return (
    <Button
      buttonStyle={{
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: 10,
        height: 60,
      }}
      containerStyle={{
        width: 200,
        marginTop: 60,
      }}
      onPress={onPressStart}
      title="Start"
      titleStyle={{ color: colors.primary }}
      type="outline"
    />
  );
}
