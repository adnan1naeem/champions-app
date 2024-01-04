import {
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../../Utils/Colors';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../Components/CustomButton';
import OtpInput from '../OTP/OTP';
import BackButton from '../../../Components/BackButton';
import { API_BASE_URL } from '../../../../Constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from './../../../Utils/axiosConfig';

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
      let data = JSON.stringify({
        mobile: route?.params?.mobile,
      });
      let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/forgetPassword`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          if (response?.status === 200) {

          } else {
            Alert.alert(
              'Invalid Password',
              'Please check your password and try again.',
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.log('Error posting data:', error?.message);
    }
  };

  const verifyOTP = async () => {
    try {
      if (varificationCode?.length !== 5) {
        Alert.alert("Please Enter 5 digit ", "verification code");
        return;
      }
      let data = JSON.stringify({
        code: varificationCode,
      });
      let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/forgetPassword`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          if (response?.status === 200) {

          } else {
            Alert.alert(
              'Invalid Password',
              'Please check your password and try again.',
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.log('Error posting data:', error?.message);
    }
  };

  return (
    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
      <KeyboardAwareScrollView
        extraHeight={Platform.OS === 'ios' ? 90 : 130}
        extraScrollHeight={Platform.OS === 'ios' ? 90 : 130}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={'always'}
        >
          <Image style={{
            height: 100,
            width: '80%',
            alignSelf: 'center',
            paddingTop: 5,
            marginTop: 35,
          }} source={require('../../../Assets/Image/login_image.png')} resizeMode="contain" />
          <View style={{ marginHorizontal: 15 }}>
            <BackButton navigation={navigation} />
          </View>
          <View style={[styles.Login_view, { marginTop: '33%' }]}>
            <View style={{ flex: 1, alignSelf: 'center', paddingVertical: 20 }}>
              <Text
                style={{
                  color: Colors.text_Color,
                  fontSize: 20,
                  fontWeight: '300',
                }}>
                {route?.params?.mobile}
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
              onPress={() => {
                if (varificationCode?.length !== 5) {
                  Alert.alert("Please enter 5 digit", "verification code");
                  return;
                }
                navigation.navigate('ChangePassword', {
                  mobile: route?.params?.mobile,
                  varificationCode: varificationCode,
                })
              }
              }
              ContainerStyle={styles.proceed_button}
              textStyle={{ color: Colors.text_Color, textAlign: 'center' }}
              title="Proceed"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
export default PinCodeScreen;