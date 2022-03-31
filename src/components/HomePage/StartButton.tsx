import { Button } from '@rneui/base';

export default function StartButton() {
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
    />
  );
}
