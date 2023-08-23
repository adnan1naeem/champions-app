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
import Ionicons from 'react-native-vector-icons/Ionicons'

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [barCode, setbarCode] = useState();
  const [dealerCode, setdelearCode] = useState();
  const [userId, setUserid] = useState('64cbac89e4f75de4acd3f4a3');
  const [userName, setUserName] = useState();
  const [cnic, setCnic] = useState();
  const [mobile, setMobile] = useState();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await QRCodeScanner.requestCameraPermission();
      const u_Id = await AsyncStorage.getItem('USERID');
      const u_Name = await AsyncStorage.getItem('USERNAME');
      const cnic = await AsyncStorage.getItem('CNIC');
      const mobile = await AsyncStorage.getItem('MOBILE');
      const d_Code = await AsyncStorage.getItem('DELEAR');
      setdelearCode(d_Code);
      setMobile(mobile);
      setCnic(cnic);
      setUserName(u_Name);
      setUserid(u_Id);
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    if (barCode?.length == 10) {
      navigation.navigate('Home');
    }
  }, [barCode, navigation]);

  const onSuccess = e => {
    setbarCode(e.data);
    setScanned(true);
    handleSubmit();
    //  setScanning(false);
  };

  const handleScanButtonPress = () => {
    if (barCode) {
      handleSubmit();
      // setScanning(false);
    } else {
      setScanning(true);
      setScanned(false);
    }
  };

  const handleCloseButtonPress = () => {
    setScanning(false);
    setScanned(false);
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
          name: userName,
          mobile: mobile,
          cnic: cnic,
          dealerCode: dealerCode,
          userId: userId,
        }),
      };
      const response = await fetch(
        'http://16.24.45.175:8000/batchScan',
        config,
      );
      const data = await response.json();
      if (response?.status === 201) {
        console.log('Responce:: ', response);
        alert('Batch Code Submit');
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
      alert(JSON.stringify(e));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.blueBackground }}>
      <ImageBackground
        source={require('../../Assets/Image/background_image.png')}
        style={styles.container}
        resizeMode="cover">

        <Header />
        <Ionicons
          name="chevron-back"
          size={25}
          style={{ paddingTop: 15, paddingLeft: 15 }}
          color={Colors.text_Color}
          onPress={() => navigation.goBack()}
        />
        {!scanning && (
          <View style={styles.Login_view}>
            <View style={styles.unlock_view}>

              <TextInput
                value={barCode}
                onChangeText={setbarCode}
                placeholder="Enter Code Manually"
                placeholderTextColor={Colors.text_Color}
                style={{ fontSize: 17, color: Colors.text_Color }}
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
                onPress={() => handleScanButtonPress(false)}
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
