import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { BackButton, NativeRouter, Route, Switch } from 'react-router-native';
import { ThemeProvider } from 'react-native-elements';
import { ROUTES } from 'utils/routes';
import HomePage from 'components/HomePage/HomePage';
import CreateSessionPage from 'components/CreateSessionPage';

export default function App() {
  return (
    <ThemeProvider>
      <NativeRouter>
        <BackButton />
        <StatusBar hidden />
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.CREATE} component={CreateSessionPage} />
        </Switch>
      </NativeRouter>
    </ThemeProvider>
  );
}

registerRootComponent(App);
