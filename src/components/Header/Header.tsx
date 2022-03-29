import { Platform, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Header as HeaderComponent } from 'react-native-elements';
import { ROUTES } from 'utils/routes';

export default function Header({
  pageTitle,
  showBackButton,
}: {
  pageTitle: string;
  showBackButton?: boolean;
}) {
  const history = useHistory();
  const commonProps = {
    backgroundColor: '#2196f3',
    centerContainerStyle: styles.textContainer,
    centerComponent: { text: pageTitle, style: styles.titleText },
    containerStyle: styles.headerContainer,
  };

  return showBackButton ? (
    <HeaderComponent
      leftComponent={{
        color: '#fff',
        icon: 'arrow-back',
        type: 'ionicon',
        size: 21,
        onPress: () => history.push(ROUTES.HOME),
      }}
      leftContainerStyle={styles.textContainer}
      {...commonProps}
    />
  ) : (
    <HeaderComponent {...commonProps} />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.OS === 'ios' ? 90 : 80,
  },
  textContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  titleText: {
    color: '#fff',
    fontSize: 18,
  },
});
