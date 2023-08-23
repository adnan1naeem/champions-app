import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import { Colors } from "../src/Utils/Colors";

const Drawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.text_Color,
          width: "75%",
        },
      }}
    >
      <Drawer.Screen name="StackNavigator" component={StackNavigator} />
    </Drawer.Navigator>
  );
};

export default Drawer;
