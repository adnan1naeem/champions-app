import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../Utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import Modal from 'react-native-modal';

const Datepicker = ({ onDateSelect }) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [dateContainer, setDateContainer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const options = [
    { label: '1 week', value: '1 weekly' },
    { label: '2 week', value: '2 week' },
    { label: '1 month', value: '1 month' },
    { label: '1 year', value: '1 year' },
    { label: 'Custom', value: 'custom' },
  ];

  const handleOptionSelect = value => {
    setSelectedOption(value);
    if (value === '1 weekly') {
      const today = new Date();
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(today.getDate() - 7);
      setStartDate(today);
      setEndDate(oneWeekLater);
      setModalVisible(false);
      setDateContainer(true);
      return;
    } else if (value === '2 week') {
      const today = new Date();
      const twoWeeksLater = new Date(today);
      twoWeeksLater.setDate(today.getDate() - 14);
      setStartDate(today);
      setEndDate(twoWeeksLater);
      setModalVisible(false);
      setDateContainer(true);
      return;
    } else if (value === '1 month') {
      const today = new Date();
      const oneMonthAgo = moment(today).subtract(1, 'months').toDate();
      setStartDate(today);
      setEndDate(oneMonthAgo);
      setModalVisible(false);
      setDateContainer();
      return;
    } else if (value === '1 year') {
      const today = new Date();
      const oneYearAgo = moment(today).subtract(1, 'years').toDate();
      setStartDate(today);
      setEndDate(oneYearAgo);
      setModalVisible(false);
      setDateContainer(true);
      return;
    } else if (value === 'custom') {
      setShowEndPicker(true);
      setShowStartPicker(true);
      setDateContainer(true);
      setModalVisible(false);
      return;
    }
  };

  useEffect(() => {
    handleCustomDateSelection();
  }, [startDate, endDate])

  const handleCustomDateSelection = () => {
    onDateSelect(startDate, endDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    handleCustomDateSelection();
    setShowEndPicker(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const showEndDatePicker = () => {
    setShowEndPicker(true);
  };

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(Platform.OS === 'ios');
    setStartDate(currentDate);
    handleCustomDateSelection();
  };

  const showStartdatePicker = () => {
    setShowStartPicker(true);
  };

  const handleDatePicker = () => {
    if (isModalVisible) {
      setModalVisible(false);
      setDateContainer(false);
    } else {
      setModalVisible(true);
      setDateContainer(false);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handleDatePicker()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          justifyContent: 'space-between',
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>
        <Text
          style={{
            color: Colors.text_Color,
            fontSize: 12,
          }}>
          Date
        </Text>
        <Entypo
          name={!isModalVisible ? 'chevron-down' : 'chevron-up'}
          style={{ color: Colors.text_Color, fontSize: 20 }}
        />
      </TouchableOpacity>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              backgroundColor: Colors.White,
              paddingVertical: 15,
              alignSelf: 'center',
              borderRadius: 10,
              height: 150,
              position: 'absolute',
              top: 125,
              right: 40,
              paddingHorizontal: 30,
            }}>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleOptionSelect(item.value)}
                  style={styles.optionItem}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.value}
            />
          </View>
        </Modal>
      </View>

      {dateContainer && (
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: Platform.OS === 'android' && -70,
            marginBottom: 15,
          }}>
          {Platform.OS === 'ios' ? (
            <View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft: -70,
                  marginBottom: 15,
                }}>
                <TouchableOpacity
                  onPress={() => showEndDatePicker()}
                  style={{
                    backgroundColor: Colors.White,
                    borderRadius: 15,
                    marginHorizontal: 5,
                    width: 80,
                  }}>
                  <DateTimePicker
                    testID="endDateTimePicker"
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.White,
                    borderRadius: 15,
                    width: 80,
                  }}
                  onPress={() => showStartdatePicker()}>
                  <DateTimePicker
                    testID="startDateTimePicker"
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}

                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => [
                  showEndDatePicker(),
                ]}
                style={{
                  backgroundColor: Colors.White,
                  paddingHorizontal: 17,
                  paddingVertical: 7,
                  borderRadius: 15,
                  marginHorizontal: 5,
                }}>
                <Text>
                  {endDate ? moment(endDate).format('YYYY/MM/DD') : 'From'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.White,
                  paddingHorizontal: 15,
                  paddingVertical: 7,
                  borderRadius: 15,
                }}
                onPress={() => [
                  showStartdatePicker(),
                ]}>
                <Text>
                  {startDate ? moment(startDate).format('YYYY/MM/DD') : 'To'}
                </Text>
              </TouchableOpacity>
              {/* <DateTimePicker
                testID="startDateTimePicker"
                value={startDate}
                mode="date"
                display="default"
                onChange={onStartDateChange}

              />
              <DateTimePicker
                testID="endDateTimePicker"
                value={endDate}
                mode="date"
                display="default"
                onChange={onEndDateChange}
              /> */}
            </View>

          )}
        </View>
      )}
    </View>
  );
};

export default Datepicker;
const styles = StyleSheet.create({});
