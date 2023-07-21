import {
  Image,
  StyleSheet,
  Text,
  AppState,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Colors } from "../../../Utils/Colors";
import CustomTextinput from "../../../Components/CustomTextinput";
import CustomButton from "../../../Components/CustomButton";
import orient_icon from '../../../Assets/Image/OrientNewLogo.png';
import { styles } from "./style";
import link from "../../../../services/config";
import { CheckBox, Input } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import data from "../../Home/Data";
// import axios from "axios";
const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [cnicError, setcnicError] = useState(false);
  const [mobileNo, setmobileNo] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [Name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [mobile, setmobile] = useState("");
  const [dealerCode, setDealerCode] = useState("");
  const [Address, setAddress] = useState("");
  const [password, setPassword] = useState("")

  const navigation = useNavigation();

  const [nameError, setNameError] = useState(false);
  const handleInputChange = (field, value) => {
    if (field === "name") {
      const alphabeticRegex = /^[a-zA-Z\s]*$/;
      if (alphabeticRegex.test(value) || value === "") {
        setName(value)
        setNameError(false);
      } else {
        setNameError(true);
      }
    }
    else if (field === "cnic") {
      const numericRegex = /^[0-9]*$/;
      if (numericRegex.test(value)) {
        setCnic(value)
        setcnicError(false);
      }
      else {
        setcnicError(true);
      }
    }
    else if (field === "mobileNo") {
      const numericRegex = /^[0-9]*$/;
      if (numericRegex.test(value)) {
        setmobile(value)
        setmobileNo(false);
      }
      else {
        setmobileNo(true);
      }
    }
    else if (field === "password") {
      setPassword(value)
      const specialCharRegex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      const minLength = 8;
      const hasSpecialChar = specialCharRegex.test(value);
      const isValidLength = value.length >= minLength;
      setPasswordError(!(hasSpecialChar && isValidLength));
      if (hasSpecialChar && isValidLength) {

      }
    }

    // Update the userData state with the new input value
    // setUserData((prevUserData) => ({
    //   ...prevUserData,
    //   [field]: value,
    // }));
  };
  const handleCheckboxChange = () => {
    // Toggle the value of agreedTerms when the checkbox is clicked
    setIsChecked(!isChecked)
    // setUserData((prevUserData) => ({
    //   ...prevUserData,
    //   agreedTerms: !prevUserData.agreedTerms,
    // }));
  };

  const handleSignUp = () => {
    // Check if all required fields are filled before proceeding
    if (
      Name && cnic && mobile && dealerCode && Address && password && isChecked === true
    ) {
      postUserData();

    } else {
      // Show an error message or handle the case when fields are not filled.
      alert("hello")
    }
  };
  const postUserData = async () => {
    console.log(Name)
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          mobile: mobile,
          cnic: cnic,
          dealerCode: dealerCode,
          status: isChecked,
          password: password,
        }), // The data to be sent in the request body
      };

      const response = await fetch("http://157.175.146.120:8000/register", config);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data posted successfully:", data);
      if (data) {
        navigation.replace('SignIn')
        return data;
      }
    } catch (error) {
      console.error("Error posting data:", error.message);
      throw error;
    }
  };

  return (

    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={{ flex: 1 }}

    >    <ScrollView>
        <View style={styles.Login_main_view}>
          <Image style={styles.logo} source={require('../../../Assets/Image/login_image.png')} resizeMode="contain" />
        </View>
        <View style={styles.Login_view}>

          <View style={{ width: "70%", alignSelf: "center" }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.Started}>Getting Started</Text>
              <Text style={styles.create_account}>Create an Account to Continue</Text>
            </View>

            <View style={nameError ? styles?.inputError : styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Name"
                value={Name}
                onChangeText={(text) => handleInputChange("name", text)}
                keyboardType="default" // This will display the regular alphabetic keyboard

              />
            </View>
            <View style={cnicError ? styles.inputError : styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="CNIC/Social Security"
                value={cnic}
                onChangeText={(text) => handleInputChange("cnic", text)}
                keyboardType={"numeric"}
              />
            </View>
            <View style={mobileNo ? styles?.inputError : styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Mobile No."
                value={mobile}
                onChangeText={(text) => handleInputChange("mobileNo", text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Dealer Code"
                value={dealerCode}
                onChangeText={(text) => setDealerCode(text)}
                keyboardType="default"
              />
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Address"
                value={Address}
                onChangeText={(text) => setAddress(text)}
                keyboardType="default"
              />
            </View>
            <View style={passwordError ? styles?.inputError : styles.container}>
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
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '300' }}>Password required Special key and length more than 7</Text>
          </View>
          <View
            style={styles.remember_view}
          >
            <TouchableOpacity
              style={styles.container1}
              onPress={handleCheckboxChange}
              activeOpacity={0.8}
            >
              <View style={styles.checkbox}>
                {isChecked ? (
                  <LinearGradient
                    colors={['rgb(39, 174, 229)', 'rgb(41,128,201)', 'rgb(50,107,194)', 'rgb(59,90,183)']}
                    style={styles.checkboxGradient}
                    start={{ x: 0, y: 0 }} // Start from the left side
                    end={{ x: 1, y: 0 }} // End at the right side
                  >
                    <Ionicons name="checkmark" size={24} color='white' borderColor="transparent" />
                  </LinearGradient>
                ) : (
                  <Ionicons name="checkbox-outline" size={24} color="white" />
                )}
              </View>
              <Text style={styles.label}>I Agree the Terms and Condition</Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            onPress={() => handleSignUp()}
            ContainerStyle={{
              paddingVertical: 15,
              justifyContent: "center",
              alignSelf: "center",
              width: "80%",
              borderRadius: 15
            }}
            textStyle={{ color: Colors.White, textAlign: "center", fontSize: 16, fontFamily: '200' }}
            title="Login"
          />
          <TouchableOpacity style={styles.signin} onPress={() => navigation.goBack()}>
            <Text style={styles.text}>Have an Account Already?</Text>
            <Text style={styles.text}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>

  );
};

export default SignUp;