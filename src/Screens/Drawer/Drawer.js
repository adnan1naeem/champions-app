import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text,
  Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../Utils/Colors';
import Header from '../../Components/Header/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from './../../Utils/axiosConfig';
import Feather from 'react-native-vector-icons/Feather';
import { API_BASE_URL } from '../../../Constants';
import { formatMobileNumber } from '../../Components/MobileNumberFormat';

const DrawerScreen = () => {
  const navigation = useNavigation();
  const [user_Info, setUserInfo] = useState([]);
  const [avatarName, setAvatarName] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [profile_image, setProfile_image] = useState(null);

  const [items, setItems] = useState([
    { label: 'FSM Policy', value: 'FsmPolicy' },
    { label: 'Privacy Policy', value: 'PrivacyPolicy' },
  ]);

  const handleBackPress = () => {
    navigation.goBack();
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
  }, []);

  const SignOut = async () => {
    try {
      await AsyncStorage.removeItem('USER');
      await AsyncStorage.removeItem("MOBILE");
      await AsyncStorage.removeItem("PASSWORD");
      await AsyncStorage.removeItem('AUTH_TOKEN');

      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteUser = () => {
    axios
      .delete(`${API_BASE_URL}/deleteUser/${user_Info?.cnic}`)
      .then(response => {
        console.log(response?.data);
        SignOut();
        navigation.navigate('SignIn');
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  useFocusEffect(
    useCallback(async () => {
      const Profile = await AsyncStorage.getItem('PROFILEPICTURE');
      if (Profile == 'false') {
        setProfile_image(null);
        return
      }
      const userProfile = await AsyncStorage.getItem('USER');
      let image = JSON.parse(userProfile)?.image;
      if (image) {
        setProfile_image(image);
      } else {
        setProfile_image(null);
      }
    }, []),
  );

  const Delete = () => {
    Alert.alert('Warning..!', 'Are you sure you want to continue?', [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
      { text: 'OK', onPress: () => handleDeleteUser() },
    ]);
  };

  const HandlePolicy = text => {
    if (text?.value === 'FsmPolicy') {
      navigation.navigate('Fsm_Policy', { privacy: true });
      return;
    }
    navigation.navigate('Fsm_Policy');
  };

  return (
    <ImageBackground
      source={require('../../Assets/Image/background_image.png')}
      style={styles.container}
      resizeMode="cover">
      <Header value={true} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <LinearGradient
            colors={Colors.gradient_color_Pair}
            style={styles.backIcon_style}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Ionicons name="chevron-back" size={25} color={Colors.text_Color} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() => {
            navigation.navigate('EditProfile', { userInfo: user_Info });
          }}>
          <FontAwesome5
            name="user-edit"
            color={Colors.text_Color}
            size={20}
            style={{ marginTop: 12 }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginLeft: 20 }}>
        <Text
          style={{ fontSize: 16, fontWeight: '500', color: Colors.text_Color }}>
          ACCOUNT SETTINGS
        </Text>
        <Text
          style={{ fontSize: 12, fontWeight: '400', color: Colors.text_Color }}>
          Account Settings, More
        </Text>
      </View>
      <View style={styles.drawerContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.profile_continer}>
            {profile_image?.length > 9 ? (
              <>
                <Image
                  source={{ uri: profile_image }}
                  style={styles.DrawerProfile}
                />
              </>
            ) : (
              <Text style={{ color: Colors.text_Color, fontSize: 22 }}>
                {avatarName}
              </Text>
            )}
          </View>
          <View style={{ marginLeft: 15, justifyContent: 'center' }}>
            <Text style={styles.user_detail}>{user_Info?.name}</Text>
            <Text style={styles.user_detail}>
              {formatMobileNumber(user_Info?.mobile)}
            </Text>
            <Text style={styles.user_detail}>{user_Info?.cnic}</Text>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 30, marginTop: 50, gap: 10 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
          }}
          onPress={() => {
            navigation.navigate('AccountSetting');
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../Assets/Image/Acoount_setting.png')}
              style={styles.icons}
            />
            <Text style={styles.user_detail_cate}>Account Settings</Text>
          </View>
          <LinearGradient
            colors={Colors.gradient_color_Pair}
            style={styles.forward_arrow}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.text_Color}
            />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('HelpFAQ')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../Assets/Image/help.png')}
              style={styles.icons}
            />
            <Text style={styles.user_detail_cate}>Help/FAQ</Text>
          </View>

          <LinearGradient
            colors={Colors.gradient_color_Pair}
            style={styles.forward_arrow}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.text_Color}
            />
          </LinearGradient>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 1,
            marginEnd: 2,
          }}>
          <Image
            source={require('../../Assets/Image/Policy.png')}
            style={[
              styles.icons,
              {
                marginLeft: -5,
                width: 27,
                height: 27,
                resizeMode: 'contain',
                tintColor: Colors.text_Color,
              },
            ]}
          />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onSelectItem={text => HandlePolicy(text)}
            placeholder="Policies"
            autoScroll={true}
            textStyle={[styles.user_detail_cate, { paddingLeft: 0 }]}
            style={[
              { color: Colors.text_Color, borderColor: 'transparent' },
              { backgroundColor: open ? '#1A4578' : 'transparent' },
            ]}
            containerStyle={{ width: '97%', color: 'white' }}
            dropDownContainerStyle={{
              backgroundColor: '#1A4578',
              borderColor: 'transparent',
              paddingVertical: 5,
              zIndex: 1,
            }}
            ArrowDownIconComponent={({ style }) => (
              <LinearGradient
                colors={Colors.gradient_color_Pair}
                style={styles.forward_arrow}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Ionicons name="chevron-forward" size={20} color={'#9297b0'} />
              </LinearGradient>
            )}
            TickIconComponent={() => (
              <FontAwesome6 name="check" color={Colors.text_Color} />
            )}
            arrowIconStyle={{ tintColor: Colors.text_Color }}
          />
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => Delete()}>
          <View style={{ flexDirection: 'row' }}>
            <Feather name="delete" size={15} color={'#9297b0'} />

            <Text style={styles.user_detail_cate}>Delete Account</Text>
          </View>
          <LinearGradient
            colors={Colors.gradient_color_Pair}
            style={styles.forward_arrow}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.text_Color}
            />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => SignOut()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginEnd: 2,
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../Assets/Image/signout.png')}
              style={[styles.icons]}
            />
            <Text style={styles.user_detail_cate}>Sign Out</Text>
          </View>
          <LinearGradient
            colors={Colors.gradient_color_Pair}
            style={styles.forward_arrow}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.text_Color}
              style={{ justifyContent: 'center', borderRadius: 10 }}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default DrawerScreen;
