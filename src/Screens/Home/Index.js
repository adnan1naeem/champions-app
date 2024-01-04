import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  Alert,
  RefreshControl,
  Platform,
  BackHandler,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import React, { useEffect, useState, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from './styles';
import Header from '../../Components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import Datepicker from '../../Components/Datepicker';
import CardsButton from '../../Components/CardsButton';
import { Colors } from '../../Utils/Colors';
import {
  API_BASE_URL,
  Android_Link,
  Ios_Link,
  androidVersion,
  iosVersion,
} from '../../../Constants';
import axios from './../../Utils/axiosConfig'
import NetInfo from '@react-native-community/netinfo';
import checkVersion from 'react-native-store-version';
import CustomButton from '../../Components/CustomButton';
import messaging from '@react-native-firebase/messaging';
import TierFlow from './TierFlow';
import { Branch, Zone } from './Tier';

const Home = () => {
  const navigation = useNavigation();
  const [isVisible, setisVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [Paid_ammount, setPaid_ammount] = useState(0);
  const [approved_ammount, setapproved_ammount] = useState(0);
  const [pending_ammount, setpending_ammount] = useState(0);
  const [paid_list, setPaid_list] = useState([]);
  const [approved_list, setApproved_list] = useState([]);
  const [pending_list, setPending_list] = useState([]);
  const [verified_list, setVerified_list] = useState([]);
  const [rejected_list, setRejected_list] = useState([]);
  const [category, setCategory] = useState();
  const scrollViewRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Received a background message:', remoteMessage);
    });
  }, []);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Alert.alert('Please Check Your Internet Connection!');
        return;
      }
      fetchCategoryData();
    });
    const unsubscribe = NetInfo.addEventListener(state => { });
    unsubscribe();
  }, []);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    let version = Platform.OS === 'ios' ? iosVersion : androidVersion;
    try {
      const check = await checkVersion({
        version,
        iosStoreURL: Ios_Link,
        androidStoreURL: Android_Link,
      });
      if (check?.result === 'new') {
        handle_Update_Modal(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handle_Update_Modal = status => {
    setisVisible(status);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getBatchListing();
      setRefreshing(false);
      setSelectedValue('');
      setstartDate('');
      setendDate('');
    }, 1000);
  }, []);

  const handleSubmmit = (status, list) => {
    navigation.navigate('PaidCategory', {
      status: status,
      list: list,
    });
  };

  const handleDateSelect = (start, end) => {
    setstartDate(start);
    setendDate(end);
  };

  useEffect(() => {
    getBatchListing();
  }, [startDate, endDate, selectedValue]);

  useEffect(() => {
    getBatchListing();
  }, []);

  const getBatchListing = async () => {
    const data = {
      start_date: endDate,
      end_date: startDate,
      divCode:
        selectedValue?.categoryCode === '0' ? '' : selectedValue?.categoryCode,
    };

    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/BatchListing`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };
    try {

      axios.request(config)
        .then(async (response) => {
          if (response?.data) {
            const data = response?.data;

            const paidBatches = data?.batchList?.filter(
              batch => batch?.batchPostStatus?.toLowerCase() === 'paid',
            );
            const total_PaidIncentiveAmount = paidBatches?.reduce(
              (sum, batch) => sum + batch?.incentiveAmount,
              0,
            );
            const approvedBatches = data?.batchList?.filter(
              batch => batch?.batchPostStatus?.toLowerCase() === 'approved',
            );
            const total_approvedIncentiveAmount = approvedBatches?.reduce(
              (sum, batch) => sum + batch?.incentiveAmount,
              0,
            );
            const verifiedBatches = data?.batchList?.filter(
              batch => batch?.batchPostStatus?.toLowerCase() === 'verified',
            );

            const total_verifiedIncentiveAmount = verifiedBatches?.reduce(
              (sum, batch) => sum + batch?.incentiveAmount,
              0,
            );

            const rejectedBatches = data?.batchList?.filter(
              batch => batch?.batchPostStatus?.toLowerCase() === 'rejected',
            );
            const pendingBatches = data?.batchList?.filter(
              batch => batch?.batchPostStatus?.toLowerCase() === 'pending',
            );

            const totalOutstanding =
              total_verifiedIncentiveAmount + total_approvedIncentiveAmount;
            setPending_list([...pendingBatches.reverse()]);
            setRejected_list([...rejectedBatches.reverse()]);
            setVerified_list([...verifiedBatches.reverse()]);
            setPaid_list([...paidBatches.reverse()]);
            setApproved_list([...approvedBatches.reverse()]);
            setapproved_ammount(total_approvedIncentiveAmount);
            setPaid_ammount(total_PaidIncentiveAmount);
            setpending_ammount(totalOutstanding);
          }
        })
        .catch((error) => {
          console.log(JSON.stringify(error, null, 2));
        });


    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCategoryData = async () => {

    try {
      const payload = {
        companyCode: '1000',
      };
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/getCategory`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(payload)
      };

      axios.request(config)
        .then((response) => {
          if (response?.data) {
            let dataIs = {
              _id: '11111',
              categoryCode: '0',
              categoryName: 'All Products',
              companyName: 'Orient Electronics Pvt. Ltd.',
              companyCode: '1000',
            };

            setCategory([dataIs, ...response?.data?.category]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error('Error:', error);
      if (
        error instanceof TypeError &&
        error.message === 'Network request failed'
      ) {
        Alert.alert(
          'Sorry..!',
          'Our server is currently undergoing scheduled maintenance to improve performance and reliability. During this time, the service may be temporarily unavailable.',
        );
      }
    }
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedValue(item);
        setModalVisible(false);
      }}
      style={styles.dropdownItem}>
      <Text style={[styles.dropdownItemText, { color: Colors.text_Color }]}>
        {item?.categoryName}
      </Text>
      {selectedValue?.categoryCode === item?.categoryCode && (
        <Entypo
          name="check"
          style={{ color: Colors.text_Color, fontSize: 16, marginLeft: 10 }}
        />
      )}
    </TouchableOpacity>
  );




  return (
    <ImageBackground
      source={require('../../Assets/Image/background_image.png')}
      style={styles.container}
      resizeMode="cover">
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        <Header value={true} />
        <ScrollView
          ref={scrollViewRef}
          refreshControl={
            <RefreshControl
              tintColor="#fff"
              color={'red'}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}>
          <View style={styles.filter_view}>
            <View style={{ marginTop: 15 }}>
              {selectedValue?._id ? (
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: Colors.text_Color }}>
                    {selectedValue?.categoryName}
                  </Text>
                  <Entypo
                    name={modalVisible ? 'chevron-up' : 'chevron-down'}
                    style={{ color: Colors.text_Color, fontSize: 20 }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.dropdownItemText}>All Products</Text>
                  <Entypo
                    name={modalVisible ? 'chevron-up' : 'chevron-down'}
                    style={{ color: Colors.text_Color, fontSize: 20 }}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View>
              <Datepicker
                refreshState={refreshing}
                onDateSelect={handleDateSelect}
              />
            </View>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            onRequestClose={() => setModalVisible(false)}>
            <View style={[styles.catmodalContainer]}>
              <View style={styles.modalContent}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={category}
                  renderItem={renderDropdownItem}
                  keyExtractor={item => item?._id}
                />
              </View>
            </View>
          </Modal>

          <View style={{ alignItems: 'center', marginVertical: 5 }}>
            <Text style={styles.performance}>RS. {pending_ammount}</Text>
            <Text style={styles.part}>Total Outstanding</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
              marginTop: 5,
            }}>
            <View style={{ alignSelf: 'center' }}>
              <Text style={styles.performance}>RS. {Paid_ammount}</Text>
              <Text style={styles.part}>Total Paid</Text>
            </View>
            <View>
              <Text style={styles.performance}>RS. {approved_ammount}</Text>
              <Text style={styles.part}>Total Approved</Text>
            </View>
          </View>
          <Image
            style={styles.Chamiopm_Logo}
            resizeMode="contain"
            source={require('../../Assets/Image/Orient_icon.png')}
          />
          <View style={styles.tierContainer}>
            <TierFlow title={"Zone"} data={Zone} />
            <TierFlow title={"Branch"} data={Branch} />
            <TierFlow title={"Dealer"} data={Zone} />
            <TierFlow title={"FSM"} data={Zone} />
          </View>
          <CardsButton
            disabled={paid_list?.length <= 0}
            status={'Paid Cards'}
            value={paid_list?.length}
            onPress={() => handleSubmmit('Paid Cards', paid_list)}
          />
          <CardsButton
            disabled={approved_list?.length <= 0}
            status={'Approved Cards'}
            value={approved_list?.length}
            onPress={() => handleSubmmit('Approved Cards', approved_list)}
          />
          <CardsButton
            disabled={verified_list?.length <= 0}
            status={'Verified Cards'}
            value={verified_list?.length}
            onPress={() => handleSubmmit('Verified Cards', verified_list)}
          />
          <CardsButton
            disabled={pending_list?.length <= 0}
            status={'Pending Cards'}
            value={pending_list?.length}
            onPress={() => handleSubmmit('Pending Cards', pending_list)}
          />
          <CardsButton
            disabled={rejected_list?.length <= 0}
            status={'Rejected Cards'}
            value={rejected_list?.length}
            onPress={() => handleSubmmit('Rejected Cards', rejected_list)}
          />
          <TouchableOpacity
            style={styles.scan_button}
            onPress={() => {
              navigation.navigate('Scan');
            }}>
            <Ionicons
              name="add"
              color={Colors.text_Color}
              size={16}
              fontWeight={'400'}
            />
            <Text style={styles.scan_text}>SCAN</Text>
          </TouchableOpacity>
          <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <Text style={styles.UpdateHeading}>
                Champions Update Available
              </Text>
              <Text style={styles.updateMessage}>Please update your app !</Text>
              <CustomButton
                onPress={() => {
                  BackHandler.exitApp();
                  Linking.openURL(
                    Platform.OS === 'ios' ? Ios_Link : Android_Link,
                  );
                }}
                title="Update"
              />
            </View>
          </Modal>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Home;
