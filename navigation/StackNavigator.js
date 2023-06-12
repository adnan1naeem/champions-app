import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Navigation from "./Navigation";
import Home from "../src/Screens/Home";
import AppAutoUpdateScreen from "../src/Screens/AppAutoUpdateScreen";
import Detail from "../src/Screens/Detail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppState } from "react-native";

const StackNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  const checkAppUpdates = async () => {
    if (!__DEV__) {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          navigation.navigate("AppAutoUpdateScreen");
        }
      } catch (error) {}
    }
  };
  useEffect(() => {
    if (AppState.currentState === "active") {
      checkAppUpdates();
    }
    AppState.addEventListener("change", (nextAppState) => {
      checkAppUpdates();
    });
  });
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AppAutoUpdateScreen"
        component={AppAutoUpdateScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
