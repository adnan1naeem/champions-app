import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Navigation from './navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, LogBox, } from 'react-native';
import { Colors } from './src/Utils/Colors';
import messaging from '@react-native-firebase/messaging';


const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Received a background message:', remoteMessage);

  });

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={Colors.blueBar} barStyle="light-content" />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;


