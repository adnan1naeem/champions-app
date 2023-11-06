import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../../Utils/Colors';
import CustomButton from '../../../Components/CustomButton';
import { styles } from './style';
import Password from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { Bio_unLock } from '../BiometricLock';
import { formatMobileNumber } from '../../../Components/MobileNumberFormat';
import messaging from '@react-native-firebase/messaging';
import { request, PERMISSIONS, RESULTS } from '@react-native-permissions/permissions';
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';



const Signin = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [Internet, setInternet] = useState();
  const [deviceToken, setDeviceToken] = useState()
  const [inApp_Bio_Active, setinApp_Bio_Active] = useState(true)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const navigation = useNavigation();

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setInternet(state.isConnected);
    });
    const unsubscribe = NetInfo.addEventListener(state => { });
    unsubscribe();
  }, [Internet]);


  useEffect(() => {
    (async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log(authStatus);
      }
      const Token = await messaging().getToken();
      setDeviceToken(Token)
      console.log(Token);
    })();
  }, [])

  const handleSignIn = async () => {
    let errorMessage = null;
    if (!Internet) {
      errorMessage = 'Please Check Your Internet Connection!';
    } else if (!mobile) {
      errorMessage = 'Please enter mobile number.';
    } else if (!password) {
      errorMessage = 'Please enter password.';
    }
    if (errorMessage) {
      Alert.alert('Field Required', errorMessage);
      return;
    }
    setLoading(true);
    try {
      const data = {
        mobile: mobile.replace(/ /g, ''),
        password: password,
        deviceToken: deviceToken
      };

      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`${API_BASE_URL}/login`, config);
      if (!response.ok) {
        setLoading(false);
        if (response?.status === 401) {
          const responseData = await response?.json();
          errorMessage = responseData?.message || responseData?.error;
        }
      } else {
        const responseData = await response?.json();
        if (responseData) {
          const cnic = responseData?.cnic;
          console.log(responseData);
          await AsyncStorage.setItem('USER', JSON.stringify(responseData));
          navigation.replace('Home');
        } else {
          errorMessage = 'Invalid Password';
        }
      }
    } catch (error) {
      if (error.message === 'Network request failed') {
        errorMessage = 'Network request failed';
      } else {
        console.log('Error posting data: ', error);
        errorMessage = 'An error occurred while connecting to the server.';
      }
    }
    setLoading(false);
    if (errorMessage) {
      Alert.alert('Error', errorMessage);
    }
  };

  useEffect(() => {
    (async () => {
      const status_Bio = await AsyncStorage.getItem("BIOMETRIC");
      console.log("active:: ", status_Bio);
      if (status_Bio == 'true' || status_Bio == null) {
        setinApp_Bio_Active(false);
        Bio_unLock(navigation, Platform.OS === 'ios' ? "FaceID" : "Biometrics", "default");
      }
    })();
  }, []);


  return (
    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={{ flex: 1, backgroundColor: Colors.backgroundColor, paddingTop: 10 }}>
      <KeyboardAwareScrollView
        extraHeight={Platform.OS === 'ios' ? 90 : 130}
        extraScrollHeight={Platform.OS === 'ios' ? 90 : 130}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={'always'}>
          <Image
            style={styles.logo}
            source={require('../../../Assets/Image/login_image.png')}
            resizeMode="contain"
          />
          <View style={styles.Login_view}>
            <View style={styles.unlock_view}>
              <TouchableOpacity disabled={inApp_Bio_Active} onPress={() => Bio_unLock(navigation, "FaceID")}>
                <Image
                  source={require('../../../Assets/Image/face.png')}
                  style={{
                    height: 70,
                    width: 68,
                    resizeMode: 'contain',
                    marginRight: 15,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity disabled={inApp_Bio_Active} onPress={() => Bio_unLock(navigation, "Biometrics")}>
                <Icon
                  style={styles.Unlock_Icon}
                  name="finger-print-outline"
                  size={70}
                  color="black"
                />
              </TouchableOpacity>

            </View>
            <View style={{ width: '70%', alignSelf: 'center' }}>
              <View style={styles.container}>
                <Ionicons
                  name="call-outline"
                  size={15}
                  color={Colors.text_Color}
                />
                <TextInput
                  selectionColor={Colors.text_Color}
                  style={styles.input}
                  placeholderTextColor={Colors.text_Color}
                  placeholder="Mobile No."
                  marginLeft={20}
                  value={formatMobileNumber(mobile)}
                  onChangeText={setMobile}
                  keyboardType={'phone-pad'}
                />
              </View>
              <View style={styles.container}>
                <Password
                  name="locked"
                  style={styles.icon}
                  size={15}
                  color={Colors.text_Color}
                />
                <TextInput
                  selectionColor={Colors.text_Color}
                  style={styles.input}
                  placeholderTextColor={Colors.text_Color}
                  placeholder="Password"
                  autoCapitalize="none"
                  marginLeft={20}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={isPasswordSecure}
                  onSubmitEditing={() => handleSignIn()}
                />
                <MaterialIcons
                  onPress={() => setIsPasswordSecure(!isPasswordSecure)}
                  name={isPasswordSecure ? 'visibility' : 'visibility-off'}
                  size={20}
                  color={'#D0D3E2'}
                  style={{ paddingTop: 16 }}
                />
              </View>
            </View>
            <View style={styles.remember_view}>
              <TouchableOpacity
                style={styles.container1}
                onPress={handleCheckboxChange}
                activeOpacity={0.8}>
                <View style={styles.checkbox}>
                  {isChecked ? (
                    <LinearGradient
                      colors={Colors.gradient_color_Pair}
                      style={styles.checkboxGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <Ionicons
                        name="checkmark"
                        size={24}
                        color={Colors.text_Color}
                        borderColor="transparent"
                      />
                    </LinearGradient>
                  ) : (
                    <MaterialIcons
                      name="check-box-outline-blank"
                      size={24}
                      color={Colors.text_Color}
                    />
                  )}
                </View>

                <Text style={styles.label}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgetPassword');
                }}>
                <Text style={styles.forgotpassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              onPress={() => handleSignIn()}
              disabled={loading}
              ContainerStyle={{
                paddingVertical: 15,
                marginTop: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                height: 50,
                width: '80%',
                borderRadius: 15,
                opacity: loading ? 0.7 : 1,
              }}
              textStyle={{
                color: Colors.text_Color,
                textAlign: 'center',
                fontSize: 16,
                fontFamily: '200',
              }}
              title={
                loading ? (
                  <ActivityIndicator color={Colors.text_Color} />
                ) : (
                  'Login'
                )
              }
            />
            <CustomButton
              onPress={() => navigation.navigate('SignUp')}
              ContainerStyle={{
                paddingVertical: 15,
                marginTop: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                height: 50,
                width: '80%',
                borderRadius: 15,
              }}
              textStyle={{ color: Colors.text_Color, textAlign: 'center' }}
              title="SIGN UP"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default Signin;


