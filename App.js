import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Navigation from './navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, LogBox } from 'react-native';
import { Colors } from './src/Utils/Colors';
import codePush from 'react-native-code-push';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={Colors.blueBar} barStyle="light-content" />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default codePush(App);
