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


const Datepicker = ({ onDateSelect, refreshState }) => {

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [dateContainer, setDateContainer] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Date");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (refreshState) {
      setDateContainer(false);
      setSelectedOption("Date");
    }
  }, [refreshState])

  const options = [
    { label: 'Default', value: 'Default' },
    { label: '1 Week', value: '1 Week' },
    { label: '2 Week', value: '2 Week' },
    { label: '1 Month', value: '1 Month' },
    { label: '1 Year', value: '1 Year' },
    { label: 'Custom', value: 'Custom' },
  ];

  const handleOptionSelect = value => {
    setSelectedOption(value);
    if (value === 'Default') {
      setModalVisible(false);
      setSelectedOption("Date");
      return;
    } else if (value === '1 Week') {
      const today = new Date();
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(today?.getDate() - 7);
      setStartDate(today);
      setEndDate(oneWeekLater);
      setModalVisible(false);
      setDateContainer(true);
      return;
    } else if (value === '2 Week') {
      const today = new Date();
      const twoWeeksLater = new Date(today);
      twoWeeksLater.setDate(today?.getDate() - 14);
      setStartDate(today);
      setEndDate(twoWeeksLater);
      setModalVisible(false);
      setDateContainer(true);
      return;
    } else if (value === '1 Month') {
      const today = new Date();
      const oneMonthAgo = moment(today)?.subtract(1, 'months')?.toDate();
      setStartDate(today);
      setEndDate(oneMonthAgo);
      setModalVisible(false);
      setDateContainer(true);
      return;
    } else if (value === '1 Year') {
      const today = new Date();
      const oneYearAgo = moment(today)?.subtract(1, 'years')?.toDate();
      setStartDate(today);
      setEndDate(oneYearAgo);
      setModalVisible(false);
      setDateContainer(true);
      return;
    } else if (value === 'Custom') {
      setDateContainer(true);
      setModalVisible(false);
      return;
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      handleCustomDateSelection();
    }
  }, [startDate, endDate]);

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
          {selectedOption}
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
              backgroundColor: '#3a85d6',
              paddingVertical: 15,
              paddingHorizontal: 20,
              alignSelf: 'center',
              borderRadius: 10,
              position: 'absolute',
              top: 100,
              right: 28,

            }}>
            <FlatList
              data={options}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => handleOptionSelect(item.value)}
                  style={{ padding: 2, flexDirection: 'row' }}>
                  <Text style={{ color: Colors.text_Color }}>{item.label}</Text>
                  {selectedOption === "Date" && index === 0 || selectedOption === item?.value ? (
                    <Entypo
                      name="check"
                      style={{ color: Colors.text_Color, fontSize: 16, marginLeft: 10 }}
                    />
                  ) : null}
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
                    value={endDate || new Date()}
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
                    value={startDate || new Date()}
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
                onPress={() => [showEndDatePicker()]}
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
                onPress={() => [showStartdatePicker()]}>
                <Text>
                  {startDate ? moment(startDate).format('YYYY/MM/DD') : 'To'}
                </Text>
              </TouchableOpacity>
              {showStartPicker && (
                <DateTimePicker
                  testID="startDateTimePicker"
                  value={startDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={onStartDateChange}
                />
              )}
              {showEndPicker && (
                <DateTimePicker
                  testID="endDateTimePicker"
                  value={endDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={onEndDateChange}
                />
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Datepicker;
const styles = StyleSheet.create({});
