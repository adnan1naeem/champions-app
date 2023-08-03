import {
    Text,
    Button,
    View,
    ScrollView,
    TextInput,
    Image,
    ImageBackground,
    StatusBar,
    StyleSheet,
  } from "react-native";
  import { BarCodeScanner } from 'expo-barcode-scanner';
  import React, { useState, useEffect } from "react";
  import Header from "../../Components/Header/Header";
  import CustomButton from "../../Components/CustomButton";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const Scan = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [barCode,setbarCode] = useState();
    const [dealerCode,setdelearCode] = useState();
    const [userId,setUserid] = useState();
    const [userName,setUserName] = useState();
    const [cnic,setCnic] = useState();
    const [mobile,setMobile] = useState();


  
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
      const u_Id= await AsyncStorage.getItem("USERID")
      const u_Name= await AsyncStorage.getItem("USERNAME")
      const cnic= await AsyncStorage.getItem("CNIC")
      const mobile= await AsyncStorage.getItem("MOBILE")
      const d_Code= await AsyncStorage.getItem("DELEAR")
      setdelearCode(d_Code)
      setMobile(mobile)
      setCnic(cnic)
      setUserName(u_Name)
      setUserid(u_Id)
      setHasPermission(status === 'granted');
      };
      getBarCodeScannerPermissions();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setbarCode(data)
      setScanned(true);
      handleSubmit()
    };
  
    const handleScanButtonPress = () => {
        if (barCode) {
            handleSubmit();
          } else {
            setScanning(true);
            setScanned(false);
          }
    };
  
    const handleCloseButtonPress = () => {
      setScanning(false);
      setScanned(false);
    };
  
    if (hasPermission === null) {
      return console.log("Requesting for camera permission");;
    }
    if (hasPermission === false) {
      return console.log("No access to camera");;
    }
    const handleSubmit = async () => {   
        try {
          const config = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: barCode,
              name: userName,
              mobile: mobile,
              cnic: cnic,
              dealerCode: dealerCode,
              userId: userId
            }),
          };
          const response = await fetch("http://16.24.45.175:8000/batchScan", config);
          const data = await response.json();
          if (response?.status === 201) {
            console.log("Responce:: ", response);
            alert("Batch Code Submit");
          } else if (response?.status !== 201) {
            if (data?.error === "Invalid batch length. Batch character length must be 10") {
              alert("Invalid Batch Code. Batch character length must be 10");
            } else {
              console.log("error: ", data);
            }
          }
        } catch (e) {
          alert(JSON.stringify(e));
      };}

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          source={require('../../Assets/Image/background_image.png')}
          style={styles.container}
          resizeMode="cover"
        >
          <StatusBar hidden={true} />
          <Header />
          {!scanning && 
          <View style={styles.Login_view}>
            <View style={styles.unlock_view}>
              <TextInput
               value={barCode}
                onChangeText={setbarCode}
                placeholder="Enter Code Manually"
                placeholderTextColor="#FFFFFF"
                style={{ fontSize: 17, color: 'white' }}
              />
             </View>
                <View style={styles.scanner_view}>
                   <Image source={require('../../Assets/Image/QR_code.png')} style={{height:90,width:90,backgroundColor:'white'}}/>
                   <Image source={require('../../Assets/Image/barcode.jpg')} style={{height:90,width:125,backgroundColor:'white'}}/>
                </View>
         
             <View style={{ flexDirection: 'row', justifyContent: "center", gap: 10 }}>
              <CustomButton
                onPress={handleScanButtonPress}
                ContainerStyle={styles.proceed_button}
                textStyle={styles.text}
                title="QR CODE"
              />
              <CustomButton
                onPress={handleScanButtonPress}
                ContainerStyle={styles.proceed_button}
                textStyle={styles.text}
                title="BARCODE"
              />
            </View>
                
          </View>}

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
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={styles.scanner}
                />
                <View style={styles.closeButtonContainer}>
                  <Button
                    title="Close Barcode Scanner"
                    onPress={handleCloseButtonPress}
                    color="red"
                  />
                </View>
              </View>
            )}
        </ImageBackground>
      </ScrollView>
    );
  };
  
   
  
  export default Scan;
  