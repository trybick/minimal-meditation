import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Button, Header, Text } from 'react-native-elements';

export default function CreateSessionPage() {
  const history = useHistory();

  return (
    <View>
      <Header
        leftComponent={{ text: 'Back', style: { color: '#fff' }, onPress: () => history.push('/') }}
        centerComponent={{ text: 'Create', style: { color: '#fff' } }}
      />

      <View style={styles.pageContainer}>
        <Text>Create Page</Text>

        <Button
          buttonStyle={{ marginBottom: 50 }}
          onPress={() => history.push('/')}
          title="Go Home"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
