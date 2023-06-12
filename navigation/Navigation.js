import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppAutoUpdateScreen from "../src/Screens/AppAutoUpdateScreen";
import * as Updates from "expo-updates";
import { AppState } from "react-native";
import Detail from "../src/Screens/Detail";
import Home from "../src/Screens/Home/Index";
import Signin from "../src/Screens/Authentication/Signin";
import PinCodeScreen from "../src/Screens/Authentication/PinCodeScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = ({ navigation }) => {
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
    <Stack.Navigator initialRouteName="PinCodeScreen">
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
        <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PinCodeScreen"
        component={PinCodeScreen}
        options={{
          headerShown: false,
        }}
      />
        
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
