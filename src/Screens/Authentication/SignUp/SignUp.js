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
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { Colors } from '../../../Utils/Colors';
import CustomButton from '../../../Components/CustomButton';
import { styles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import BackButton from '../../../Components/BackButton';
import { API_BASE_URL } from '../../../../Constants';

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [mobileNo, setmobileNo] = useState(false);
  const [Name, setName] = useState('');
  const [cnic, setCnic] = useState('');
  const [mobile, setmobile] = useState('');
  const [dealerCode, setDealerCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const [selectedOption, setSelectedOption] = useState(null);
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
        setmobile(value);
        setmobileNo(false);
      } else {
        setmobileNo(true);
      }
    } else if (field === 'password') {
      setPassword(value);
    }
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const formatMobileNumber = number => {
    if (number?.startsWith('0')) {
      return '92' + number?.slice(1);
    }
    return number;
  };


  const handleSignUp = () => {
    if (!value) {
      Alert.alert('Please select a company.');
      return;
    } else if (!Name) {
      Alert.alert('Field Required', 'Please enter name.');
      return;
    } else if (!cnic) {
      Alert.alert('Field Required', 'Please enter cnic.');
      return;
    } else if (!mobile) {
      Alert.alert('Field Required', 'Please enter mobile.');
      return;
    } else if (!dealerCode) {
      Alert.alert('Field Required', 'Please enter dealerCode.');
      return;
    } else if (isChecked === false) {
      Alert.alert('Agree the terms and condition.');
      return;
    } else if (!password) {
      Alert.alert('Field Required', 'Please enter password.');
      return;
    } else if (dealerCode.length !== 7) {
      Alert.alert('Field Required', 'Please enter a 7-digit dealer code.');
      return;
    }

    setLoading(true); // Start loading indicator
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
          mobile: formattedMobile,
          dealerCode: dealerCode,
          password: password,
          companyCode: value,
          status: isChecked,
        }),
      };

      const response = await fetch(`${API_BASE_URL}/register`, config);
      setLoading(false); // Stop loading indicator

      if (!response.ok) {
        Alert.alert('Network Error', 'An error occurred while connecting to the server.');
      } else {
        const data = await response.json();
        console.log("12432eds:: ", data);
        if (response?.status === 201) {
          Alert.alert('Message', 'Your registration will be completed within 24 hours.', [
            {
              text: 'OK',
              onPress: () => {
                console.log('signup response:: ', response);

              },
            },
          ]);
        } else if (response?.status !== 201) {
          Alert.alert(data?.message);
        }
      }
    } catch (error) {
      setLoading(false); // Stop loading indicator
      Alert.alert('Error', 'An error occurred while processing your request. Please try again.');
      console.error('Error posting data: ', error?.message);
      throw error;
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Orient Electronics Pvt. Ltd', value: '1000' },
    // { label: 'Orient Material Pvt.Ltd', value: '2020' },
    // { label: 'Adnan Corporation', value: '3000' },
    // { label: 'Orient Apparel', value: '8080' },
  ]);

  return (
    <ImageBackground
      source={require('../../../Assets/Image/background_image.png')}
      style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
      <ScrollView>
        <View style={{ marginTop: 25, paddingHorizontal: 20 }}>
          <BackButton navigation={navigation} />
        </View>
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
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="Mobile No."
                value={mobile}
                onChangeText={text => handleInputChange('mobileNo', text)}
                keyboardType="numeric"
                maxLength={12}
              />
            </View>
            <View style={[styles.container, { zIndex: 1 }]}>
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
                containerStyle={{ width: 238, color: 'white', zIndex: 1 }}
                dropDownContainerStyle={{
                  backgroundColor: '#1A4578',
                  borderColor: 'transparent',
                  paddingVertical: 5,
                  zIndex: 999,
                }}
                TickIconComponent={() => (
                  <FontAwesome6 name="check" color={Colors.text_Color} />
                )}
                arrowIconStyle={{ tintColor: Colors.text_Color }}
              />
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="Dealer Code"
                value={dealerCode}
                onChangeText={(text) => setDealerCode(text)}
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="Password"
                value={password}
                onChangeText={text => handleInputChange('password', text)}
                keyboardType="default"
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
                  <Ionicons
                    name="checkbox-outline"
                    size={24}
                    color={Colors.text_Color}
                  />
                )}
              </View>
              <Text style={styles.label}>I Agree the Terms and Condition</Text>
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
            title={loading ? 'Loading...' : "Proceed"}
            disabled={loading}

          />
          <TouchableOpacity
            style={styles.signin}
            onPress={() => navigation.goBack()}>
            <Text style={styles.text}>Have an Account Already?</Text>
            <Text style={styles.text}> Sign In</Text>
          </TouchableOpacity>
        </View>
        {/* <Modal
          animationType="Fade"
          transparent={true}
          backdropColor='green'
          // backdropColor="red"
          visible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              backgroundColor: '#1A4578',
              width: '90%',
              paddingVertical: 15,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <FlatList
              data={options}
              renderItem={renderOptionItem}
              keyExtractor={item => item.value}
            />
          </View>

        </Modal> */}
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUp;
