import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { BackButton, NativeRouter, Route, Switch } from 'react-router-native';
import { ThemeProvider } from '@rneui/themed';
import { ROUTES } from 'utils/routes';
import HomePage from 'components/HomePage/HomePage';
import TimerPage from 'components/TimerPage/TimerPage';

export default function App() {
  return (
    <ThemeProvider>
      <NativeRouter>
        <BackButton />
        <StatusBar hidden />
        <Switch>
          <Route component={HomePage} path={ROUTES.HOME} exact />
          <Route component={TimerPage} path={ROUTES.TIMER} exact />
        </Switch>
      </NativeRouter>
    </ThemeProvider>
  );
}

registerRootComponent(App);
