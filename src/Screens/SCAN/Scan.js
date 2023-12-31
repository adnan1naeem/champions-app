import React, { useState } from 'react';
import {
  Button,
  View,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Header from '../../Components/Header/Header';
import CustomButton from '../../Components/CustomButton';
import { styles } from './styles';
import { Colors } from '../../Utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import BackButton from '../../Components/BackButton';
import { API_BASE_URL } from '../../../Constants';
import { ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from './../../Utils/axiosConfig'

const Scan = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [barCode, setbarCode] = useState('');


  const onSuccess = (e) => {
    setScanning(false);
    setScanned(false);
    setbarCode(e?.data);
  };

  const handleSubmitForScan = async () => {
    if (!barCode) {
      Alert.alert('Please Enter BatchCode!')
      return
    }

    setLoading(true);
    let config = {
      method: 'post',
      url: `${API_BASE_URL}/batchScan`,
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: JSON.stringify({
        code: barCode,
      }),
    };

    try {
      axios.request(config)
      .then((response) => {
        if (response.status === 201) {
          navigation.replace('Congratulation', { keyName: "scan", message: "Your batch code is sent successfully, We will notify in 24 hours" });
          setLoading(false);
        } else if (response.status !== 201) {
          if (data?.error === 'Server Timeout') {
            Alert.alert("SAP Server Timeout");
            setLoading(false);
          } else {
            Alert.alert(JSON.stringify(data?.message));
            setLoading(false);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    } catch (error) {
      if (error.message === 'Network request failed') {
        Alert.alert("Please Try again later")
        setLoading(false);
      }
      else {
        console.log('Error posting data: ', error);
        Alert.alert('An error occurred while connecting to the server.');
        setLoading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    if (barCode?.length > 0) {
      Alert.alert(
        'Batch code alert!',
        `Do you want to continue with ${barCode} ?`,
        [
          {
            text: 'Cancel',
            onPress: () => setScanning(false),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => handleSubmitForScan() },
        ],
        { cancelable: true }
      );
    }
    else {
      Alert.alert("Please Enter Batch Code")
    }
  };

  barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach(barcode => console.log(barcode.data))
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
          <BackButton disabled={loading} navigation={navigation} />
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
              textStyle={styles.submitButton}
              title={loading ? <ActivityIndicator color={Colors.text_Color} /> : barCode?.length <= 0 ? 'Enter Code' : 'Submit'}
              onPress={() => handleSubmit()}
              // onPress={() => Manul_Batch(e)}
              disabled={barCode?.length <= 0 || loading}
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
                disabled={loading || barCode?.length > 0}
                onPress={() => setScanning(true)}
                ContainerStyle={styles.proceed_button}
                textStyle={styles.text}
                title={loading ? <ActivityIndicator color={Colors.text_Color} /> : "QR CODE"}

              />
              <CustomButton
                disabled={loading || barCode?.length > 0}
                onPress={() => setScanning(true)}
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
              onPress={() => setScanning(false)}>
              <Entypo
                name="circle-with-cross"
                style={{ color: Colors.text_Color, fontSize: 30 }}
              />
            </TouchableOpacity>

            {Platform.OS === 'ios' ?
              <RNCamera
                ref={ref => { }}
                onBarCodeRead={onSuccess}
                onGoogleVisionBarcodesDetected={barcodeRecognized}
                style={{
                  width: "100%",
                  height: 400
                }}
              />
              : <QRCodeScanner onRead={onSuccess} />}
          </View>
        )}
      </ImageBackground>
    </ScrollView>
  );
};

export default Scan;
