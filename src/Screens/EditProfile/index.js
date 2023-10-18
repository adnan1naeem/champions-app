import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { API_BASE_URL } from '../../../Constants';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../Utils/Colors';
import Header from '../../Components/Header/Header';
import BackButton from '../../Components/BackButton';
import { styles } from './style';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import CustomButton from '../../Components/CustomButton';

const Index = ({ route, navigation }) => {
  const [User_Info, setUser_Info] = useState(route?.params?.userInfo);
  const [avatarName, setAvatarName] = useState('');
  const [profile_image, setProfile_image] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const Select = () => {
    Alert.alert('Profile Picture', 'From where you want to upload', [
      {
        text: 'Camera',
        onPress: () => openCamera(),
      },
      {
        text: 'Gallery',
        onPress: () => openGallery(false),
        style: 'cancel',
      },
    ]);
  };

  const openCamera = async () => {
    try {
      setIsLoading(true);
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      });

      const fileName = image.path.substring(image.path.lastIndexOf('/') + 1);
      const formdata = new FormData();
      formdata.append('image', {
        uri: image.path,
        type: image.mime,
        name: fileName,
      });
      formdata.append('cnic', User_Info?.cnic);
      try {
        const response = await fetch(`${API_BASE_URL}/updateProfile`, {
          method: 'POST',
          body: formdata,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.ok) {
          const responseData = await response?.json();
          setProfile_image(responseData?.image);
          profile_Get()
          // setIsLoading(false);

        } else {
          Alert.alert('Image upload failed');
          setIsLoading(false);

        }
      } catch (error) {
        if (error.message === 'Network request failed') {
          Alert.alert('Please try again later');
          setIsLoading(false);

        }
        console.log('error', error.message);
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error selecting image from camera:', error);
      setIsLoading(false);
    }
  };

  const openGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: false,
      });
      setIsLoading(true);
      const fileName = image.path.substring(image.path.lastIndexOf('/') + 1);
      const formdata = new FormData();
      formdata.append('image', {
        uri: Platform.OS === 'ios' ? image.sourceURL : image.path,
        type: image.mime,
        name: fileName,
      });
      formdata.append('cnic', User_Info?.cnic);
      try {
        const response = await fetch(`${API_BASE_URL}/updateProfile`, {
          method: 'POST',
          body: formdata,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.ok) {
          const responseData = await response?.json();
          setProfile_image(responseData?.image);
          profile_Get();
          // setIsLoading(false);
        } else {
          console.log('Image upload failed - HTTP Status:', response.status);
          Alert.alert('Image upload failed');
          setIsLoading(false);
        }
      } catch (error) {
        if (error.message === 'Network request failed') {
          Alert.alert('Please try again later');
          setIsLoading(false);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log('Error selecting image:', error);
      Alert.alert('Error selecting image');
      setIsLoading(false);
    }
  }




  const profile_Get = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/getProfile/${User_Info?.cnic}`,
      );
      if (response?.ok) {
        const data = await response.json();
        setProfile_image(data?.data[0]?.image);
      } else {
        console.log('Error: Unable to fetch data');
      }
      setIsLoading(false);


    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem('USER'));
      if (user) {
        let matches = user?.name?.match(/\b(\w)/g);
        let acronym = matches?.join('');
        setAvatarName(acronym, 'jkdsjdshjj');
      }
    })();
    profile_Get();
  }, []);

  return (
    <ImageBackground
      source={require('../../Assets/Image/background_image.png')}
      style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <ScrollView>

        <View style={{ paddingHorizontal: 10 }}>
          <Header />
          <BackButton navigation={navigation} onPress={() => navigation.navigate('DrawerScreen')} />
        </View>
        <View style={styles.Login_view}>
          <View style={{ width: '70%', alignSelf: 'center', }}>
            <TouchableOpacity
              onPress={() => Select()}
              style={{ justifyContent: 'center', alignSelf: 'center', padding: 18 }}>
              <View style={styles.avtarContainer}>
                {profile_image?.length > 9 ? (
                  <Image
                    source={{ uri: profile_image }}
                    style={{ height: 100, width: 100, borderRadius: 50 }}
                  />
                ) : (
                  <Text style={{ color: Colors.text_Color, fontSize: 22 }}>
                    {avatarName}
                  </Text>
                )}
                {isLoading ? (
                  <ActivityIndicator size={30} color={Colors.text_Color} style={styles.cameraContainer} />
                ) : (
                  <View
                    style={styles.cameraContainer}
                  >
                    <Entypo
                      name="camera"
                      style={styles.cameraAndloading}
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="Name"
                value={User_Info?.name}
                editable={false}
              />
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="mobile"
                value={User_Info?.mobile}
                editable={false}
              />
            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="Cnic"
                value={User_Info?.cnic}
                editable={false}
              />
            </View>
          </View>

          <CustomButton
            onPress={() => navigation.navigate('DrawerScreen')}
            ContainerStyle={styles.editButtonContainer}
            textStyle={styles.editButtonText}
            title="Edit Profile"
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Index;
