import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../../Utils/Colors';
import CustomButton from '../../../Components/CustomButton';
import { styles } from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import User_Icon from 'react-native-vector-icons/Zocial';
import Password from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
const Signin = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const navigation = useNavigation();

  const formatMobileNumber = number => {
    if (number?.startsWith('0')) {
      return '92' + number.slice(1);
    }
    return number;
  };




  const handleSignIn = async () => {
    let errorMessage = null;

    if (!mobile) {
      errorMessage = 'Please enter mobile number.';
    } else if (!password) {
      errorMessage = 'Please enter password.';
    }
    if (errorMessage) {
      Alert.alert('Field Required', errorMessage);
      return;
    }

    setLoading(true);
    const formattedMobile = formatMobileNumber(mobile);

    try {
      const data = {
        mobile: formattedMobile,
        password: password,
      };

      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch('http://16.24.45.175:8000/login', config);
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
      console.log('Error posting data: ', error);
      errorMessage = 'An error occurred while connecting to the server.';
    }

    setLoading(false);
    if (errorMessage) {
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
      <ScrollView>
        <Image
          style={styles.logo}
          source={require('../../../Assets/Image/login_image.png')}
          resizeMode="contain"
        />
        <View style={styles.Login_view}>
          <View style={styles.unlock_view}>
            <Image
              source={require('../../../Assets/Image/face.png')}
              style={{
                height: 70,
                width: 68,
                resizeMode: 'contain',
                marginRight: 15,
              }}
            />
            <Ionicons
              style={styles.Unlock_Icon}
              name="finger-print-outline"
              size={70}
            />
          </View>
          <View style={{ width: '70%', alignSelf: 'center' }}>
            <View style={styles.container}>

              <User_Icon
                name="email"
                style={styles.icon}
                size={15}
                color={Colors.text_Color}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="Mobile No."
                marginLeft={20}
                value={mobile}
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
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="Password"
                autoCapitalize="none"
                marginLeft={20}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={isPasswordSecure}
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
                {isChecked ?
                  <LinearGradient
                    colors={[
                      'rgb(39, 174, 229)',
                      'rgb(41,128,201)',
                      'rgb(50,107,194)',
                      'rgb(59,90,183)',
                    ]}
                    style={styles.checkboxGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Ionicons
                      name="checkmark"
                      size={24}
                      color={Colors.text_Color}
                      borderColor="transparent"
                    />
                  </LinearGradient> :
                  <MaterialIcons name="check-box-outline-blank" size={24}
                    color={Colors.text_Color} />
                }
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
            title={loading ? 'Loading...' : 'Login'}
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
    </ImageBackground>
  );
};

export default Signin;
