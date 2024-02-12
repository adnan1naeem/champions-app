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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const [isVisible, setisVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [Paid_ammount, setPaid_ammount] = useState(0);
  const [approved_ammount, setapproved_ammount] = useState(0);
  const [outstanding_ammount, setoutstanding_ammount] = useState(0);
  const [listData, setListData] = useState(0);
  const [category, setCategory] = useState();
  const scrollViewRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [tier, setTier] = useState(0);
  const [zoneList, setZoneList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [dealerList, setDealerList] = useState([]);
  const [fsmList, setFSMList] = useState([]);
  const [tierTwoZoneId, setTierTwoZoneId] = useState(null);

  const [selectedZone, setSelectZone] = useState({
    "_id": null,
    "code": null,
    "name": "All",
    "dealers": []
  });
  const [selectedBranch, setSelectBranch] = useState('');
  const [selectedDealer, setSelectDealer] = useState('');
  const [selectedFSM, setSelectFSM] = useState('');

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Received a background message:', remoteMessage);
    });
  }, []);

  useEffect(() => {
    if (startDate || endDate || selectedZone || selectedBranch || selectedDealer || selectedFSM) {
      if (parseInt(tier) > 0 && parseInt(tier) < 4) {
        getBatchLisitingNew();
      }
    }
  }, [startDate, endDate, selectedZone, selectedBranch, selectedDealer]);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state?.isConnected) {
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

  const onRefresh = React.useCallback(async() => {
    let tier = await AsyncStorage.getItem('TIER_NUMBER');
    setRefreshing(true);
    setTimeout(() => {
      if (parseInt(tier) >= 0 && parseInt(tier) <= 4) {
        getZoneList(tier);
      } else {
        getBatchListing();
      }
      setRefreshing(false);
      if (parseInt(tier) >= 0 && parseInt(tier) <= 4) {
        setSelectZone({
          "_id": null,
          "code": null,
          "name": "All",
          "dealers": []
        })
        if (tier == '2') {
          setSelectBranch({
            _id: null,
            name: 'All',
            deleted: false
          });
        } else {
          setSelectBranch('');
        }
        if (tier == '3') {
          setSelectDealer({
            _id: null,
            name: 'All',
            deleted: false
          });
        } else {
          setSelectDealer('');
        }
        setSelectFSM('');
        setstartDate('');
        setendDate('');
      }
      setSelectedValue('');
      setstartDate('');
      setendDate('');
    }, 1000);
  }, []);

  const handleSubmmit = (status, name) => {
    let dataCount = []
    if (name == "paid") {
      dataCount = listData?.paid?.count
    } else if (name == "approved") {
      dataCount = listData?.approved?.count
    } else if (name == "verified") {
      dataCount = listData?.verified?.count
    } else if (name == "pending") {
      dataCount = listData?.pending?.count
    } else if (name == "rejected") {
      dataCount = listData?.rejected?.count
    }
    let data = {
      tier: tier > 0 && tier <= 3,
      status: status,
      list: listData,
      dataCount: dataCount,
      name: name,
      zone: selectedZone,
      barnch: selectedBranch,
      startDate: endDate,
      endDate: startDate,
      dealer: selectedDealer,
      fsm: selectedFSM,
      divCode: selectedValue?.categoryCode
    }
    navigation.navigate('PaidCategory', {
      data: data
    });
  };

  const handleDateSelect = (start, end) => {
    setstartDate(start);
    setendDate(end);
  };

  useEffect(() => {
    (async () => {
      let tierIs = await AsyncStorage.getItem('TIER_NUMBER');
      if (tierIs != 0) {
        setTier(parseInt(tierIs));
        getZoneList(tierIs);
        if (tierIs == '2') {
          setSelectBranch({
            _id: null,
            name: 'All',
            deleted: false
          });
        }
      } else {
        getBatchListing();
      }
    })();
  }, [selectedValue]);

  const getBatchListing = async () => {
    const data = {
      startDate: endDate,
      endDate: startDate,
      divCode:
        selectedValue?.categoryCode === '0' ? '' : selectedValue?.categoryCode,
    };

    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/allBatchesInfo`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    try {
      axios.request(config)
        .then(async (response) => {
          if (response?.data) {
            setListData(response?.data);
            setapproved_ammount(parseInt(response?.data?.approved?.totalIncentiveAmount) || 0);
            setPaid_ammount(parseInt(response?.data?.paid?.totalIncentiveAmount) || 0);
            setoutstanding_ammount(parseInt(response?.data?.pending?.totalIncentiveAmount) + parseInt(response?.data?.verified?.totalIncentiveAmount) || 0)
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(JSON.stringify(error, null, 2));
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getBatchLisitingNew = (zoneId = null) => {
    setLoading(true);
    const data = {
      startDate: endDate,
      endDate: startDate,
      zoneId: selectedZone?._id || tierTwoZoneId || zoneId || null,
      branchId: selectedBranch?._id || null,
      dealerId: selectedDealer?._id || null,
      fsmId: selectedFSM?._id || null,
      divCode:
        selectedValue?.categoryCode === '0' ? '' : selectedValue?.categoryCode,
    };

    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/filteredBatchesInfo`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data)
    };
    try {
      axios.request(config)
        .then(async (response) => {
          if (response?.data) {
            setListData(response?.data);
            setapproved_ammount(parseInt(response?.data?.approved?.totalIncentiveAmount) || 0);
            setPaid_ammount(parseInt(response?.data?.paid?.totalIncentiveAmount) || 0);
            setoutstanding_ammount(parseInt(response?.data?.pending?.totalIncentiveAmount) + parseInt(response?.data?.verified?.totalIncentiveAmount) || 0)
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error is:', error);
          setListData(null);
        });
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }
  }

  const getFSMLisiting = () => {
    const data = {};
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/fsmListWithDealer/${selectedDealer?._id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };
    try {
      axios.request(config)
        .then(async (response) => {
          if (response?.data) {
            let newIndex = {
              _id: null,
              name: 'All',
              deleted: false
            }
            setFSMList([newIndex, ...response?.data]);
          }
        })
        .catch((error) => {
          console.log(JSON.stringify(error, null, 2));
          setListData(null);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getZoneList = async (tierIs) => {
    const data = {};
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/zones`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };
    try {
      axios.request(config)
        .then(async (response) => {
          if (response?.data) {
            if (tierIs == '1') {
              getBatchLisitingNew();
              response?.data.forEach(zone => {
                zone.branches.unshift({
                  "_id": null,
                  "code": null,
                  "name": "All",
                  "dealers": []
                })
              })
              response?.data.unshift({
                branches: [],
                _id: null,
                name: 'All',
                deleted: false
              })
              setZoneList([...response?.data]);
            }
            if (tierIs == '3') {
              getBatchLisitingNew();

              response?.data[0]?.branches[0]?.dealers?.unshift({
                branches: [],
                _id: null,
                name: 'All',
                deleted: false
              })
              setDealerList([data, ...response?.data[0]?.branches[0]?.dealers])
            } else if (tierIs == 2) {
              let branchesData = []
              response?.data?.forEach(element => {
                if (element?.branches) {
                  element?.branches.forEach((dealers) => {
                    branchesData.push(dealers);
                  });
                }
              });
              let newIndex = {
                _id: null,
                name: 'All',
                deleted: false
              }
              getBatchLisitingNew(response?.data[0]?._id);
              setTierTwoZoneId(response?.data[0]?._id);
              console.log(JSON.stringify(response?.data[0]?._id, null, 2))
              setBranchList([newIndex, ...branchesData])
            }
          }
        })
        .catch((error) => {
          console.log(JSON.stringify(error?.response?.data?.message, null, 2));
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

  useEffect(() => {
    if (selectedZone && zoneList) {
      if (selectedZone?.name == 'All') {
        let branchNames = [];
        zoneList.forEach((item) => {
          if (item.branches) {
            item.branches.forEach((branch) => {
              branchNames.push(branch);
            });
          }
        });
        const filteredBranches = branchNames.filter((item, index) => {
          return item.name !== "All" || index === 0;
        });
        setBranchList(filteredBranches);
      }
      else {
        const selectdAreas = zoneList?.find(city => city?.name === selectedZone?.name);
        setBranchList([...selectdAreas?.branches]);
        setSelectBranch('');
        setSelectDealer('');
        setSelectFSM('');
      }
    }
  }, [selectedZone, zoneList])

  useEffect(() => {
    if (selectedBranch && branchList) {
      if (selectedBranch?.name == 'All') {
        setDealerList([]);
      } else {
        const selectdBranchData = branchList?.find(city => city?.name === selectedBranch?.name);
        let data = {
          _id: null,
          name: 'All',
          deleted: false
        }
        getBatchLisitingNew();
        setDealerList([data, ...selectdBranchData?.dealers]);
      }
      setSelectDealer('');
      setSelectFSM('');
    }
  }, [selectedBranch])

  useEffect(() => {
    if (selectedDealer && dealerList) {
      if (selectedDealer?.name == 'All') {
        setFSMList([]);
      } else {
        getFSMLisiting();
      }
      setSelectFSM('');
    }
  }, [selectedDealer, dealerList])

  useEffect(() => {
    if (selectedFSM) {
      getBatchLisitingNew();
    }
  }, [selectedFSM])


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
            <Text style={styles.performance}>RS. {Paid_ammount.toLocaleString()}</Text>
            <Text style={styles.part}>Total Paid</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 35,
              marginTop: 5,
            }}>
            <View style={{ alignSelf: 'center' }}>
              <Text style={styles.performance}>RS. {approved_ammount.toLocaleString()}</Text>
              <Text style={styles.part}>Total Approved</Text>
            </View>
            <View>
              <Text style={styles.performance}>RS. {outstanding_ammount.toLocaleString()}</Text>
              <Text style={styles.part}>Total Outstanding</Text>
            </View>
          </View>
          <Image
            style={styles.Chamiopm_Logo}
            resizeMode="contain"
            source={require('../../Assets/Image/Orient_icon.png')}
          />
          {(tier > 0 && tier <= 3) &&
            <View style={styles.tierContainer}>
              {tier === 1 && <TierFlow title={"Zone"} data={zoneList} onPress={setSelectZone} selectedValue={selectedZone?.name} />}
              {(tier === 1 || tier === 2) && <TierFlow title={"Branch"} data={branchList} onPress={setSelectBranch} selectedValue={selectedBranch?.name} />}
              {(tier === 1 || tier === 2 || tier === 3) && <TierFlow title={"Dealer"} data={dealerList} onPress={setSelectDealer} selectedValue={selectedDealer?.name} />}
              {(tier === 1 || tier === 2 || tier === 3) && <TierFlow title={"FSM"} data={fsmList} onPress={setSelectFSM} selectedValue={selectedFSM?.name} />}
            </View>}
          <CardsButton
            disabled={listData?.hasOwnProperty("paid") ? listData?.paid?.count <= 0 : true}
            status={'Paid Cards'}
            value={listData?.paid?.count || 0}
            onPress={() => handleSubmmit('Paid Cards', 'paid')}
          />
          <CardsButton
            disabled={listData?.hasOwnProperty("approved") ? listData?.approved?.count <= 0 : true}
            status={'Approved Cards'}
            value={listData?.approved?.count || 0}
            onPress={() => handleSubmmit('Approved Cards', 'approved')}
          />
          <CardsButton
            disabled={listData?.hasOwnProperty("verified") ? listData?.verified?.count <= 0 : true}
            status={'Verified Cards'}
            value={listData?.verified?.count || 0}
            onPress={() => handleSubmmit('Verified Cards', 'verified')}
          />
          <CardsButton
            disabled={listData?.hasOwnProperty("pending") ? listData?.pending?.count <= 0 : true}
            status={'Pending Cards'}
            value={listData?.pending?.count || 0}
            onPress={() => handleSubmmit('Pending Cards', 'pending')}
          />
          <CardsButton
            disabled={listData?.hasOwnProperty("rejected") ? listData?.rejected?.count <= 0 : true}
            status={'Rejected Cards'}
            value={listData?.rejected?.count || 0}
            onPress={() => handleSubmmit('Rejected Cards', 'rejected')}
          />
          {tier > 0 && tier <= 3 ?
            null
            : <TouchableOpacity
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
            </TouchableOpacity>}

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
