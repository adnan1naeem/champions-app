import "react-native-gesture-handler";
import React, { useRef, useState, useEffect } from "react";
import Navigation from "./navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppState, StyleSheet, Text, View, LogBox, StatusBar } from "react-native";

const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setappStatevisible] = useState(appState.current);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the Foreground!");
    }
    appState.current = nextAppState;
    setappStatevisible(appState.current);
    console.log("App State:: ", appState.current);
  };

  return (
    <SafeAreaProvider>
     <StatusBar hidden={true} />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
