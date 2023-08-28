import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from './styles';
import Header from '../../Components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import Datepicker from '../../Components/Datepicker';
import CardsButton from '../../Components/CardsButton';
import { Colors } from '../../Utils/Colors';
import { API_BASE_URL } from '../../../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const products = [
    {
      id: 1,
      name: 'Air Conditioner',
    },
    {
      id: 2,
      name: 'Refrigerator',
    },
    {
      id: 3,
      name: 'Water Dispenser',
    },
    {
      id: 4,
      name: 'Microwave Oven',
    },
    {
      id: 5,
      name: 'Washing Machine',
    },
    {
      id: 6,
      name: 'LED',
    },
  ];


  const handleModalClose = () => {
    setisVisible(false);
  };

  const handleSubmmit = (status, list) => {
    navigation.navigate('PaidCategory', {
      status: status,
      list: list
    });
  };

  const handleDateSelect = (start, end) => {
    setstartDate(start);
    setendDate(end);
  };

  useEffect(() => {
    (async () => {
      const Cnic_Number = await AsyncStorage.getItem("CNIC")
      const payload = {
        cnic: Cnic_Number,
        start_date: endDate,
        end_date: startDate,
        divCode: selectedValue?.categoryCode === '0' ? "" : selectedValue?.categoryCode,
      };

      console.log(JSON.stringify(payload, null, 2))

      try {
        const response = await fetch(`${API_BASE_URL}/BatchListing`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const paidBatches = data?.batchList?.filter(
          batch => batch?.batchPostStatus === 'paid',
        );
        const total_PaidIncentiveAmount = paidBatches?.reduce(
          (sum, batch) => sum + batch?.incentiveAmount,
          0,
        );
        const approvedBatches = data?.batchList?.filter(
          batch => batch?.batchPostStatus === 'approved',
        );
        const total_approvedIncentiveAmount = approvedBatches?.reduce(
          (sum, batch) => sum + batch?.incentiveAmount,
          0,
        );
        const verifiedBatches = data?.batchList?.filter(
          batch => batch?.batchPostStatus === 'verified',
        );
        const rejectedBatches = data?.batchList?.filter(
          batch => batch?.batchPostStatus === 'rejected',
        );
        const pendingBatches = data?.batchList?.filter(
          batch => batch?.batchPostStatus === 'pending',
        );
        const total_pendingIncentiveAmount = pendingBatches?.reduce(
          (sum, batch) => sum + batch?.incentiveAmount,
          0,
        );

        setPending_list(pendingBatches);
        setRejected_list(rejectedBatches);
        setVerified_list(verifiedBatches);
        setPaid_list(paidBatches);
        setApproved_list(approvedBatches);
        setapproved_ammount(total_approvedIncentiveAmount);
        setPaid_ammount(total_PaidIncentiveAmount);
        setpending_ammount(total_pendingIncentiveAmount);

      } catch (error) {
        console.error('Error:', error);
      }
    })();
  }, [startDate, endDate, selectedValue]);

  useEffect(() => {
    (async () => {
      const payload = {
        companyCode: "1000"
      };

      try {
        const response = await fetch(`${API_BASE_URL}/getCategory`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        let dataIs = {
          _id: "11111",
          categoryCode: "0",
          categoryName: "All",
          companyName: "Orient Electronics Pvt. Ltd.",
          companyCode: "1000",
        }
        setCategory([dataIs, ...data?.category]);
      } catch (error) {
        console.error('Error:', error);
      }
    })();
  }, []);

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedValue(item);
        setModalVisible(false);
      }}
      style={styles.dropdownItem}>
      <Text style={[styles.dropdownItemText, { color: Colors.black }]}>
        {item?.categoryName}
      </Text>
      {selectedValue?.categoryCode === item?.categoryCode && (
        <Entypo
          name="check"
          style={{ color: Colors.black, fontSize: 16, marginLeft: 10 }}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../Assets/Image/background_image.png')}
      style={styles.container}
      resizeMode="cover">
      <View style={{ paddingHorizontal: 10 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header value={true} />
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
                  <Text style={styles.dropdownItemText}>All</Text>
                  <Entypo
                    name={modalVisible ? 'chevron-up' : 'chevron-down'}
                    style={{ color: Colors.text_Color, fontSize: 20 }}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View>
              <Datepicker onDateSelect={handleDateSelect} />
            </View>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            onRequestClose={() => setModalVisible(false)}>
            <View
              style={[
                styles.modalContainer,
                {
                  start: '10%',
                  top: 128,
                },
              ]}>
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
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
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
            style={{
              width: '48%',
              marginTop: 10,
              height: 170,
              alignSelf: 'center',
            }}
            resizeMode="contain"
            source={require('../../Assets/Image/Orient_icon.png')}
          />
          <CardsButton
            status={'Paid Cards'}
            value={paid_list?.length}
            onPress={() => handleSubmmit('Paid Cards', paid_list)}
          />
          <CardsButton
            status={'Approved Cards'}
            value={approved_list?.length}
            onPress={() => handleSubmmit('Approved Cards', approved_list)}
          />
          <CardsButton
            status={'Verified Cards'}
            value={verified_list?.length}
            onPress={() => handleSubmmit('Verified Cards', verified_list)}
          />
          <CardsButton
            status={'Pendig Cards'}
            value={pending_list?.length}
            onPress={() => handleSubmmit('Pendig Cards', pending_list)}
          />
          <CardsButton
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

          <Modal visible={isVisible} transparent animationType="fade">
            <TouchableOpacity style={{ flex: 1 }} onPress={handleModalClose} />
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {products.map(product => (
                  <View key={product.id}>
                    <Text
                      style={{
                        color: Colors.text_Color,
                        fontWeight: '500',
                        fontSize: 11,
                        paddingVertical: 3,
                      }}>
                      {product.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Home;
