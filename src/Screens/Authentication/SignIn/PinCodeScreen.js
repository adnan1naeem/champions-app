import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Colors } from '../../../Utils/Colors';
import orient_icon from '../../../Assets/Image/OrientNewLogo.png';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import { styles } from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../Components/CustomButton';
import OtpInput from '../OTP/OTP';
import BackButton from '../../../Components/BackButton';
import { API_BASE_URL } from '../../../../Constants';

const PinCodeScreen = ({ route }) => {
  const navigation = useNavigation();
  const [varificationCode, setVarificationCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    if (isTimerRunning) {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer(prevTimer => prevTimer - 1);
        }, 1000);
        return () => clearInterval(interval);
      } else {
        setIsTimerRunning(false);
      }
    }
  }, [isTimerRunning, timer]);



  const handleForgot = async () => {
    setIsTimerRunning(true);
    setTimer(60);
    try {
      const data = {
        cnic: route?.params?.cnic,
      };

      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(`${API_BASE_URL}/forgetPassword`, config);
      if (!response?.ok) {
        if (response?.status === 404) {
          Alert.alert('User not Exist\nPlease check your CNIC and try again.');
          return;
        }
        Alert.alert('User not Exist\nPlease check your CNIC and try again.');
        // throw new Error("Network response was not ok");
        return;
      }
      const responseData = await response.json();
      console.log('Login Response: ', response?.token);
      if (responseData) {
        // navigation.replace('PinCodeScreen', { cnic: route?.params?.cnic });
      } else {
        Alert.alert(
          'Invalid Password',
          'Please check your password and try again.',
        );
      }
    } catch (error) {
      console.log('Error posting data:', error?.message);
    }
  };

  return (
    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
      <ScrollView>
        <View style={{ marginTop: 35, marginHorizontal: 15 }}>
          <BackButton navigation={navigation} />
        </View>
        <Image style={{
          height: 100,
          width: '80%',
          alignSelf: 'center',
          paddingTop: 5
        }} source={require('../../../Assets/Image/login_image.png')} resizeMode="contain" />
        <View style={[styles.Login_view, { marginTop: '33%' }]}>
          <View style={{ flex: 1, alignSelf: 'center', paddingVertical: 20 }}>
            <Text
              style={{
                color: Colors.text_Color,
                fontSize: 20,
                fontWeight: '300',
              }}>
              {route?.params?.cnic}
            </Text>
          </View>
          <View style={{ width: '78%', alignSelf: 'center', marginVertical: 50 }}>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  alignSelf: 'center',
                  fontSize: 20,
                  color: Colors.text_Color,
                  fontWeight: '200',
                }}>
                Enter your 5 digit Pin
              </Text>
              <OtpInput onPress={text => setVarificationCode(text)} />
            </View>
          </View>


          <View style={styles.otp_not_received}>
            {isTimerRunning && timer > 0 ? (
              <Text style={styles.otp}>
                If you have not received PIN then please REGENERATE After {timer} seconds
              </Text>
            ) : (
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 130,
                  alignSelf: 'center'
                }}
                onPress={() => handleForgot()}>
                <Text style={[styles.otp, { textDecorationLine: 'underline' }]}>
                  REGENERATE PIN
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <CustomButton
            onPress={() =>
              navigation.navigate('ChangePassword', {
                cnic: route?.params?.cnic,
                varificationCode: varificationCode,
              })
            }
            ContainerStyle={styles.proceed_button}
            textStyle={{ color: Colors.text_Color, textAlign: 'center' }}
            title="Proceed"
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default PinCodeScreen;
