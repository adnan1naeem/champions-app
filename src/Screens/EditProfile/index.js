import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../Utils/Colors';
import Header from '../../Components/Header/Header';
import BackButton from '../../Components/BackButton';
import { styles } from './style';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import CustomButton from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { API_BASE_URL } from '../../../Constants';
import Octicons from 'react-native-vector-icons/Octicons';

const Index = ({ route, navigation }) => {
  const [Name, setName] = useState('');
  const [mobile, setmobile] = useState('');
  const [Address, setAddress] = useState('');
  const [nameError, setNameError] = useState(false);
  const [User_Info, setUser_Info] = useState(route?.params?.userInfo);
  const [user_Info, setUserInfo] = useState([]);
  const [avatarName, setAvatarName] = useState('');
  const [profile_image, setProfile_image] = useState(null);

  const Profile_upload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
      });
      const Profile_uri =
        Platform.OS === 'ios' ? image?.sourceURL : image?.path;

      let fileName = image?.filename;
      if (Platform.OS === 'android') {
        fileName = image.path.substring(image.path.lastIndexOf('/') + 1);
      }
      const formdata = new FormData();
      formdata.append('image', {
        uri: Profile_uri,
        type: Platform.OS === 'ios' ? image?.type : image?.mime,
        name: fileName,
      });
      formdata.append('cnic', user_Info?.cnic);
      const requestOptions = {
        method: 'POST',
        body: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      try {
        const response = await fetch(
          `${API_BASE_URL}/updateProfile`,
          requestOptions,
        );
        if (response.ok) {
          const responseData = await response.json();
          console.log('Response Data:', responseData);
          profile_Get()
          setProfile_image(Profile_uri);
        } else {
          Alert.alert('Image upload failed');
        }
      } catch (error) {
        Alert.alert(error);
        console.log('error', error);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const profile_Get = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/getProfile/${user_Info?.cnic}`,
      );
      if (response?.ok) {
        const data = await response.json();
        console.log(' fetch data:::  ', data?.data[0]?.image);
        setProfile_image(data?.data[0]?.image);
      } else {
        console.log('Error: Unable to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem('USER'));
      if (user) {
        let matches = user?.name?.match(/\b(\w)/g);
        let acronym = matches?.join('');
        setAvatarName(acronym, 'jkdsjdshjj');
        setUserInfo(user);
      }
    })();
    profile_Get();
  }, [profile_image]);

  return (
    <ImageBackground
      source={require('../../Assets/Image/background_image.png')}
      style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 10 }}>
          <Header />
          <BackButton navigation={navigation} />
        </View>

        <View style={styles.Login_view}>
          <View style={{ width: '70%', alignSelf: 'center' }}>
            <TouchableOpacity
              onPress={() => Profile_upload()}
              style={{ justifyContent: 'center', alignSelf: 'center' }}>
              <View style={styles.avtarContainer}>
                {profile_image ? (
                  <>
                    <Image
                      source={{ uri: profile_image }}
                      style={{ height: 100, width: 100, borderRadius: 50 }}
                    />
                    <Octicons name="plus-circle" style={{ fontSize: 30, color: Colors.text_Color, position: 'absolute', right: -1, bottom: -8 }} />
                  </>

                ) : (
                  <Text style={{ color: Colors.text_Color, fontSize: 22 }}>
                    {avatarName}
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            <View style={nameError ? styles?.inputError : styles.container}>
              <TextInput
                selectionColor={Colors.text_Color}
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
                selectionColor={Colors.text_Color}
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="mobile"
                value={User_Info?.mobile}
                onChangeText={text => setmobile(text)}
                keyboardType="default"
                editable={false}
              />
            </View>
            <View style={styles.container}>
              <TextInput
                selectionColor={Colors.text_Color}
                style={styles.input}
                placeholderTextColor={Colors.text_Color}
                placeholder="Cnic"
                value={User_Info?.cnic}
                onChangeText={text => setAddress(text)}
                keyboardType="default"
                editable={false}
              />
            </View>
          </View>
          <View></View>
          <CustomButton
            ContainerStyle={{
              paddingVertical: 15,
              justifyContent: 'center',
              alignSelf: 'center',
              width: '80%',
              borderRadius: 15,
            }}
            textStyle={{
              color: Colors.text_Color,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: '200',
            }}
            title="Edit Profile"
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Index;
