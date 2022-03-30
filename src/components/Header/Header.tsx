import { Platform, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Header as HeaderComponent } from 'react-native-elements';
import { ROUTES } from 'utils/routes';

export default function Header({ showBackButton }: { showBackButton?: boolean }) {
  const history = useHistory();
  const commonProps = {
    backgroundColor: 'black',
    containerStyle: styles.headerContainer,
  };
  const backArrowProps = {
    color: '#fff',
    icon: 'arrow-back',
    type: 'ionicon',
    size: 21,
    onPress: () => history.push(ROUTES.HOME),
  };

  return showBackButton ? (
    <HeaderComponent leftComponent={backArrowProps} {...commonProps} />
  ) : (
    <HeaderComponent {...commonProps} />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.OS === 'ios' ? 90 : 80,
  },
});
