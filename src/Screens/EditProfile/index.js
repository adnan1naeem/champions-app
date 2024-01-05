import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import axios from './../../Utils/axiosConfig';
import Image from 'react-native-image-progress';
const Index = ({ route, navigation }) => {
  const [User_Info, setUser_Info] = useState(route?.params?.userInfo);
  const [avatarName, setAvatarName] = useState('');
  const [profile_image, setProfile_image] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const Select = () => {
    Alert.alert('Profile Picture', 'From where you want to upload', [
      {
        text: 'Camera',
        onPress: () => uploadImage(true),
      },
      {
        text: 'Gallery',
        onPress: () => uploadImage(false),
        style: 'cancel',
      },
    ],
      { cancelable: true }
    );
  };

  const uploadImage = async (camera) => {
    setIsLoading(true);
    try {
      // uri: Platform.OS === 'ios' ? image.sourceURL : image.path,

      let image;
      if (camera) {
        image = await ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: false,
        });
      } else {
        image = await ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: false,
        });
      }

      const fileName = image?.path.substring(image.path.lastIndexOf('/') + 1);
      const data = new FormData();
      data.append('image', {
        uri: image.path || image.sourceURL,
        type: image.mime,
        name: fileName,
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/updateProfile`,
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
        data: data
      };
      axios.request(config)
        .then(async (response) => {
          if (response?.data) {
            setProfile_image(response?.data?.image);
            await AsyncStorage.setItem('USER', JSON.stringify(response?.data));
          } else {
            Alert.alert('Image upload failed');
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(JSON.stringify(error, null, 2));
        });

    } catch (error) {
      if (error.message === 'Network request failed') {
        Alert.alert('Please try again later');
        setIsLoading(false);

      }
      console.log('error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const profile_Get = async () => {
    try {
      setIsLoading(true);
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/getProfile`,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      axios.request(config)
        .then((response) => {
          if (response?.data) {
            setProfile_image(response?.data?.data?.image);
          }
          setIsLoading(false);
        })
        .catch(() =>
          setIsLoading(false)
        );
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem('USER'));
      const Profile = await AsyncStorage.getItem("PROFILEPICTURE");
      if (user) {
        let matches = user?.name?.match(/\b(\w)/g);
        let acronym = matches?.join('');
        setAvatarName(acronym, 'jkdsjdshjj');
      }
      if (Profile == 'true' || Profile == null) {
        profile_Get()
      }
    })();
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
                    indicator={<ActivityIndicator color={Colors.text_Color} />}
                    style={{ height: 80, width: 80, borderRadius: 50, overflow: 'hidden' }}
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
