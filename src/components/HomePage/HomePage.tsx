import { StyleSheet, Text, View } from 'react-native';
import { useBackButtonHandler } from 'hooks/useBackButtonHandler';
import Layout from 'components/common/Layout';

export default function HomePage() {
  useBackButtonHandler();

  return (
    <Layout>
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>minimal meditation</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  titleText: {
    color: 'white',
    fontSize: 16,
  },
});
