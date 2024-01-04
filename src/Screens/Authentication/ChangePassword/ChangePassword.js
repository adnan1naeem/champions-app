import {
  Image,
  Text,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../Utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomButton from '../../../Components/CustomButton';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../../Components/BackButton';
import { API_BASE_URL } from '../../../../Constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formatMobileNumber } from '../../../Components/MobileNumberFormat';
import axios from './../../../Utils/axiosConfig';

const ChangePassword = ({ route }) => {
  const [password, setPassword] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    setLoading(true);
    setEmptyField(false);
    if (route?.params?.mobile === '' || password === '' || confirmPassword === '') {
      setLoading(false);
      setEmptyField(true);
      return
    }
    if (password !== confirmPassword) {
      setLoading(false);
      setIncorrectPassword(true);
      return;
    }
    setIncorrectPassword(false);

    try {
      let data = JSON.stringify({
        mobile: route?.params?.mobile,
        newPassword: password,
        reEnterPassword: confirmPassword,
        verificationCode: route?.params?.varificationCode?.toString(),
      });
      let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/resetPassword`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data
      };
      
      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response, null,2));
          if (response?.status === 200) {
            setLoading(false);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Congratulation', params: { message: "Congratulations your password has been changed successfully" } }],
            });
          } else if (response?.status !== 200) {
            setLoading(false);
            Alert.alert(response?.data?.message || response?.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          if(error?.response?.status === 401){
            Alert.alert(error?.response?.data?.message);
            navigation.pop();
          }
        });
    } catch (error) {
      setLoading(fasle);
      console.error('Error posting data:' + error?.message);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'password') {
      setPassword(value);
    } else if (field === 'confirmPassword') {
      setConfirmPassword(value);
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
          <View style={[styles.Login_main_view, { marginTop: 35, }]}>
            <Image
              style={{
                height: 100,
                width: '80%',
                alignSelf: 'center',
                paddingTop: 5
              }}
              source={require('../../../Assets/Image/login_image.png')}
              resizeMode="contain"
            />
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <BackButton navigation={navigation} />
          </View>
          <View style={[styles.Login_view, { marginTop: '33%' }]}>
            <View style={{ width: '70%', alignSelf: 'center' }}>
              <View style={styles.container}>
                <TextInput
                  selectionColor={Colors.text_Color}
                  editable={false}
                  style={styles.input}
                  placeholderTextColor={Colors.text_Color}
                  placeholder="Mobile/Social Security"
                  value={formatMobileNumber(route?.params?.mobile?.toString())}
                  onChangeText={text => handleInputChange('mobile', text)}
                  keyboardType={'numeric'}
                />
              </View>
              <View style={styles.container}>
                <TextInput
                  selectionColor={Colors.text_Color}
                  style={styles.input}
                  autoCapitalize='none'
                  placeholderTextColor={Colors.text_Color}
                  placeholder="Enter Password"
                  value={password}
                  onChangeText={text => handleInputChange('password', text)}
                  keyboardType="default"
                  secureTextEntry={isPasswordSecure}
                />
                <MaterialIcons onPress={() => setIsPasswordSecure(!isPasswordSecure)} name={isPasswordSecure ? 'visibility' : 'visibility-off'} size={20} color={"#D0D3E2"} style={{ paddingTop: 16 }} />
              </View>
              <View style={styles.container}>
                <TextInput
                  selectionColor={Colors.text_Color}
                  style={styles.input}
                  placeholderTextColor={Colors.text_Color}
                  placeholder="Re-enter New Password"
                  autoCapitalize='none'
                  value={confirmPassword}
                  onChangeText={text => setConfirmPassword(text)}
                  keyboardType="default"
                  secureTextEntry={isConfirmPasswordSecure}
                />
                <MaterialIcons onPress={() => setIsConfirmPasswordSecure(!isConfirmPasswordSecure)} name={isConfirmPasswordSecure ? 'visibility' : 'visibility-off'} size={20} color={"#D0D3E2"} style={{ paddingTop: 16 }} />
              </View>
              {incorrectPassword ? (
                <Text style={{ color: 'red' }}>Password is Incorrect</Text>
              ) : null}
              {emptyField ? (
                <Text style={{ color: 'red' }}>Field should not be Empty</Text>
              ) : null}
            </View>
            <CustomButton
              onPress={() => handleSignUp()}
              disabled={loading}
              ContainerStyle={{
                marginTop: 50,
                justifyContent: 'center',
                alignSelf: 'center',
                width: '80%',
                borderRadius: 15,
                opacity: loading ? 0.7 : 1,
              }}
              loading={loading}
              textStyle={{
                color: Colors.text_Color,
                textAlign: 'center',
                fontSize: 18,
                fontFamily: '200',
              }}
              title={loading ? <ActivityIndicator color={Colors.text_Color} /> : 'Proceed'}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
export default ChangePassword;