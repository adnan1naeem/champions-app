import {
  Image,
  Text,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { Colors } from '../../../Utils/Colors';
import CustomButton from '../../../Components/CustomButton';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../../../../Constants';
import BackButton from '../../../Components/BackButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ForgetPassword = () => {
  // const [ref, setRef] = useState();
  const [mobile, setMobile] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const CnicInput = text => {
    const Id_Card_Number = text.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '');
    setMobile(Id_Card_Number);
  };

  const handleForgot = async () => {
    if (mobile?.length !== 13) {
      Alert.alert('Please enter valid cnic code');
      return;
    }
    setLoading(true);
    try {
      const data = {
        cnic: mobile,
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
        setLoading(false);
        if (response?.status === 404) {
          Alert.alert('User not Exist\nPlease check your CNIC and try again.');
          return;
        }
        Alert.alert('User not Exist\nPlease check your CNIC and try again.');
        return;
      }
      const responseData = await response.json();
      console.log('Login Response: ', response?.token);
      if (responseData) {
        setLoading(false);

        navigation.replace('PinCodeScreen', { cnic: mobile });
      } else {
        setLoading(false);
        Alert.alert(
          'Invalid Password',
          'Please check your password and try again.',
        );
      }
    } catch (error) {
      setLoading(false);
      console.log('Error posting data:', error?.message);
    }
  };

  // const onPressTouch = () => {
  //   ref?.scrollTo({
  //     x: 0,
  //     y: 250,
  //     animated: true,
  //   });
  // };
  const scrollViewRef = useRef(null);
  const inputRef = useRef(null);
  const scrollToInput = () => {
    // Scroll to the input field using the scrollViewRef
    scrollViewRef.current?.scrollToFocusedInput(inputRef.current);
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
          <Image
            style={[styles.logo, { marginTop: 15 }]}
            source={require('../../../Assets/Image/login_image.png')}
            resizeMode="contain"
          />

          <View style={{ marginHorizontal: 15 }}>
            <BackButton navigation={navigation} />
          </View>
          <View style={[styles.Login_view, { marginTop: '33%' }]}>
            <View style={styles.unlock_view}>
              <Text
                style={{
                  color: Colors.text_Color,
                  fontSize: 20,
                  fontWeight: 200,
                }}>
                Enter CNIC
              </Text>
            </View>
            <View style={{ width: '70%', alignSelf: 'center' }}>
              <View style={styles.container}>
                <TextInput
                  // ref={inputRef}
                  // onFocus={() => onPressTouch()}
                  selectionColor={Colors.text_Color}
                  style={styles.input}
                  placeholderTextColor={Colors.text_Color}
                  placeholder=""
                  marginLeft={20}
                  value={mobile}
                  onChangeText={text => CnicInput(text)}
                  keyboardType={'numeric'}
                  maxLength={13}
                />
              </View>
            </View>
            <CustomButton
              loading={loading}
              onPress={() => handleForgot()}
              ContainerStyle={{
                paddingVertical: 15,
                marginTop: 30,
                marginBottom: 30,
                justifyContent: 'center',
                alignSelf: 'center',
                height: 50,
                width: '80%',
                borderRadius: 15,
              }}
              textStyle={{
                color: Colors.text_Color,
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 300,
              }}
              title={
                loading ? (
                  <ActivityIndicator color={Colors.text_Color} />
                ) : (
                  'Send Pin'
                )
              }
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </ImageBackground >
  );
};

export default ForgetPassword;
