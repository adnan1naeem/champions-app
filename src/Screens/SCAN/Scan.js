import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  View,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Header from '../../Components/Header/Header';
import CustomButton from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { Colors } from '../../Utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../../Components/BackButton';
import { API_BASE_URL } from '../../../Constants';
import { all } from 'axios';

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [barCode, setbarCode] = useState();
  const [cnic, setCnic] = useState();
  const [mobile, setMobile] = useState();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await QRCodeScanner.requestCameraPermission();
      const cnic = await AsyncStorage.getItem('CNIC');
      setMobile(mobile);
      setCnic(cnic);
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const onSuccess = e => {
    setbarCode(e.data);
    setScanned(true);
    handleSubmit();
    setScanning(false);
  };

  const handleScanButtonPress = () => {
    if (barCode) {
      handleSubmit();
      setScanning(false);
    } else {
      setScanning(true);
    }
  };

  const handleCloseButtonPress = () => {
    setScanning(false);
  };

  const handleSubmit = async () => {
    try {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          code: barCode,
          cnic: '1111111111111',
        }),
      };
      const response = await fetch(`${API_BASE_URL}/batchScan`, config);
      const data = await response.json();
      if (response?.status === 201) {
        console.log('Responce:: ', response);
        alert('Batch Code Submit');
        navigation.navigate('Home');
      } else if (response?.status !== 201) {
        if (
          data?.error ===
          'Invalid batch length. Batch character length must be 10'
        ) {
          alert('Invalid Batch Code. Batch character length must be 10');
        } else {
          console.log('error: ', data);
        }
      }
    } catch (e) {
      if (e.message.includes('Network request failed')) {
        alert('Please check your internet connection');
      } else {
        console.log('Other error:', e);
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.blueBackground,
      }}>
      <ImageBackground
        source={require('../../Assets/Image/background_image.png')}
        style={styles.container}
        resizeMode="cover">
        <View style={{ paddingHorizontal: 15 }}>
          <Header />
          <BackButton navigation={navigation} />
        </View>

        {!scanning && (
          <View style={styles.Login_view}>
            <View style={styles.unlock_view}>
              <TextInput
                value={barCode}
                onChangeText={setbarCode}
                placeholder="Enter Code Manually"
                placeholderTextColor={Colors.text_Color}
                style={{ paddingHorizontal: 10, fontSize: 17, color: Colors.text_Color }}
              />
            </View>

            <View style={styles.scanner_view}>
              <View style={styles.InerView}>
                <Image
                  source={require('../../Assets/Image/QR_code.png')}
                  style={{
                    height: 90,
                    width: 90,
                    backgroundColor: Colors.text_Color,
                  }}
                />
                <Image
                  source={require('../../Assets/Image/barcode.jpg')}
                  style={{
                    height: 90,
                    width: 125,
                    backgroundColor: Colors.text_Color,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <CustomButton
                onPress={() => handleScanButtonPress(true)}
                ContainerStyle={styles.proceed_button}
                textStyle={styles.text}
                title="QR CODE"
              />
              <CustomButton
                onPress={() => handleScanButtonPress(true)}
                ContainerStyle={styles.proceed_button}
                textStyle={styles.text}
                title="BARCODE"
              />
            </View>
          </View>
        )}

        {scanned && (
          <View style={styles.buttonContainer}>
            <Button
              title="Tap to Scan Again"
              onPress={() => setScanned(false)}
              color="blue"
            />
          </View>
        )}
        {scanning && (
          <View style={styles.scannerContainer}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                marginTop: 25,
                zIndex: 1,
                alignSelf: 'flex-end',
              }}
              onPress={handleCloseButtonPress}>
              <Entypo
                name="circle-with-cross"
                style={{ color: Colors.text_Color, fontSize: 30 }}
              />
            </TouchableOpacity>
            <QRCodeScanner onRead={onSuccess} />
          </View>
        )}
      </ImageBackground>
    </ScrollView>
  );
};

export default Scan;
