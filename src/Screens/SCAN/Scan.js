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
  Alert,
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
import { ActivityIndicator } from 'react-native';

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [barCode, setbarCode] = useState('');
  const [cnic, setCnic] = useState();

  useEffect(() => {
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem('USER'));
      setCnic(user?.cnic);
      // console.log('user23:: ', user?.cnic);
    })();
  }, [cnic,]);

  useEffect(() => {
    // console.log('user_cnic: ', cnic);
    const getBarCodeScannerPermissions = async () => {
      const { status } = await QRCodeScanner.requestCameraPermission();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const onSuccess = e => {
    console.log('sucess scan:: ', e?.data);
    setbarCode(e?.data);
    setScanned(true);
    handleSubmitForScan(e?.data);
    // if (e?.data?.length === 10) {
    // }
    setScanning(false);
    // if (e?.data?.length !== 10) {
    //   alert('Selected Batch code is not valid');
    // }
  };

  useEffect(() => {
    // if (barCode?.length >= 10) {
    //   handleSubmit();
    //   setScanning(false);
    // }
  }, [barCode]);

  const handleScanButtonPress = () => {
    setScanning(true);
  };

  const handleCloseButtonPress = () => {
    setScanning(false);
  };

  const handleSubmitForScan = async barCode => {
    const user = JSON.parse(await AsyncStorage.getItem('USER'));
    try {
      setLoading(true);
      console.log(barCode);
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: barCode,
          cnic: user?.cnic,
        }),
      };
      const response = await fetch(`${API_BASE_URL}/batchScan`, config);
      const data = await response.json();
      if (response.status === 201) {
        navigation.replace('Congratulation', { keyName: "scan", message: "Your batch code is sent successfully, We will notify in 24 hours" });
      } else if (response.status !== 201) {
        // if (
        //   data?.error ===
        //   'Invalid batch length. Batch character length must be 10'
        // ) {
        //   Alert.alert('Invalid Batch Code. Batch character length must be 10');
        // } else {
        //   console.log('Error:', data);
        //   
        // }
        Alert.alert(data?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log('Error posting data:', error);
      if (error.message === 'Network request failed') {
        Alert.alert("Please Check Your Internet Connection")
      }
      else {
        console.log('Error posting data: ', error);
        Alert.alert('An error occurred while connecting to the server.');
      }
    }
  };

  const handleSubmit = async () => {

    const user = JSON.parse(await AsyncStorage.getItem('USER'));
    try {
      setLoading(true);
      console.log(barCode);
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: barCode,
          cnic: user?.cnic,
        }),
      };
      const response = await fetch(`${API_BASE_URL}/batchScan`, config);
      const data = await response.json();
      console.log("esponse.status:: ", response.status);
      if (response.status === 201) {
        navigation.replace('Congratulation', { keyName: "scan", message: "Your batch code is sent successfully, We will notify in 24 hours" });
      } else if (response.status !== 201) {
        // if (
        //   data?.error ===
        //   'Invalid batch length. Batch character length must be 10'
        // ) {
        //   alert('Invalid Batch Code. Batch character length must be 10');
        // } else {
        //   console.log('Error: ', data);
        //  

        // }
        Alert.alert((JSON.stringify(data?.error)));
        setLoading(false);
      }
    } catch (error) {
      console.log('Error posting data:', error);
      if (error.message === 'Network request failed') {
        errorMessage = "Please Check Your Internet Connection"
      }
      else {
        console.log('Error posting data: ', error);
        errorMessage = 'An error occurred while connecting to the server.';
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
        <View style={{ paddingHorizontal: 10 }}>
          <Header />
          <BackButton navigation={navigation} />
        </View>

        {!scanning && (
          <View style={styles.Login_view}>

            <View style={styles.unlock_view}>
              <TextInput
                selectionColor={Colors.text_Color}
                value={barCode}
                onChangeText={text => {
                  let barCodeIS = text?.replaceAll(/\s/g, '');
                  setbarCode(barCodeIS);
                }}
                placeholder="Enter Code Manually"
                placeholderTextColor={Colors.text_Color}
                style={styles.manual_BatchCode}
              />


            </View>
            <CustomButton
              ContainerStyle={[styles.proceed_button, { alignSelf: 'center', marginTop: 0, marginBottom: 20 }]}
              textStyle={{
                fontSize: 15,
                color: Colors.text_Color,
                textAlign: 'center',
                fontWeight: 'bold',
              }}
              title={loading ? <ActivityIndicator color={Colors.text_Color} /> : 'Submit'}
              onPress={() => handleSubmit()}
              disabled={loading}
            />

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
                disabled={loading || barCode.length > 0}
                onPress={() => handleScanButtonPress(true)}
                ContainerStyle={styles.proceed_button}
                textStyle={styles.text}
                title={loading ? <ActivityIndicator color={Colors.text_Color} /> : "QR CODE"}

              />
              <CustomButton
                disabled={loading || barCode.length > 0}
                onPress={() => handleScanButtonPress(true)}
                ContainerStyle={styles.proceed_button}
                textStyle={styles.text}
                title={loading ? <ActivityIndicator color={Colors.text_Color} /> : "BARCODE"}
              />
            </View>
          </View>
        )}

        {scanned && scanning === true && (
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
