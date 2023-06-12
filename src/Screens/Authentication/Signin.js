import {
  Image,
  StyleSheet,
  Text,
  AppState,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Home from "../Home/Index";
import { Colors } from "../../Utils/Colors";
import CustomTextinput from "../../Components/CustomTextinput";
import CustomButton from "../../Components/CustomButton";

const Signin = () => {

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={{ zIndex: 0, height: "100%" }}>
          <Home />
        </View>
        <View
          style={{
            zIndex: 1,
            backgroundColor: Colors.White,
            position: "absolute",
            height: "90%",
            bottom: 5,
            width: "90%",
            alignSelf: "center",
          }}
        >
          <Image
            source={require("../../../assets/Orient.png")}
            style={{ resizeMode: "contain", width: 200, alignSelf: "center" }}
          />
          <Text
            style={{
              color: Colors.blue,
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Lets Sign You In
          </Text>
          <Text style={{ color: Colors.blue, textAlign: "center" }}>
            Welcome back,you've been missed!
          </Text>

          <View style={{ width: "85%", alignSelf: "center" }}>
            <CustomTextinput placeholderText="CNIC" />
            <CustomTextinput placeholderText="Password" eye />
          </View>
          <CustomButton
            onPress={() => alert("Internal Testing...")}
            ContainerStyle={{
              paddingVertical: 10,
              marginTop: 20,
              justifyContent: "center",
              alignSelf: "center",
              backgroundColor: Colors.blue,
              width: 280,
            }}
            textStyle={{ color: Colors.White, textAlign: "center" }}
            title="SIGN IN"
          />
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginHorizontal: 20,
              marginVertical: 5,
            }}
          >
            <TouchableOpacity>
              <Text style={{ color: Colors.Half_white }}>Forget Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: Colors.blue, fontWeight: "bold" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({});
