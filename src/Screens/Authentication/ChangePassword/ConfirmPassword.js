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
  Platform,
} from "react-native";
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
const ConfirmPassword = () => {
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

  const handleCongratulation = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (

    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={{ flex: 1, backgroundColor: Colors.blueBackground }}

    >
      <ScrollView>
        <View style={[styles.Login_main_view, { paddingTop: Platform.OS === 'ios' ? 20 : 0 }]}>
          <Image style={styles.logo} source={require('../../../Assets/Image/login_image.png')} resizeMode="contain" />
        </View>
        <View style={styles.Container_view}>

          <View style={{ height: 150, paddingHorizontal: 10, justifyContent: 'center', alignSelf: 'center' }}>
            <Text style={styles.contact_text}>
              If anyassistance is required please contact to app coordinator</Text>
          </View>
          <CustomButton
            onPress={() => handleCongratulation()}
            ContainerStyle={{
              marginTop: 50,
              justifyContent: "center",
              alignSelf: "center",
              width: "80%",
              borderRadius: 15
            }}
            textStyle={{ color: Colors.text_Color, textAlign: "center", fontSize: 18, fontFamily: '200' }}
            title="Procced"
          />
        </View>
      </ScrollView>
    </ImageBackground>

  );
};

export default ConfirmPassword;