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
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from './styles';
import Header from '../../Components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Datepicker from '../../Components/Datepicker';
import CardsButton from '../../Components/CardsButton';
import { Colors } from '../../Utils/Colors';
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

  const handleDateSelect = (start, end) => {
    console.log('Selected Start Date12:', start);
    console.log('Selected End Date12:', end);
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedValue(item.value);
        setModalVisible(false);
      }}
      style={styles.dropdownItem}>
      <Text style={[styles.dropdownItemText, { color: Colors.black }]}>{item.label}</Text>
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

          {data?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                  <Text style={styles.performance}>
                    RS. {item?.rows[0]?.RS}
                  </Text>
                  <Text style={styles.part}>{item?.rows[0]?.value}</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  {item?.row2?.map((value, valueIndex) => {
                    return (
                      <View
                        style={{ alignItems: 'center', zindex: -1 }}
                        key={valueIndex}>
                        <Text style={styles.performance}>RS.{value?.RS}</Text>
                        <Text style={styles.part}>{value?.value}</Text>
                      </View>
                    );
                  })}
                </View>
              </React.Fragment>
            );
          })}
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
