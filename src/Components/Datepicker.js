import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../Utils/Colors';
import { Icon } from 'react-native-elements';
import moment from 'moment';

const Datepicker = () => {
    const [start_Date, setStart_Date] = useState(new Date());
    const [end_Date, setEnd_Date] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [datePickerContainer, setDatePickerContainer] = useState(false);

    const onStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || start_Date;
        setShowStartPicker(Platform.OS === 'ios');
        setStart_Date(currentDate);
    };

    const onEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || end_Date;
        setShowEndPicker(Platform.OS === 'ios');
        setEnd_Date(currentDate);
        setDatePickerContainer(false);
    };

    const showStartDatePicker = () => {
        setShowStartPicker(true);
    };

    const showEndDatePicker = () => {
        setShowEndPicker(true);
    };

    const handleDate = () => {
        if (datePickerContainer === false) {
            setDatePickerContainer(true);
            setShowStartPicker(true);
        } else {
            setDatePickerContainer(false);
        }
    };
    return (
        <View>
            <TouchableOpacity
                onPress={() => handleDate()}
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
                <Icon
                    name="keyboard-arrow-down"
                    type="material"
                    size={22}
                    color={Colors.text_Color}
                    style={{ paddingHorizontal: 10 }}
                />
            </TouchableOpacity>
            {datePickerContainer && (
                <View
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: -70,
                        marginBottom: 15,
                    }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.White,
                            paddingHorizontal: 5,
                            paddingVertical: 7,
                            borderRadius: 15,
                            marginHorizontal: 10,
                        }}
                        onPress={() => showStartDatePicker()}>
                        <Text>{moment(start_Date).format('YYYY-MM-DD')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.White,
                            paddingHorizontal: 5,
                            paddingVertical: 7,
                            borderRadius: 15,
                        }}
                        onPress={() => showEndDatePicker()}>
                        <Text>{moment(end_Date).format('YYYY-MM-DD')}</Text>
                    </TouchableOpacity>
                </View>
            )}

            {showStartPicker && (
                <DateTimePicker
                    testID="startDateTimePicker"
                    value={start_Date}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                />
            )}

            {showEndPicker && (
                <DateTimePicker
                    testID="endDateTimePicker"
                    value={end_Date}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                />
            )}
        </View>
    );
};

export default Datepicker;
