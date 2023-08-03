import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppAutoUpdateScreen from "../src/Screens/AppAutoUpdateScreen";
import * as Updates from "expo-updates";
import { AppState } from "react-native";
import Detail from "../src/Screens/Detail";
import Home from "../src/Screens/Home/Index";
import Signin from "../src/Screens/Authentication/SignIn/Signin";
import PinCodeScreen from "../src/Screens/Authentication/SignIn/PinCodeScreen";
import StartScreen from "../src/Screens/SplashScreen/SplashScreen";
import SplashScreen from "../src/Screens/SplashScreen/SplashScreen";
import SignUp from "../src/Screens/Authentication/SignUp/SignUp";
import Scan from "../src/Screens/SCAN/Scan";
import DrawerScreen from "../src/Screens/Drawer/Drawer";
import AccountSetting from "../src/Screens/Drawer/AccountSetting/AccountSetting";
import PaidCategory from "../src/Screens/Home/TotalPaid/PaidCategory";
import Approved from "../src/Screens/Approved/Approved";
import HelpFAQ from "../src/Screens/Drawer/HelpFAQ/HelpFaq";
import SearchCate from "../src/Screens/Search/SearchCate";
import ForgetPassword from "../src/Screens/Authentication/ForgetPassword/ForgetPassword";
import ChangePassword from "../src/Screens/Authentication/ChangePassword/ChangePassword";
import ConfirmPassword from "../src/Screens/Authentication/ChangePassword/ConfirmPassword";
import Congratulation from "../src/Screens/Authentication/ChangePassword/Congratulations";
import AboutUs from "../src/Screens/Drawer/HelpFAQ/AboutUs/AboutUs";
import TermsAndCondition from "../src/Screens/Drawer/HelpFAQ/TermsConditions/TermsConditions";
import ContactUs from "../src/Screens/Drawer/HelpFAQ/ContactUs/ContactUs";
import Gallery from "../src/Screens/Drawer/HelpFAQ/Gallery/Gallery";
import FAQ from "../src/Screens/Drawer/HelpFAQ/FAQ/FAQ";
import EditProfile from "../src/Screens/EditProfile/EditProfile";
import Testing from "../src/Testing";

const Stack = createNativeStackNavigator();

const RootNavigator = ({ navigation }) => {
  const checkAppUpdates = async () => {
    if (!__DEV__) {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          navigation.navigate("AppAutoUpdateScreen");
        }
      } catch (error) { }
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
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
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
        name="SignIn"
        component={Signin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TermsAndCondition"
        component={TermsAndCondition}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
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
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmPassword"
        component={ConfirmPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Congratulation"
        component={Congratulation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccountSetting"
        component={AccountSetting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DrawerScreen"
        component={DrawerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaidCategory"
        component={PaidCategory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Approved"
        component={Approved}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HelpFAQ"
        component={HelpFAQ}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchCate"
        component={SearchCate}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Testing"
        component={Testing}
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
