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
      buttonStyle={{
        borderColor: 'white',
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
      titleStyle={{ color: 'white' }}
      type="outline"
    />
  );
}
