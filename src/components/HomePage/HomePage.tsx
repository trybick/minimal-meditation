import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { useBackButtonHandler } from 'hooks/useBackButtonHandler';
import Header from 'components/Header/Header';
import { Button } from 'react-native-elements';
import { ROUTES } from 'utils/routes';

export default function HomePage() {
  const history = useHistory();
  useBackButtonHandler();

  return (
    <ScrollView>
      <Header pageTitle="Word Categories" />
      <View style={styles.pageContainer}>
        <Text>home</Text>

        <Button
          buttonStyle={{ marginBottom: 50, marginTop: 200 }}
          onPress={() => history.push(ROUTES.CREATE)}
          title="Create New"
        />
      </View>
    </ScrollView>
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
