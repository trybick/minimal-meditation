import { StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Button, Text } from '@rneui/base';
import { ROUTES } from 'utils/routes';
import Layout from 'components/common/Layout';

export default function CreateSessionPage() {
  const history = useHistory();

  return (
    <Layout>
      <View style={styles.pageContainer}>
        <Text>Create Page</Text>

        <Button
          buttonStyle={{ marginBottom: 50 }}
          onPress={() => history.push(ROUTES.HOME)}
          title="Go Home"
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
