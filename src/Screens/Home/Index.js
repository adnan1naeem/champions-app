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
import axios from '../../Utils/axiosConfig'
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
  const [selectedValue, setSelectedValue] = useState(null);
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [resetAll, setResetAll] = useState(false);
  const [Paid_ammount, setPaid_ammount] = useState(0);
  const [approved_ammount, setapproved_ammount] = useState(0);
  const [outstanding_ammount, setoutstanding_ammount] = useState(0);
  const [listData, setListData] = useState(0);
  const [category, setCategory] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [defaultDate, setDefaultDate] = useState(false);
  const [tier, setTier] = useState(0);
  const [zoneList, setZoneList] = useState([]);
  const [completeDataList, setCompleteDataList] = useState([]);
  const [completeBranchList, setCompleteBranchList] = useState([]);
  const [completeDealerList, setCompleteDealerList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [dealerList, setDealerList] = useState([]);
  const [fsmList, setFSMList] = useState([]);
  const [tierTwoZoneId, setTierTwoZoneId] = useState(null);
  const [defaultZone, setDefaultZone] = useState("");
  const [defaultBranch, setDefaultBranch] = useState("");

  const scrollViewRef = useRef(null);
  const prevSelectedZoneRef = useRef();
  const prevSelectedBranchRef = useRef();
  const prevSelectedDealerRef = useRef();

  const [selectedZone, setSelectZone] = useState();
  const [selectedBranch, setSelectBranch] = useState('');
  const [selectedDealer, setSelectDealer] = useState('');
  const [selectedFSM, setSelectFSM] = useState('');

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'OK', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Received a background message:', remoteMessage);
    });
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      getBatchLisitingNew();
    }
  }, [])

  useEffect(() => {
    if (defaultDate || startDate || endDate || selectedZone || selectedBranch || selectedDealer || selectedFSM) {
      if (parseInt(tier) > 0 && parseInt(tier) < 4) {
        getBatchLisitingNew();
      }
    }
  }, [defaultDate, startDate, endDate, selectedZone, selectedBranch, selectedDealer]);

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

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
    defaultZoneList();
  }, []);

  const defaultZoneList = async () => {
    let tierIs = await AsyncStorage.getItem('TIER_NUMBER');
    if (tierIs != 0) {
      setTier(parseInt(tierIs));
      getZoneList(tierIs);
    } else {
      getBatchListing();
    }
  }

  const setProductCategory = async (item) => {
    setSelectedValue(item);
    setModalVisible(false);
    let tierIs = await AsyncStorage.getItem('TIER_NUMBER');
    if (tierIs != 0) {
      setTier(parseInt(tierIs));
      getBatchLisitingNew("", item?.categoryCode);
    } else {
      getBatchListing();
    }
  }

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

        })
        .catch((error) => {
          console.log(JSON.stringify(error, null, 2));
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getBatchLisitingNew = (zoneId = null, categoryItem = null) => {
    const data = {
      startDate: endDate,
      endDate: startDate,
      zoneId: selectedZone?._id || tierTwoZoneId || zoneId || null,
      branchId: selectedBranch?._id || null,
      dealerId: selectedDealer?._id || null,
      fsmId: selectedFSM?._id || null,
      divCode:
        categoryItem ? categoryItem : selectedValue?.categoryCode === '0' ? '' : selectedValue?.categoryCode,
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

        })
        .catch((error) => {

          console.error('Error is:', error);
          setListData(null);
        });
    } catch (error) {

      console.error('Error:', error);
    }
  }

  const getFSMLisiting = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/fsmListWithDealer/${selectedDealer?._id}`,
      headers: {
        'Content-Type': 'application/json',
      },
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
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/zones`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      axios.request(config)
        .then(async (response) => {
          if (response?.data) {
            setCompleteDataList([...response?.data]);
            if (tierIs == 1) {
              getBatchLisitingNew();
              response?.data.forEach(zone => {
                zone.branches.unshift({
                  "_id": null,
                  "code": "All",
                  "name": "All",
                  "dealers": []
                })
              })
              response?.data.unshift({
                branches: [],
                _id: null,
                code: "All",
                name: 'All',
                deleted: false
              })
              setZoneList([...response?.data]);
              setCompleteBranchList([...response?.data]);
              const allDealers = response?.data?.flatMap(item => item?.branches)?.flatMap(branch => branch?.dealers);
              setCompleteDealerList([...allDealers]);
            } else if (tierIs == 3) {
              getBatchLisitingNew();
              setDefaultZone(response?.data[0]);
              setDefaultBranch(response?.data[0]?.branches[0]);
              response?.data[0]?.branches[0]?.dealers?.unshift({
                branches: [],
                _id: null,
                name: 'All',
                deleted: false
              })
              setDealerList([...response?.data[0]?.branches[0]?.dealers])
            } else if (tierIs == 2) {
              setDefaultZone(response?.data[0]);
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
                code: 'All',
                deleted: false
              }
              getBatchLisitingNew(response?.data[0]?._id);
              setTierTwoZoneId(response?.data[0]?._id);
              setBranchList([newIndex, ...branchesData])
              const allDealers = response?.data[0]?.branches?.flatMap(item => item?.dealers);
              setCompleteDealerList([...allDealers]);
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

  const getBracnhListDefault = (list) => {
    let branchNames = [];
    list?.forEach((item) => {
      if (item?.branches) {
        item.branches.forEach((branch) => {
          branchNames.push(branch);
        });
      }
    });
    const filteredBranches = branchNames?.filter((item, index) => {
      return item.name !== "All" || index === 0;
    });
    return filteredBranches;
  }

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
        setProductCategory(item);
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
        setBranchList(getBracnhListDefault(zoneList));
        setCompleteBranchList([...completeDataList]);
        const allDealers = completeDataList?.flatMap(item => item?.branches)?.flatMap(branch => branch?.dealers);
        setCompleteDealerList([...allDealers]);
        if (selectedZone !== prevSelectedZoneRef.current) {
          setSelectBranch('');
          setSelectDealer('');
          setSelectFSM('');
          prevSelectedZoneRef.current = selectedZone;
        }
      } else {
        const selectdAreas = zoneList?.find(city => city?.name === selectedZone?.name);
        setBranchList([...selectdAreas?.branches]);
        if (selectedZone !== prevSelectedZoneRef.current) {
          setSelectBranch('');
          setSelectDealer('');
          setSelectFSM('');
          prevSelectedZoneRef.current = selectedZone;
        }
        const selectedZoneBranches = completeDataList.filter(item => item?._id === selectedZone?._id).flatMap(item => item?.branches);
        const allDealers = selectedZoneBranches?.flatMap(branch => branch?.dealers);
        setCompleteBranchList([...selectedZoneBranches]);
        setCompleteDealerList([...allDealers]);
      }
    }
  }, [selectedZone, zoneList])

  useEffect(() => {
    if (selectedBranch && branchList?.length <= 0) {
      const targetBranch = completeDataList.reduce((result, item) => {
        const branch = item?.branches.find(b => b?._id === selectedBranch?._id);
        if (branch) {
          result = branch;
        }
        return result;
      }, null);
      const dealersList = targetBranch ? targetBranch?.dealers : null;
      let data = {
        _id: null,
        name: 'All',
        deleted: false
      }
      setDealerList([data, ...dealersList]);
    }
  }, [selectedBranch, branchList])

  useEffect(() => {
    if (selectedBranch && branchList?.length > 0) {
      if (selectedBranch?.name == 'All') {
        setDealerList([]);
        if (selectedBranch !== prevSelectedBranchRef.current) {
          setSelectDealer('');
          setSelectFSM('');
          prevSelectedBranchRef.current = selectedBranch;
        }
        const allDealers = branchList?.flatMap(item => item?.dealers);
        setCompleteDealerList([...allDealers]);
      } else {
        const selectdBranchData = branchList?.find(city => city?.name === selectedBranch?.name);
        let data = {
          _id: null,
          name: 'All',
          deleted: false
        }
        getBatchLisitingNew();
        setDealerList([data, ...selectdBranchData?.dealers]);
        const allDealers = branchList?.filter(item => item?._id === selectedBranch?._id)?.flatMap(item => item?.dealers);
        setCompleteDealerList([...allDealers]);
      }
      if (selectedBranch !== prevSelectedBranchRef.current) {
        setSelectDealer('');
        setSelectFSM('');
        prevSelectedBranchRef.current = selectedBranch;
      }
    }
  }, [selectedBranch, branchList])

  useEffect(() => {
    if (selectedDealer && dealerList) {
      if (selectedDealer?.name == 'All') {
        if (selectedDealer !== prevSelectedDealerRef.current) {
          setSelectFSM('');
          prevSelectedDealerRef.current = selectedDealer;
        }
        setFSMList([]);
      } else {
        getFSMLisiting();
      }
      if (selectedDealer !== prevSelectedDealerRef.current) {
        setSelectFSM('');
        prevSelectedDealerRef.current = selectedDealer;
      }
    }
  }, [selectedDealer, dealerList])

  useEffect(() => {
    if (selectedFSM) {
      getBatchLisitingNew();
    }
  }, [selectedFSM])

  const checkBranchList = () => {
    if (selectedBranch || defaultBranch) {
      if (selectedBranch?.code === "All" || defaultBranch?.code === "All") {
        return true;
      }
      return false;
    }
    return true;
  }

  const checkFSMList = () => {
    if (selectedDealer) {
      if (selectedDealer?.name === "All") {
        return true;
      }
      return false;
    }
    return true;
  }

  const resetAllFun = () => {
    setSelectZone('');
    setSelectBranch('');
    setSelectDealer('');
    setSelectFSM('');
    setSelectedValue(null);
    setstartDate('');
    setendDate('');
    setDefaultDate('');
    setResetAll(true);
  }
  
  useEffect(() => {
    if (resetAll) {
      onRefresh();
      setResetAll(false);
      defaultZoneList();
    }
  }, [resetAll])

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
                refreshState={resetAll}
                setDefaultDateFun={(value) => {
                  setDefaultDate(value);
                  handleDateSelect("", "")
                }}
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
          <TouchableOpacity style={styles.resetContainer} onPress={resetAllFun}>
            <Text style={styles.resetAllText}>Reset Filters</Text>
          </TouchableOpacity>
          {(tier > 0 && tier <= 3) &&
            <View style={styles.tierContainer}>
              <TierFlow completeDataList={completeDataList} title={"Zone"} data={zoneList} onPress={setSelectZone} selectedVal={tier == 2 || tier == 3 ? defaultZone : selectedZone} disabled={tier == 2 || tier == 3 ? true : false} />
              <TierFlow completeDataList={completeBranchList} title={"Branch"} data={selectedZone?.name === "All" ? [] : branchList} onPress={setSelectBranch} selectedVal={tier == 3 ? defaultBranch : selectedBranch} disabled={tier == 3 ? true : false} />
              {(tier === 1 || tier === 2 || tier === 3) && <TierFlow completeDataList={completeDealerList} title={"Dealer"} data={checkBranchList() ? [] : dealerList} onPress={setSelectDealer} selectedVal={selectedDealer} />}
              {(tier === 1 || tier === 2 || tier === 3) && <TierFlow completeDataList={completeDataList} title={"FSM"} data={checkFSMList() ? [] : fsmList} onPress={setSelectFSM} selectedVal={selectedFSM} />}
            </View>}
          <CardsButton
            disabled={listData?.hasOwnProperty("paid") ? listData?.paid?.count <= 0 : true}
            status={'Paid Cards'}
            value={listData?.paid?.count?.toLocaleString() || 0}
            onPress={() => handleSubmmit('Paid Cards', 'paid')}
          />
          <CardsButton
            disabled={listData?.hasOwnProperty("approved") ? listData?.approved?.count <= 0 : true}
            status={'Approved Cards'}
            value={listData?.approved?.count?.toLocaleString() || 0}
            onPress={() => handleSubmmit('Approved Cards', 'approved')}
          />
          <CardsButton
            disabled={listData?.hasOwnProperty("verified") ? listData?.verified?.count <= 0 : true}
            status={'Verified Cards'}
            value={listData?.verified?.count?.toLocaleString() || 0}
            onPress={() => handleSubmmit('Verified Cards', 'verified')}
          />
          <CardsButton
            disabled={listData?.hasOwnProperty("pending") ? listData?.pending?.count <= 0 : true}
            status={'Pending Cards'}
            value={listData?.pending?.count?.toLocaleString() || 0}
            onPress={() => handleSubmmit('Pending Cards', 'pending')}
          />
          <CardsButton
            disabled={listData?.hasOwnProperty("rejected") ? listData?.rejected?.count <= 0 : true}
            status={'Rejected Cards'}
            value={listData?.rejected?.count?.toLocaleString() || 0}
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
