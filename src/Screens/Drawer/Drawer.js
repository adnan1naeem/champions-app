import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../Utils/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from '../../Components/Header/Header';

const DrawerScreen = () => {
  const navigation = useNavigation();
  const [user_Info, setUserInfo] = useState([]);
  const [avatarName, setAvatarName] = useState("");

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem('USER'));
      if (user) {
        let matches = user?.name?.match(/\b(\w)/g); // ['J','S','O','N']
        let acronym = matches?.join(''); // JSON
        setAvatarName(acronym , "jkdsjdshjj");
        setUserInfo(user);
      }
    })();
  }, []);

  const formatMobileNumber = number => {
    if (number?.startsWith('92')) {
      return '0' + number.slice(2);
    }
    return number;
  };

  const SignOut = async () => {
    try {
      await AsyncStorage.removeItem('USER');
      navigation.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
            colors={[
              'rgb(39, 174, 229)',
              'rgb(41,128,201)',
              'rgb(50,107,194)',
              'rgb(59,90,183)',
            ]}
            style={styles.backIcon_style}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Ionicons name="chevron-back" size={25} color={Colors.text_Color} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditProfile', {userInfo: user_Info});
          }}
          style={{}}>
          <FontAwesome5
            name="user-edit"
            color={Colors.text_Color}
            size={20}
            style={{marginTop: 12}}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginLeft: 20}}>
        <Text
          style={{fontSize: 16, fontWeight: '500', color: Colors.text_Color}}>
          ACCOUNT SETTINGS
        </Text>
        <Text
          style={{fontSize: 12, fontWeight: '400', color: Colors.text_Color}}>
          Account, Settings, More
        </Text>
      </View>
      <View style={styles.drawerContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.profile_continer}>
            <Text style={{color: Colors.text_Color, fontSize: 22}}>{avatarName}</Text>
          </View>
          <View style={{marginLeft: 15, justifyContent: 'center'}}>
            <Text style={styles.user_detail}>{user_Info?.name}</Text>
            <Text style={styles.user_detail}>
              {formatMobileNumber(user_Info?.mobile)}
            </Text>
            <Text style={styles.user_detail}>{user_Info?.cnic}</Text>
          </View>
        </View>
      </View>

      <View style={{paddingHorizontal: 30, marginTop: 50, gap: 10}}>
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
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../Assets/Image/Acoount_setting.png')}
              style={styles.icons}
            />
            <Text style={styles.user_detail_cate}>Account Settings</Text>
          </View>
          <LinearGradient
            colors={[
              'rgb(39, 174, 229)',
              'rgb(41,128,201)',
              'rgb(50,107,194)',
              'rgb(59,90,183)',
            ]}
            style={styles.forward_arrow}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
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
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../Assets/Image/help.png')}
              style={styles.icons}
            />
            <Text style={styles.user_detail_cate}>Help/FAQ</Text>
          </View>

          <LinearGradient
            colors={[
              'rgb(39, 174, 229)',
              'rgb(41,128,201)',
              'rgb(50,107,194)',
              'rgb(59,90,183)',
            ]}
            style={styles.forward_arrow}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.text_Color}
            />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AboutUs', {privacy: true})}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row', marginLeft: -6}}>
            <Image
              source={require('../../Assets/Image/Policy.png')}
              style={[
                styles.icons,
                {width: 27, height: 27, resizeMode: 'contain'},
              ]}
            />
            <Text style={styles.user_detail_cate}>Policies</Text>
          </View>
          <LinearGradient
            colors={[
              'rgb(39, 174, 229)',
              'rgb(41,128,201)',
              'rgb(50,107,194)',
              'rgb(59,90,183)',
            ]}
            style={styles.forward_arrow}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
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
              style={styles.icons}
            />
            <Text style={styles.user_detail_cate}>Sign Out</Text>
          </View>
          <LinearGradient
            colors={[
              'rgb(39, 174, 229)',
              'rgb(41,128,201)',
              'rgb(50,107,194)',
              'rgb(59,90,183)',
            ]}
            style={styles.forward_arrow}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.text_Color}
              style={{justifyContent: 'center', borderRadius: 10}}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default DrawerScreen;
