import { StyleSheet, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { useBackButtonHandler } from 'hooks/useBackButtonHandler';
import { Button } from 'react-native-elements';
import { ROUTES } from 'utils/routes';
import Layout from 'components/common/Layout';

export default function HomePage() {
  const history = useHistory();
  useBackButtonHandler();

  return (
    <Layout>
      <View style={styles.pageContainer}>
        <Text>home</Text>
        <Button
          buttonStyle={{ marginBottom: 50, marginTop: 200 }}
          onPress={() => history.push(ROUTES.CREATE)}
          title="Create New"
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
    marginTop: 15,
    marginBottom: 40,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
