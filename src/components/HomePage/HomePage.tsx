import { StyleSheet, View } from 'react-native';
import { useBackButtonHandler } from 'hooks/useBackButtonHandler';
import Layout from 'components/common/Layout';
import OptionsContainer from './OptionsContainer';
import StartButton from './StartButton';

export default function HomePage() {
  useBackButtonHandler();

  return (
    <Layout>
      <View style={styles.pageContainer}>
        <OptionsContainer />
        <StartButton />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
