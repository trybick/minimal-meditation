import { useRecoilValue } from 'recoil';
import { StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Button } from '@rneui/base';
import { ROUTES } from 'utils/routes';
import Layout from 'components/common/Layout';
import { durationState } from 'state/atoms';

export default function CreateSessionPage() {
  const history = useHistory();
  const duration = useRecoilValue(durationState);

  return (
    <Layout>
      <View style={styles.pageContainer}>
        <Button onPress={() => history.push(ROUTES.HOME)} title="Exit" />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: 'black',
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
