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
const Signin = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
    if (!mobile) {
      Alert.alert('Field Required', 'Please enter mobile number.');
      return;
    }
    else if (!password) {
      Alert.alert('Field Required', 'Please enter password.');
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
      const response = await fetch(`${API_BASE_URL}/login`, config);
      if (!response.ok) {
        setLoading(false);
        if (response?.status === 401) {
          Alert.alert(
            'Not Exist',
            'Account do not exist.',
          );
        } else {
          Alert.alert(
            'Error',
            'An error occurred while processing your request.',
          );
        }
        return;
      }
      const responseData = await response.json();
      if (responseData) {
        console.log('res:: ', responseData?.cnic);
        const Token = responseData?.token;
        const cnic = responseData?.cnic;
        await AsyncStorage.setItem('TOKEN', Token);
        await AsyncStorage.setItem('CNIC', cnic);
        setLoading(false);
        navigation.replace('Home');
      } else {
        setLoading(false);
        Alert.alert(
          'Invalid Password',
          'Please Enter your password and try again.',
        );
      }
    } catch (error) {
      setLoading(false);
      console.log('Error posting data:', error?.message);
      Alert.alert(
        'Network Error',
        'An error occurred while connecting to the server.',
      );
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
            <Image source={require('../../../Assets/Image/face.png')} style={{ height: 90, width: 90, resizeMode: 'contain' }} />
            <Icon
              style={styles.Unlock_Icon}
              name="finger-print-outline"
              size={70}
              color="black"
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
                marginLeft={20}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>
          <View style={styles.remember_view}>
            <TouchableOpacity
              style={styles.container1}
              onPress={handleCheckboxChange}
              activeOpacity={0.8}>
              <View style={styles.checkbox}>
                <Icon
                  name={isChecked ? 'checkbox-outline' : 'checkbox'}
                  size={24}
                  color={Colors.text_Color}
                />
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
