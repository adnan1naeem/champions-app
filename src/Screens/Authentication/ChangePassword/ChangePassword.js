import {
  Image,
  Text,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../../Utils/Colors";
import CustomButton from "../../../Components/CustomButton";
import { styles } from "./style";
import link from "../../../../services/config";
import { useNavigation } from "@react-navigation/native";
import { postUserData } from "../../../../Component/Post";
import ConfirmPassword from "./ConfirmPassword";
const ChangePassword = () => {
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    setLoading(true)
    setEmptyField(false);
    if (cnic === "" || password === "" || confirmPassword === "") {
      alert("1")
      setLoading(false)
      setEmptyField(true)
    }
    else {
      if (password !== confirmPassword) {
        setLoading(false)
        setIncorrectPassword(true)
        return;
      }
      else {
        setIncorrectPassword(false);
        try {
          let data =
            JSON.stringify({
              cnic: cnic,
              newPassword: password,
              reEnterPassword: confirmPassword
            })
          const config = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: data,
          };

          const response = await fetch("http://16.24.45.175:8000/resetPassword", config);
          if (!response.ok) {
            setLoading(false);
            alert("Invalid Password", "Please check your password and try again.");
            // throw new Error("Network response was not ok");
            return;
          }
          const responsedata = await response.json();
          if(response?.status===200){
            setLoading(false)
            navigation.reset({
              index: 0,
              routes: [{ name: 'ConfirmPassword' }],
            });        
          }
          else if(response?.status!==200){
            setLoading(false)
            alert(responsedata?.message)
          }
        }
        catch (error) {
          setLoading(fasle)
          console.error("Error posting data:" + error?.message);
        }
      }
    }
  }

  const formatCnic = (input) => {
    // Remove all non-numeric characters from the input
    const numericInput = input.replace(/[^\d]/g, "");

    // Split the CNIC into three parts with dashes
    let formattedCnic = "";
    for (let i = 0; i < numericInput.length; i++) {
      if (i === 5 || i === 12) {
        formattedCnic += "-";
      }
      formattedCnic += numericInput[i];
    }

    // Return the formatted CNIC
    return formattedCnic;
  };
  const handleInputChange = (field, value) => {
    if (field === "cnic") {
      const formattedCnic = formatCnic(value);
      setCnic(formattedCnic);
    } else if (field === "password") {
      setPassword(value);
    } else if (field === "confirmPassword") {
      setConfirmPassword(value);
    }
  };


  return (
    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.Login_main_view}>
          <Image style={styles.logo} source={require('../../../Assets/Image/login_image.png')} resizeMode="contain" />
        </View>
        <View style={styles.Login_view}>

          <View style={{ width: "70%", alignSelf: "center" }}>

            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="CNIC/Social Security"
                value={cnic}
                onChangeText={(text) => handleInputChange("cnic", text)}
                keyboardType={"numeric"}
              />
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Password"
                value={password}
                onChangeText={(text) => handleInputChange("password", text)}
                keyboardType="default"
                secureTextEntry
              />
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                keyboardType="default"
                secureTextEntry
              />
            </View>
            {incorrectPassword ? <Text style={{ color: 'red' }}>
              Password is Incorrect
            </Text> : null}
            {emptyField ? <Text style={{ color: 'red' }}>
              Field should not be Empty
            </Text> : null}
          </View>
          <CustomButton
            onPress={() => handleSignUp()}
            disabled={loading}
            ContainerStyle={{
              marginTop: 50,
              justifyContent: "center",
              alignSelf: "center",
              width: "80%",
              borderRadius: 15,
              opacity: loading ? 0.7 : 1,
            }}
            textStyle={{ color: Colors.White, textAlign: "center", fontSize: 18, fontFamily: '200' }}
            title={loading ? "Loading..." : "Proceed"}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ChangePassword;