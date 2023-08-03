import {
  Image,
  StyleSheet,
  Text,
  AppState,
  Button,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../Utils/Colors";
import CustomButton from "../../Components/CustomButton";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
const {launchImageLibrary} = require('react-native-image-picker');
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const EditProfile = () => {
  const [Name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [Address, setAddress] = useState("");
  const [current_Userid,setcurrent_Userid]= useState()
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  const [imageSource, setImageSource] = useState(null);
  const [nameError, setNameError] = useState(false);
 
  useEffect(() => {
    const getUserId = async () => {
        const userId = await AsyncStorage.getItem('USERID');
        setcurrent_Userid(userId)
    };
    getUserId();
  }, []); 

  const updateUserProfile = async () => {
    try {
      const response = await axios.put(
        `http://16.24.45.175:8000/updateUserProfile/${current_Userid}`,
        {
          name: Name,
          mobile: mobile,
          address: Address,
        }
      );
      console.log("Update response:", response);
      
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };


  const openImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    },
    (response) => {
      console.log(response);
      this.setState({
        resourcePath: response
      });
    },
  )
  };


  useEffect(() => {
    const getUserId = async () => {
        const userId = await AsyncStorage.getItem('USERID');
        setcurrent_Userid(userId)
    };
    getUserId();
  }, []); 
  
  
  return (
    <ImageBackground
      source={require('../../Assets/Image/background_image.png')}
      style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.Login_main_view}>
        <View>
          {imageSource && <Image source={imageSource} style={{ width: 200, height: 200 }} />}
         <Button title="Select Image" onPress={openImagePicker} />
       </View>
          <Image style={styles.logo} source={require('../../Assets/Image/login_image.png')} resizeMode="contain" />
        </View>
        <View style={styles.Login_view}>

          <View style={{ width: "70%", alignSelf: "center" }}>
            <View style={{justifyContent:'center',alignSelf:'center'}}>
            <Image style={{height:100,width:100,borderRadius:50}} source={require('../../Assets/Image/amir.jpg')} resizeMode="contain" />
            </View>
            <View style={nameError ? styles?.inputError : styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Name"
                value={Name}
                onChangeText={(text) => setName(text)}
                keyboardType="default"
              />
            </View>
            <View style={nameError ? styles?.inputError : styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="mobile"
                value={mobile}
                onChangeText={(text) => setmobile(text)}
                keyboardType="default" 
              />
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Address"
                value={Address}
                onChangeText={(text) => setAddress(text)}
                keyboardType="default"
              />
            </View>
          </View>
          <View>
            
          </View>
          <CustomButton
            onPress={() => updateUserProfile()}
            ContainerStyle={{
              paddingVertical: 15,
              justifyContent: "center",
              alignSelf: "center",
              width: "80%",
              borderRadius: 15
            }}
            textStyle={{ color: Colors.White, textAlign: "center", fontSize: 16, fontFamily: '200' }}
            title="Edit Profile"
          />
        </View>
      </ScrollView>
    </ImageBackground>

  );
};

export default EditProfile;


