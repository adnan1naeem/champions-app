import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplashScreen from '../src/Screens/SplashScreen/SplashScreen'
import Home from '../src/Screens/Home/Index'
import Scan from '../src/Screens/SCAN/Scan'
import AppAutoUpdateScreen from '../src/Screens/AppAutoUpdateScreen'
import Detail from '../src/Screens/Detail'
import Signin from '../src/Screens/Authentication/SignIn/Signin'
import SignUp from '../src/Screens/Authentication/SignUp/SignUp'
import ForgetPassword from '../src/Screens/Authentication/ForgetPassword/ForgetPassword'
import PinCodeScreen from '../src/Screens/Authentication/SignIn/PinCodeScreen'
import ChangePassword from '../src/Screens/Authentication/ChangePassword/ChangePassword'
import AboutUs from '../src/Screens/Drawer/HelpFAQ/AboutUs/AboutUs'
import TermsAndCondition from '../src/Screens/Drawer/HelpFAQ/TermsConditions/TermsConditions'
import Gallery from '../src/Screens/Drawer/HelpFAQ/Gallery/Gallery'
import ContactUs from '../src/Screens/Drawer/HelpFAQ/ContactUs/ContactUs'
import FAQ from '../src/Screens/Drawer/HelpFAQ/FAQ/FAQ'
import EditProfile from '../src/Screens/EditProfile/EditProfile'
import ConfirmPassword from '../src/Screens/Authentication/ChangePassword/ConfirmPassword'
import Congratulation from '../src/Screens/Authentication/ChangePassword/Congratulations'
import AccountSetting from '../src/Screens/Drawer/AccountSetting/AccountSetting'
import DrawerScreen from '../src/Screens/Drawer/Drawer'
import PaidCategory from '../src/Screens/Home/TotalPaid/PaidCategory'
import HelpFAQ from '../src/Screens/Drawer/HelpFAQ/HelpFaq'
import SearchCate from '../src/Screens/Search/SearchCate'
import Testing from "../src/Testing";


const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={"Home"}>
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
        name="SignUp"
        component={SignUp}
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
  )
}

export default HomeStack
