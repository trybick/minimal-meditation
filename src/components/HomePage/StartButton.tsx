import { Button } from '@rneui/base';
import { useHistory } from 'react-router-native';
import { ROUTES } from 'utils/routes';

export default function StartButton() {
  const history = useHistory();

  const onPressStart = () => {
    history.push(ROUTES.TIMER);
  };

  return (
    <Button
      title="Begin"
      buttonStyle={{
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        height: 60,
      }}
      type="outline"
      titleStyle={{ color: 'white' }}
      containerStyle={{
        width: 200,
        marginTop: 60,
      }}
      onPress={onPressStart}
    />
  );
}
