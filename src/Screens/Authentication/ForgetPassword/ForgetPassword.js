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
import React, { useState } from 'react';
import { Colors } from '../../../Utils/Colors';
import CustomButton from '../../../Components/CustomButton';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../../../../Constants';
import BackButton from '../../../Components/BackButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formatMobileNumber } from '../../../Components/MobileNumberFormat';

const ForgetPassword = () => {
  const [mobile, setMobile] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleForgot = async () => {
    setLoading(true);
    try {
      console.log("mobile:: ", mobile);
      const data = {
        mobile: mobile,
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
          Alert.alert('User not Exist\nPlease check your Mobile Number and try again.');
          return;
        }
        Alert.alert('User not Exist\nPlease check your Mobile Number and try again.');
        return;
      }
      const responseData = await response.json();
      console.log('Login Response: ', response?.token);
      if (responseData) {
        setLoading(false);

        navigation.replace('PinCodeScreen', { mobile: mobile });
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
                Enter Phone Number
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
                  value={formatMobileNumber(mobile)}
                  onChangeText={(text) => setMobile(text)}
                  keyboardType={'numeric'}
                // maxLength={13}
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