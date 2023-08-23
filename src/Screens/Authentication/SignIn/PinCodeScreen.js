import { Image, StyleSheet, Text, TouchableOpacity, ImageBackground, View, ScrollView, Alert, } from "react-native";
import React, { useState, useRef } from "react";
import { Colors } from "../../../Utils/Colors";
import orient_icon from '../../../Assets/Image/OrientNewLogo.png';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import { styles } from "./style";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../Components/CustomButton";
import OtpInput from '../OTP/OTP';
import BackButton from "../../../Components/BackButton";

const PinCodeScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setisModalVisible] = useState(false);

  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue("1234");
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={{ flex: 1 }}

    >
      <ScrollView>
 
            <View style={{marginTop:25,paddingHorizontal:20}}>
      <BackButton navigation={navigation}/>
      </View>
        <View style={styles.Login_main_view}>
          <Image style={styles.logo} source={require('../../../Assets/Image/login_image.png')} resizeMode="contain" />
        </View>
        <View style={styles.Login_view}>
          <View style={{ flex: 1, alignSelf: 'center', paddingVertical: 20 }}>
            <Text style={{ color: Colors.text_Color, fontSize: 20, fontWeight: '300' }}>33100-3217986-1</Text>
          </View>
          <View style={{ width: "78%", alignSelf: "center", marginVertical: 50 }}>
            <View>
              <Text style={{ marginTop: 20, alignSelf: 'center', fontSize: 20, color: Colors.text_Color, fontWeight: '200' }}>Enter your 5 digit Pin</Text>
              <OtpInput />
            </View>

          </View>

          <View
            style={styles.otp_not_received}>
            <Text style={styles.otp}>
              If you have not received PIN then please
              <TouchableOpacity style={{}}>
                <Text style={[styles.otp, { textDecorationLine: 'underline' }]}>
                  REGENERATE
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
          <CustomButton
            onPress={() => navigation.navigate('ChangePassword')}
            ContainerStyle={styles.proceed_button}
            textStyle={{ color: Colors.text_Color, textAlign: "center" }}
            title="Proceed"
          />

        </View>


      </ScrollView>
    </ImageBackground>
  );
};

export default PinCodeScreen;

