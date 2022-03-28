import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { BackButton, NativeRouter, Route, Switch } from 'react-router-native';
import { ThemeProvider } from 'react-native-elements';
import { ROUTES } from 'utils/routes';
import HomePage from 'components/HomePage/HomePage';

export default function App() {
  return (
    <ThemeProvider>
      <NativeRouter>
        <BackButton />
        <StatusBar style="auto" />

        <Switch>
          <Route exact path={ROUTES.HOME} component={HomePage} />
        </Switch>
      </NativeRouter>
    </ThemeProvider>
  );
}

registerRootComponent(App);
