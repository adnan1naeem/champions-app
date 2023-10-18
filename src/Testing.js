import {
  Image,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useEffect } from "react";
import axios from "axios";
import { Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from "./Components/CustomButton";
import { Colors } from "./Utils/Colors";
import { Alert } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';

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




  const Cameraopen = async () => {
    try {
      const result = ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      }).then(image => {
        console.log(image);
      });
      console.log('camera image URI:', result);

    } catch (error) {
      console.error('Error selecting image:', error);
    }

  };

  const Gallery = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false
      }).then(image => {
        console.log(image);
      });;

      console.log('Selected image URI:', result);

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
  const [user_Info, setUserInfo] = useState([]);
  const [avatarName, setAvatarName] = useState("");
  useEffect(() => {
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem('USER'));
      if (user) {
        let matches = user?.name?.match(/\b(\w)/g);
        let acronym = matches?.join('');
        setAvatarName(acronym, "jkdsjdshjj");
        setUserInfo(user);
      }
    })();
  }, [avatarName]);

  useEffect(() => {
    console.log("hgshdhfs:: ", avatarName);
  },)

  return (

    <View style={{ backgroundColor: 'red', flex: 1 }}>

      <TouchableOpacity>
        {imageSource && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </TouchableOpacity>

      <CustomButton
        onPress={() => Select()}
        ContainerStyle={{
          paddingVertical: 15,
          justifyContent: "center",
          alignSelf: "center",
          width: "80%",
          borderRadius: 15,
          marginTop: 200,
        }}
        textStyle={{ color: Colors.text_Color, textAlign: "center", fontSize: 16, fontFamily: '200' }}
        title="Edit Profile"
      />

    </View>


  );
};

export default EditProfile;


