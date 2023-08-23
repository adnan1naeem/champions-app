import "react-native-gesture-handler";
import React, { useEffect } from "react";
import Navigation from "./navigation/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, LogBox } from "react-native";
import { Colors } from "./src/Utils/Colors";

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={Colors.blue}
        barStyle="light-content"
      />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
