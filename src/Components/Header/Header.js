import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { styles } from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Colors } from '../../Utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import messaging from '@react-native-firebase/messaging';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../Constants';

const Header = ({ Logo }) => {

  const navigation = useNavigation();
  const [isVisible, setisVisible] = useState(false);
  const [Notifiy, setNotify] = useState();

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(handleRemoteMessage);
    return unsubscribe;
  }, []);

  const handleRemoteMessage = async remoteMessage => {
    if (remoteMessage?.data) {
      fetchData()
      console.log(JSON.stringify(remoteMessage?.data?.batchPostStatus));
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  const fetchData = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('USER'));
    if (user) {
      try {
        const apiUrl = `${API_BASE_URL}/notificationsList?page=1&limit=20`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const filteredData = data?.data?.filter(item => {
            return item?.data !== null && item?.data !== undefined;
          });
          const Notifying = filteredData?.find(item => item?.seen === false);
          setNotify(Notifying?._id);
        } else {
          console.log('Notifications response was not ok');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
      }
    } else {
      console.log('USER NOT FOUND');
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        paddingTop: Platform.OS === 'ios' && 30,
      }}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DrawerScreen');
          }}>
          <Image
            source={require('../../Assets/Image/drawer_icon.png')}
            style={[styles.image, { tintColor: Colors.text_Color }]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Image
            source={require('../../Assets/Image/chapmion_icon.png')}
            style={styles.main_logo}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.topRight}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Gallery');
          }}>
          <Image
            style={{
              height: 40,
              width: 70,
              justifyContent: 'center',
              tintColor: Colors.text_Color,
            }}
            source={require('../../Assets/Image/read.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: 57,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchCate');
            }}>
            <Fontisto
              style={{ fontSize: 18, color: Colors.text_Color, marginLeft: 14 }}
              name="search"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <FontAwesome
              style={{ fontSize: 18, color: Colors.text_Color }}
              name="bell-o"
            />
            {/* {console.log("Notifiy.length:: ", Notifiy)} */}
            {Notifiy && Notifiy.length > 0 && (
              <Octicons
                style={{
                  fontSize: 18,
                  color: 'red',
                  position: 'absolute',
                  right: 0,
                  top: -3,
                }}
                name="dot-fill"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setisVisible(false)}
        />
        <View style={styles.modalContainer}></View>
      </Modal>
    </View>
  );
};

export default Header;
