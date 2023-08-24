import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from './styles';
import Header from '../../Components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Datepicker from '../../Components/Datepicker';
import CardsButton from '../../Components/CardsButton';
import { Colors } from '../../Utils/Colors';
import moment from 'moment';
import { API_BASE_URL } from '../../../Constants';
const Home = () => {
  const navigation = useNavigation();
  const [isVisible, setisVisible] = useState(false);

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

  const data = [
    {
      rows: [{ RS: '123,123', value: 'Total Outstanding' }],
      row2: [
        { RS: '123,123', value: 'Total Paid' },
        { RS: '123,123', value: 'Total Approved' },
      ],
    },
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: 'All',
      value: 'All',
    },
    {
      label: 'LED',
      value: 'LED',
    },
    {
      label: 'Air Conditioner',
      value: 'Air Conditioner',
    },
    {
      label: 'Refrigerator',
      value: 'Refrigerator',
    },
    {
      label: 'Water Dispenser',
      value: 'Water Dispenser',
    },
    {
      label: 'Microwave Oven',
      value: 'Microwave Oven',
    },
    {
      label: 'Washing Machine',
      value: 'Washing Machine',
    },
  ]);
  const handleModalClose = () => {
    setisVisible(false);
  };

  const handleSubmmit = status => {
    navigation.navigate('PaidCategory', {
      status: status,
    });
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [startDate, setstartDate] = useState();
  const [endDate, setendDate] = useState();
  const [Paid_ammount, setPaid_ammount] = useState();


  const handleDateSelect = (start, end) => {
    setstartDate(start), setendDate(end);
  };
  useEffect(() => {
    console.log(startDate, endDate, 'jdscnjhfncvjhwefn ');
  }, []);


  useEffect(() => {
    const handleCustomDateSelection = () => {
      const payload = {
        cnic: '1111111111111',
        start_date: endDate,
        end_date: startDate,
        divCode: '',
      };

      fetch(`${API_BASE_URL}/BatchListing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
          console.log('res:::', data);
          // setPaid_ammount(data)
          const paidBatches = data?.batchList?.filter(batch => batch.batchPostStatus === 'paid');
          const totalIncentiveAmount = paidBatches.reduce((sum, batch) => sum + batch.incentiveAmount, 0);
          console.log("paid filter:: ", totalIncentiveAmount);
          setPaid_ammount(totalIncentiveAmount)

        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
    handleCustomDateSelection()
  }, [startDate, endDate])


  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedValue(item.value);
        setModalVisible(false);
      }}
      style={styles.dropdownItem}>
      <Text style={[styles.dropdownItemText, { color: Colors.black }]}>
        {item.label}
      </Text>
      {selectedValue === item.value && (
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
        <ScrollView>
          <Header value={true} />
          <View style={styles.filter_view}>
            <View style={{ marginTop: 15 }}>
              {selectedValue ? (
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: Colors.text_Color }}>
                    {selectedValue}
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
                  data={items}
                  renderItem={renderDropdownItem}
                  keyExtractor={item => item.value}
                />
              </View>
            </View>
          </Modal>



          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <Text style={styles.performance}>
              RS.{Paid_ammount ? Paid_ammount : 0}
            </Text>
            <Text style={styles.part}>Total Outstanding</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50, marginTop: 5 }}>
            <View
              style={{ alignSelf: 'center' }}
            >
              <Text style={styles.performance}>RS.</Text>
              <Text style={styles.part}>Total Paid</Text>
            </View>
            <View
              style={{}}
            >
              <Text style={styles.performance}>RS.</Text>
              <Text style={styles.part}>Total Approved</Text>
            </View>
          </View>



          {/* ///////// */}

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
            value={'50'}
            onPress={() => handleSubmmit('Paid Cards')}
          />
          <CardsButton
            status={'Approved Cards'}
            value={'10'}
            onPress={() => handleSubmmit('Approved Cards')}
          />
          <CardsButton
            status={'Verified Cards'}
            value={'200'}
            onPress={() => handleSubmmit('Verified Cards')}
          />
          <CardsButton
            status={'Pendig Cards'}
            value={'800'}
            onPress={() => handleSubmmit('Pendig Cards')}
          />
          <CardsButton
            status={'Rejected Cards'}
            value={'400'}
            onPress={() => handleSubmmit('Rejected Cards')}
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
