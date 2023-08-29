import {
  Image,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../Utils/Colors";
import CustomButton from "../../Components/CustomButton";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Header from "../../Components/Header/Header";
import BackButton from "../../Components/BackButton";


const EditProfile = ({ route, }) => {
  const [Name, setName] = useState("");
  const [mobile, setmobile] = useState("");
  const [Address, setAddress] = useState("");
  const [image, setImage] = useState(null); const navigation = useNavigation();
  const [imageSource, setImageSource] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [User_Info, setUser_Info] = useState(route?.params?.userInfo);




  // const updateUserProfile = async () => {
  //   try {
  //     const response = await axios.put(
  //       `http://16.24.45.175:8000/updateUserProfile/${current_Userid}`,
  //       {
  //         name: Name,
  //         mobile: mobile,
  //         address: Address,
  //       }
  //     );
  //     console.log("Update response:", response);

  //   } catch (error) {
  //     console.log("Error updating profile:", error);
  //   }
  // };


  const [selectedImage, setSelectedImage] = useState(null);



  const options = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: false,
  };
  const Cameraopen = async () => {
    try {
      const result = await launchCamera(options);
      if (!result?.didCancel && !result?.error) {
        console.log('Selected image URI:', result);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }

  };

  const Gallery = async () => {
    try {
      const result = await launchImageLibrary(options);
      if (!result?.didCancel && !result?.error) {
        console.log('Selected image URI:', result);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }

  };

  const Select = () => {
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Camera',
        onPress: () => Cameraopen(),
      },
      {
        text: 'Gallery',
        onPress: () => Gallery(),
        style: 'cancel',
      },
    ]);
  };



  return (
    <ImageBackground
      source={require('../../Assets/Image/background_image.png')}
      style={{ flex: 1, backgroundColor: Colors.blueBackground }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 10 }}>
          <Header />
          <BackButton navigation={navigation} />
        </View>
        <View style={styles.Login_main_view}>
          <TouchableOpacity onPress={() => Select()}>
            {imageSource && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </TouchableOpacity>
        </View>
        <View style={styles.Login_view}>

          <View style={{ width: "70%", alignSelf: "center" }}>
            <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
              <Image style={{ height: 100, width: 100, borderRadius: 50 }} source={require('../../Assets/Image/amir.jpg')} resizeMode="contain" />
            </View>
            <View style={nameError ? styles?.inputError : styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="Name"
                value={User_Info?.name}
                onChangeText={(text) => setName(text)}
                keyboardType="default"
                editable={false}
              />
            </View>
            <View style={nameError ? styles?.inputError : styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="mobile"
                value={User_Info?.mobile}
                onChangeText={(text) => setmobile(text)}
                keyboardType="default"
                editable={false}
              />
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="Cnic"
                value={User_Info?.cnic}
                onChangeText={(text) => setAddress(text)}
                keyboardType="default"
                editable={false}

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
            textStyle={{ color: Colors.text_Color, textAlign: "center", fontSize: 16, fontFamily: '200' }}
            title="Edit Profile"
          />
        </View>
      </ScrollView>
    </ImageBackground>

  );
};

export default EditProfile;


