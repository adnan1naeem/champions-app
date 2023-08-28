import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { Colors } from '../../../Utils/Colors';
import CustomButton from '../../../Components/CustomButton';
import { styles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
// import axios from "axios";
import Entypo from 'react-native-vector-icons/Entypo';
import BackButton from '../../../Components/BackButton';
import { API_BASE_URL } from '../../../../Constants';

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [mobileNo, setmobileNo] = useState(false);
  const [Name, setName] = useState('');
  const [cnic, setCnic] = useState('');
  const [mobile, setmobile] = useState('');
  const [dealerCode, setDealerCode] = useState('');
  const [Address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
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
      setCnic(formattedCnic);
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

  const handleSignUp = () => {
    if (
      Name &&
      cnic &&
      mobile &&
      password &&
      isChecked === true &&
      dealerCode &&
      selectedOption
    ) {
      postUserData();
    } else {
      alert('There is incomplete data');
    }
  };

  const postUserData = async () => {
    const formattedPassword = password.toLowerCase();
    try {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: Name,
          cnic: cnic,
          mobile: mobile,
          dealerCode: dealerCode,
          password: formattedPassword,
          companyCode: selectedOption,
          status: isChecked,
        }),
      };

      const response = await fetch(`${API_BASE_URL}/register`, config);
      const data = await response.json();
      if (response?.status === 201) {
        console.log('signup responce:: ', response);
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      } else if (response?.status !== 201) {
        alert(data?.message);
      }
    } catch (error) {
      console.error('Error posting data:', error.message);
      throw error;
    }
  };


  const options = [
    { label: 'Orient Electronics Pvt. Ltd', value: '1000' },
    { label: 'Orient Material Pvt.Ltd', value: '2020' },
    { label: 'Adnan Corporation', value: '3000' },
    { label: 'Orient Apparel', value: '8080' },
  ];

  const renderOptionItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedOption(item.value);
        setModalVisible(false);
      }}
      style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  );

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
                Create an Account to Continue!
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
              />
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="Dealer Code"
                value={dealerCode}
                onChangeText={text => setDealerCode(text)}
                keyboardType="default"
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
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.dropdownContainer}>
                <Text style={styles.optionText}>
                  {selectedOption ? selectedOption : 'Company Name'}
                </Text>
                <Entypo
                  name={isModalVisible ? 'chevron-up' : 'chevron-down'}
                  style={{ color: Colors.text_Color, fontSize: 20 }}
                />
              </TouchableOpacity>
            </View>
            <Modal
              animationType="Fade"
              transparent={true}
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
            </Modal>
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
            title="Proceed"
          />
          <TouchableOpacity
            style={styles.signin}
            onPress={() => navigation.goBack()}>
            <Text style={styles.text}>Have an Account Already?</Text>
            <Text style={styles.text}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUp;
