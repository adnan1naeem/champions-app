import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplashScreen from '../src/Screens/SplashScreen/SplashScreen'
import AppAutoUpdateScreen from '../src/Screens/AppAutoUpdateScreen'
import Signin from '../src/Screens/Authentication/SignIn/Signin'
import SignUp from '../src/Screens/Authentication/SignUp/SignUp'
import ForgetPassword from '../src/Screens/Authentication/ForgetPassword/ForgetPassword'
import PinCodeScreen from '../src/Screens/Authentication/SignIn/PinCodeScreen'
import ChangePassword from '../src/Screens/Authentication/ChangePassword/ChangePassword'
import ConfirmPassword from '../src/Screens/Authentication/ChangePassword/ConfirmPassword'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AuthStack = () => {
const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={"SplashScreen" }>
       <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
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
        name="ConfirmPassword"
        component={ConfirmPassword}
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
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})