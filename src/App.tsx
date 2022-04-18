import { Suspense, useEffect } from 'react';
import { LogBox } from 'react-native';
import { BackButton, NativeRouter, Route, Switch } from 'react-router-native';
import { RecoilRoot } from 'recoil';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@rneui/themed';
import { initializeState } from 'state/initializeState';
import { ROUTES } from 'utils/routes';
import { loadSounds, unloadSounds } from 'utils/soundPlayer';
import HomePage from 'components/HomePage/HomePage';
import TimerPage from 'components/TimerPage/TimerPage';
import SuspenseFallback from 'components/common/SuspenseFallback';

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer']);
    loadSounds();
    return unloadSounds();
  }, []);

  return (
    <RecoilRoot initializeState={initializeState}>
      <Suspense fallback={<SuspenseFallback />}>
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
      </Suspense>
    </RecoilRoot>
  );
}
