import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../../Utils/Colors';
import CustomButton from '../../../Components/CustomButton';
import { styles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { API_BASE_URL } from '../../../../Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formatMobileNumber } from '../../../Components/MobileNumberFormat';
import messaging from '@react-native-firebase/messaging';


const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [mobileNo, setmobileNo] = useState(false);
  const [Name, setName] = useState('');
  const [cnic, setCnic] = useState('');
  const [mobile, setmobile] = useState('');
  const [dealerCode, setDealerCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [Internet, setInternet] = useState();
  const [deviceToken, setDeviceToken] = useState()


  const navigation = useNavigation();

  const [nameError, setNameError] = useState(false);
  const formatCnic = input => {
    const numericInput = input.replace(/[^\d]/g, '');
    let formattedCnic = '';
    for (let i = 0; i < numericInput.length; i++) {
      if (i === 5 || i === 12) {
        formattedCnic += '-';
      }
      formattedCnic += numericInput[i];
    }
    return formattedCnic;
  };

  const handleInputChange = (field, value) => {
    if (field === 'name') {
      const alphabeticRegex = /^[a-zA-Z\s]*$/;
      if (alphabeticRegex.test(value) || value === '') {
        setName(value);
        setNameError(false);
      } else {
        setNameError(true);
      }
    } else if (field === 'cnic') {
      const formattedCnic = formatCnic(value);
      setCnic(value);
    } else if (field === 'mobileNo') {
      const numericRegex = /^[0-9]*$/;
      if (numericRegex.test(value)) {
        const formattedNumber = formatMobileNumber(value);
        setmobile(formattedNumber);
        setmobileNo(false);
      } else {
        setmobile(value);
        setmobileNo(true);
      }
    } else if (field === 'password') {
      setPassword(value);
    }
  };
  console.log("signup: ", deviceToken);



  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setInternet(state.isConnected);
    });
    const unsubscribe = NetInfo.addEventListener(state => { });
    unsubscribe();
  }, []);
  useEffect(() => {
    (async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
      const Token = await messaging().getToken();
      console.log("Token12:: ", Token);
      setDeviceToken(Token)
    })();
  }, [])

  const handleSignUp = () => {
    if (!Internet) {
      Alert.alert('Please Check Your Internet Connection!.');
      return;
    } else if (!Name) {
      Alert.alert('Please enter name.');
      return;
    } else if (!cnic) {
      Alert.alert('Please enter cnic.');
      return;
    } else if (cnic.length < 13) {
      Alert.alert('Please enter valid cnic.');
      return;
    } else if (!mobile) {
      Alert.alert('Please enter mobile.');
      return;
    } else if (mobile?.length < 11) {
      Alert.alert('Please enter valid mobile number.');
      return;
    }
    else if (!mobile.startsWith('92 3') && !mobile.startsWith('03')) {
      Alert.alert("Please enter valid mobile number.")
      return
    }
    else if (!dealerCode) {
      Alert.alert('Please enter dealerCode.');
      return;
    } else if (!password) {
      Alert.alert('Please enter password.');
      return;
    } else if (dealerCode.length !== 7) {
      Alert.alert('Please enter a 7-digit dealer code.');
      return;
    } else if (!value) {
      Alert.alert('Please select a company.');
      return;
    }

    setLoading(true);
    postUserData();
  };

  const postUserData = async () => {
    const formattedMobile = formatMobileNumber(mobile);
    try {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: Name,
          cnic: cnic,
          mobile: mobile.replace(/ /g, ''),
          dealerCode: dealerCode,
          password: password,
          companyCode: value,
          deviceToken: deviceToken
        }),
      };

      const response = await fetch(`${API_BASE_URL}/register`, config);
      setLoading(false);

      if (!response.ok) {
        if (response?.status === 421 || response?.status === 403) {
          const data = await response.json();
          Alert.alert(data?.message);
          return;
        }
        Alert.alert(
          'Network Error!',
          'Unable to connect to server, \n Please try again later',
        );
      } else {
        const data = await response.json();
        if (response?.status === 201) {
          navigation.replace('Congratulation', {
            message:
              'Your registration will be completed within next 24 hours.',
          });
        }
        if (response?.status === 421 || response?.status === 403) {
          Alert.alert(data?.message);
          return;
        }
      }
    } catch (error) {
      if (error.message === 'Network request failed') {
        Alert.alert('Please Check Your Internet Connection');
        setLoading(false);
      } else {
        console.log('Error posting data: ', error);
        Alert.alert(
          'Error',
          'An error occurred while processing your request. Please try again.',
        );
        setLoading(false);
      }
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Orient Electronics Pvt. Ltd', value: '1000' },
  ]);

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
            <View style={{ width: '70%', alignSelf: 'center' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.Started}>Getting Started</Text>
                <Text style={styles.create_account}>
                  Create an account to continue!
                </Text>
              </View>

              <View style={nameError ? styles?.inputError : styles.container}>
                <TextInput
                  selectionColor={Colors.text_Color}
                  style={styles.input}
                  placeholderTextColor={Colors.text_Color}
                  placeholder="Name"
                  value={Name}
                  onChangeText={text => handleInputChange('name', text)}
                  keyboardType="default"
                />
              </View>
              <View style={styles.container}>
                <TextInput
                  selectionColor={Colors.text_Color}
                  style={styles.input}
                  placeholderTextColor={Colors.text_Color}
                  placeholder="CNIC/Social Security"
                  value={cnic}
                  onChangeText={text => handleInputChange('cnic', text)}
                  keyboardType={'numeric'}
                  maxLength={13}
                />
              </View>
              <View style={mobileNo ? styles?.inputError : styles.container}>
                <TextInput
                  selectionColor={Colors.text_Color}
                  style={styles.input}
                  placeholderTextColor={Colors.text_Color}
                  placeholder="Mobile No."
                  value={mobile}
                  onChangeText={text => handleInputChange('mobileNo', text)}
                  keyboardType="numeric"
                // maxLength={12}
                />
              </View>
              <View style={styles.container}>
                <TextInput
                  selectionColor={Colors.text_Color}
                  style={styles.input}
                  placeholderTextColor={Colors.text_Color}
                  placeholder="Dealer Code"
                  value={dealerCode}
                  onChangeText={text => setDealerCode(text)}
                  keyboardType="numeric"
                  maxLength={7}
                />
              </View>
              <View style={styles.container}>
                <TextInput
                  selectionColor={Colors.text_Color}
                  style={styles.input}
                  placeholderTextColor={Colors.text_Color}
                  placeholder="Password"
                  value={password}
                  onChangeText={text => handleInputChange('password', text)}
                  keyboardType="default"
                  secureTextEntry
                />
              </View>
              <View style={styles.container}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder="Select company"
                  autoScroll={true}
                  textStyle={{ color: Colors.text_Color, fontSize: 12 }}
                  style={[
                    { color: Colors.text_Color, borderColor: 'transparent' },
                    { backgroundColor: open ? '#1A4578' : 'transparent' },
                  ]}
                  containerStyle={{ width: '110%', marginLeft: -10 }}
                  dropDownContainerStyle={{
                    backgroundColor: '#1A4578',
                    borderColor: 'transparent',
                    paddingVertical: 5,
                  }}
                  TickIconComponent={() => (
                    <FontAwesome6 name="check" color={Colors.text_Color} />
                  )}
                  arrowIconStyle={{ tintColor: Colors.text_Color }}
                />
              </View>
            </View>
            <View style={[styles.remember_view]}>
              <TouchableOpacity
                style={styles.container1}
                onPress={handleCheckboxChange}
                activeOpacity={0.8}>
                <View style={styles.checkbox}>
                  {isChecked ? (
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
                    </LinearGradient>
                  ) : (
                    <MaterialIcons
                      name="check-box-outline-blank"
                      color={Colors.text_Color}
                      size={24}
                    />
                  )}
                </View>
                <Text style={styles.label}>
                  I Agree the Terms and Conditions
                </Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              onPress={() => handleSignUp()}
              ContainerStyle={{
                paddingVertical: 15,
                justifyContent: 'center',
                alignSelf: 'center',
                width: '80%',
                borderRadius: 15,
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
                  'Proceed'
                )
              }
              disabled={loading}
            />
            <TouchableOpacity
              style={styles.signin}
              onPress={() => navigation.goBack()}>
              <Text style={styles.text}>Have an Account Already?</Text>
              <Text style={styles.text}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default SignUp;
