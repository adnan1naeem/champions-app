import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Colors } from "../../../Utils/Colors";
import CustomButton from "../../../Components/CustomButton";
import orient_icon from '../../../Assets/Image/OrientNewLogo.png';
import { styles } from "./style";
import Icon from 'react-native-vector-icons/Ionicons';
import User_Icon from 'react-native-vector-icons/Zocial';
import Password from 'react-native-vector-icons/Fontisto'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Signin = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [mobile, setMobile] = useState(""); // Separate state for name
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const navigation = useNavigation();
  const handleSignIn = async () => {
    setLoading(true);
    // navigation.replace("Home")
    try {
      const data = {
        mobile: mobile,
        password: password,
      };

      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch("http://16.24.45.175:8000/login", config);
      if (!response.ok) {
        setLoading(false);
        alert("Invalid Password", "Please check your password and try again.");
        // throw new Error("Network response was not ok");
        return;
      }
      const responseData = await response.json();
      console.log("Login Response: ", responseData);
      if(responseData){
        const Token=responseData?.token
        const userId=responseData?.userId
        const user_name=responseData?.name
        const cnic=responseData?.cnic
        const mobile_no=responseData?.mobile
        const dealerCode=responseData?.dealerCode
        // const email=responseData?.email
        // await AsyncStorage.setItem("EMAIL",responseData?.email)
        await AsyncStorage.setItem("DELEAR",dealerCode)
        await AsyncStorage.setItem("TOKEN",Token)
        await AsyncStorage.setItem("USERID",userId)
        await AsyncStorage.setItem("USERNAME",user_name)
        await AsyncStorage.setItem("CNIC",cnic)
        await AsyncStorage.setItem("MOBILE",mobile_no)
        
      // await AsyncStorage.setItem("DELEARCODE",response?.dealerCode)
        setLoading(false)
        navigation.replace("Home");
      }else{
        setLoading(false);  
        Alert.alert("Invalid Password", "Please check your password and try again.");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error posting data:", error.message);
    }
  };
  return (

    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={{ flex: 1 }}

    ><ScrollView>
        <View style={styles.Login_main_view}>
          <Image style={styles.logo} source={require('../../../Assets/Image/login_image.png')} resizeMode="contain" />
        </View>
        <View style={styles.Login_view}>
          <View style={styles.unlock_view}>
            <Icon style={styles.Unlock_Icon} name="finger-print-outline" size={70} color="black" />
            <Icon style={styles.Unlock_Icon} name="finger-print-outline" size={70} color="black" />
          </View>
          <View style={{ width: "70%", alignSelf: "center" }}>
            <View style={styles.container}>
              <User_Icon
                name="email"
                style={styles.icon}
                size={15}

                color="white"
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Mobile No."
                marginLeft={20}
                value={mobile} // Set the value of the input field to name state
                onChangeText={setMobile} // Update the name state when the text changes
              />
            </View>
            <View style={styles.container}>
              <Password
                name="locked"
                style={styles.icon}
                size={15}
                color="white"
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Password"
                marginLeft={20}

                value={password} // Set the value of the input field to password state
                onChangeText={setPassword} // Update the password state when the text changes
                secureTextEntry

              />
            </View>
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
                  <Ionicons name="checkbox" size={24} color="white" />
                ) : (
                  <Ionicons name="checkbox-outline" size={24} color='#789FC4' />
                )}
              </View>
              <Text style={styles.label}>Remember me</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
              navigation.navigate("ForgetPassword")
            }}>
              <Text style={styles.forgotpassword}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            onPress={() => handleSignIn()}
            disabled={loading}
            ContainerStyle={{
              paddingVertical: 15,
              marginTop: 10,
              justifyContent: "center",
              alignSelf: "center",
              height: 50,
              width: "80%",
              borderRadius: 15,
              opacity: loading ? 0.7 : 1,
            }}
            textStyle={{ color: Colors.White, textAlign: "center", fontSize: 16, fontFamily: '200' }}
            title={loading ? "Loading..." : "Login"}
          />
          <CustomButton
            onPress={() => navigation.navigate('SignUp')}
            ContainerStyle={{
              paddingVertical: 15,
              marginTop: 10,
              justifyContent: "center",
              alignSelf: "center",
              height: 50,
              width: "80%",
              borderRadius: 15
            }}
            textStyle={{ color: Colors.White, textAlign: "center" }}
            title="SIGN UP"
          />

        </View>
      </ScrollView>
    </ImageBackground>

  );
};

export default Signin;